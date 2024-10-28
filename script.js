let web3;
let account;
let contract;
let currentSupply = 0; // Jumlah NFT yang sudah mint
const maxSupply = 4444; // Total maksimal supply NFT

// Kontrak ABI dan alamat kontrak Anda
const contractABI = [
    // Masukkan ABI kontrak Anda di sini
];
const contractAddress = '0xYourContractAddress'; // Ganti dengan alamat kontrak Anda

// Fungsi untuk memperbarui tampilan supply
function updateSupplyDisplay() {
    const supplyDisplay = document.getElementById('supply');
    supplyDisplay.innerText = `${currentSupply}/${maxSupply}`;
    if (currentSupply >= maxSupply) {
        document.getElementById('mintNFT').innerText = "Sold Out";
        document.getElementById('mintNFT').disabled = true;
    }
}

// Fungsi untuk memperbarui saldo ETH pengguna
async function updateBalance() {
    const ethBalanceDisplay = document.getElementById('ethBalance');
    const balance = await web3.eth.getBalance(account);
    const etherBalance = web3.utils.fromWei(balance, 'ether');
    ethBalanceDisplay.innerText = `${etherBalance} ETH`;
}

// Fungsi untuk menghubungkan wallet
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
        document.getElementById('walletAddress').innerText = account;

        await updateBalance();
        updateSupplyDisplay();

        // Menampilkan tombol Mint NFT dan Disconnect setelah wallet terhubung
        document.getElementById('mintNFT').style.display = 'inline-block';
        document.getElementById('disconnectWallet').style.display = 'inline-block';
        
        // Menyembunyikan tombol Connect Wallet setelah terhubung
        document.getElementById('connectWallet').style.display = 'none';

        // Inisialisasi kontrak
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } catch (error) {
        console.error("Failed to connect wallet", error);
    }
}

// Fungsi untuk memutuskan koneksi wallet
function disconnectWallet() {
    account = null;
    document.getElementById('walletAddress').innerText = '0xYourWalletAddress';
    document.getElementById('ethBalance').innerText = '0 ETH';
    document.getElementById('supply').innerText = '0/4444';
    document.getElementById('mintNFT').innerText = 'Mint NFT';
    document.getElementById('mintNFT').disabled = false; // Mengaktifkan kembali tombol

    // Menampilkan kembali tombol Connect Wallet dan menyembunyikan yang lainnya
    document.getElementById('connectWallet').style.display = 'inline-block';
    document.getElementById('mintNFT').style.display = 'none';
    document.getElementById('disconnectWallet').style.display = 'none';
}

// Fungsi untuk melakukan minting NFT
async function mintNFT() {
    if (!account) {
        alert('Please connect your wallet first!');
        return;
    }

    try {
        // Memanggil fungsi mint di kontrak Anda
        await contract.methods.mint(account).send({ from: account, value: web3.utils.toWei('0.05', 'ether') }); // Sesuaikan nilai dengan biaya minting
        currentSupply++;
        updateSupplyDisplay();
    } catch (error) {
        console.error("Minting failed. Please try again.", error);
        alert("Minting failed. Please try again.");
    }
}

// Inisialisasi saat halaman dimuat
window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);

        // Event listener untuk tombol
        document.getElementById('connectWallet').addEventListener('click', connectWallet);
        document.getElementById('mintNFT').addEventListener('click', mintNFT);
        document.getElementById('disconnectWallet').addEventListener('click', disconnectWallet);

        // Menyembunyikan tombol Mint NFT dan Disconnect saat halaman dimuat
        document.getElementById('mintNFT').style.display = 'none';
        document.getElementById('disconnectWallet').style.display = 'none';
    } else {
        alert('Please install MetaMask to use this dApp!');
    }
});
