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

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        document.getElementById('connectWallet').addEventListener('click', connectWallet);
        document.getElementById('mintNFT').addEventListener('click', mintNFT);
        document.getElementById('disconnectWallet').addEventListener('click', disconnectWallet);
    } else {
        alert('Please install MetaMask!');
    }
});

async function connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    document.getElementById('walletAddress').innerText = account;
    await updateBalance();
    updateSupply();
}

async function updateBalance() {
    const balance = await web3.eth.getBalance(account);
    const etherBalance = web3.utils.fromWei(balance, 'ether');
    document.getElementById('ethBalance').innerText = etherBalance + ' ETH';
}

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

function updateSupply() {
    document.getElementById('supply').innerText = `${supply}/${totalSupply}`;
    
    // Mengubah status tombol Mint NFT jika sudah terjual habis
    if (supply >= totalSupply) {
        document.getElementById('mintNFT').innerText = 'Sold Out';
        document.getElementById('mintNFT').disabled = true; // Menonaktifkan tombol
    }
}

function disconnectWallet() {
    account = null;
    document.getElementById('walletAddress').innerText = '0xYourWalletAddress';
    document.getElementById('ethBalance').innerText = '0 ETH';
    document.getElementById('supply').innerText = '0/4444';
    document.getElementById('mintNFT').innerText = 'Mint NFT';
    document.getElementById('mintNFT').disabled = false; // Mengaktifkan kembali tombol
}
