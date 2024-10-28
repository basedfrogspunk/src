let supplyCount = 0; // Memulai dengan 0
const maxSupply = 4444; // Total maksimal supply
let userAccount = ''; // Menyimpan akun pengguna

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Ganti dengan alamat smart contract Anda
const abi = [
    {
        "constant": false,
        "inputs": [],
        "name": "mint",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
];

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            console.log('Connected account:', userAccount);

            // Tampilkan alamat wallet dan saldo
            document.getElementById("address").textContent = userAccount;
            const balance = await getBalance(userAccount);
            document.getElementById("balance").textContent = balance;

            // Menyembunyikan tombol connect dan menampilkan tombol mint dan disconnect
            document.getElementById("connectButton").style.display = "none";
            document.getElementById("mintButton").style.display = "block";
            document.getElementById("walletAddress").style.display = "block";
            document.getElementById("walletBalance").style.display = "block";
            document.getElementById("disconnectButton").style.display = "block";
        } catch (error) {
            console.error('User denied account access:', error);
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this DApp.');
    }
}

async function getBalance(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance); // Mengonversi balance ke ETH
}

function disconnectWallet() {
    // Menyembunyikan semua elemen terkait wallet
    document.getElementById("connectButton").style.display = "block";
    document.getElementById("mintButton").style.display = "none";
    document.getElementById("walletAddress").style.display = "none";
    document.getElementById("walletBalance").style.display = "none";
    document.getElementById("totalPayment").style.display = "none";
    document.getElementById("disconnectButton").style.display = "none";
    userAccount = ''; // Reset akun pengguna
}

async function mintNFT() {
    if (supplyCount < maxSupply) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
