// Menyiapkan variabel global
let mintAmount = 1; // Jumlah mint default
const maxSupply = 4444; // Total supply NFT
let currentSupply = 0; // Supply yang saat ini telah dimint

// Fungsi untuk memperbarui informasi wallet
function updateWalletInfo(address, balance) {
    document.getElementById('walletAddress').innerText = `Wallet Address: ${address}`;
    document.getElementById('ethBalance').innerText = `Balance: ${balance} ETH`;
}

// Fungsi untuk menghubungkan wallet
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Minta pengguna untuk menghubungkan wallet
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            const balance = await getETHBalance(account);
            updateWalletInfo(account, balance);

            // Tampilkan elemen setelah wallet terhubung
            document.getElementById('walletInfo').style.display = 'block';
            document.querySelector('.mint-controls').style.display = 'flex';
            document.getElementById('connectWallet').style.display = 'none';
            document.getElementById('disconnect').style.display = 'block';
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// Fungsi untuk mendapatkan saldo ETH
async function getETHBalance(address) {
    const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
    });
    return window.web3.utils.fromWei(balance, 'ether'); // Mengonversi dari Wei ke Ether
}

// Fungsi untuk mint NFT
async function mintNFT() {
    if (currentSupply < maxSupply) {
        // Logika minting NFT ke smart contract
        // Contoh: await contract.methods.mint(mintAmount).send({ from: userAccount });
        currentSupply += mintAmount; // Tambah jumlah NFT yang telah dimint
        document.getElementById('supply').innerText = `Supply: ${currentSupply}/${maxSupply}`;
        alert(`Successfully minted ${mintAmount} NFT(s)!`);
    } else {
        alert("All NFTs have been minted!");
    }
}

// Fungsi untuk meningkatkan jumlah mint
function increaseMintAmount() {
    if (mintAmount < 5) { // Maksimal mint 5
        mintAmount++;
        document.getElementById('mintAmount').innerText = mintAmount;
    }
}

// Fungsi untuk mengurangi jumlah mint
function decreaseMintAmount() {
    if (mintAmount > 1) { // Minimal mint 1
        mintAmount--;
        document.getElementById('mintAmount').innerText = mintAmount;
    }
}

// Fungsi untuk memutuskan sambungan wallet
function disconnectWallet() {
    document.getElementById('walletInfo').style.display = 'none';
    document.querySelector('.mint-controls').style.display = 'none';
    document.getElementById('connectWallet').style.display = 'block';
    document.getElementById('disconnect').style.display = 'none';
}

// Event Listeners
document.getElementById('connectWallet').addEventListener('click', connectWallet);
document.getElementById('mintNFT').addEventListener('click', mintNFT);
document.getElementById('increase').addEventListener('click', increaseMintAmount);
document.getElementById('decrease').addEventListener('click', decreaseMintAmount);
document.getElementById('disconnect').addEventListener('click', disconnectWallet);
