let web3;
let account;
let contract;
let supply = 0; // Menyimpan jumlah NFT yang sudah dimint
const totalSupply = 4444; // Total supply NFT

// Kontrak ABI dan alamat kontrak Anda
const contractABI = [
    // Masukkan ABI kontrak Anda di sini
];
const contractAddress = '0xYourContractAddress'; // Ganti dengan alamat kontrak Anda

// Fungsi untuk menginisialisasi saat halaman dimuat
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
        alert('Please install MetaMask!');
    }
});

// Fungsi untuk menghubungkan wallet
async function connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    document.getElementById('walletAddress').innerText = account;
    await updateBalance();
    updateSupply();

    // Menampilkan tombol Mint NFT dan Disconnect setelah wallet terhubung
    document.getElementById('mintNFT').style.display = 'inline-block';
    document.getElementById('disconnectWallet').style.display = 'inline-block';

    // Menyembunyikan tombol Connect Wallet setelah terhubung
    document.getElementById('connectWallet').style.display = 'none';

    // Inisialisasi kontrak
    contract = new web3.eth.Contract(contractABI, contractAddress);
}

// Fungsi untuk memperbarui saldo ETH pengguna
async function updateBalance() {
    const balance = await web3.eth.getBalance(account);
    const etherBalance = web3.utils.fromWei(balance, 'ether');
    document.getElementById('ethBalance').innerText = etherBalance + ' ETH';
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
        supply++;
        updateSupply();
    } catch (error) {
        console.error(error);
        alert('Minting failed. Please try again.');
    }
}

// Fungsi untuk memperbarui supply NFT
function updateSupply() {
    document.getElementById('supply').innerText = `${supply}/${totalSupply}`;

    // Mengubah status tombol Mint NFT jika sudah terjual habis
    if (supply >= totalSupply) {
        document.getElementById
