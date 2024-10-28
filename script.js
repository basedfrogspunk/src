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
        document.getElementById('mintNFT').innerText = 'Sold Out';
        document.getElementById('mintNFT').disabled = true; // Menonaktifkan tombol
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

// Event listener untuk memperbarui tampilan supply
document.addEventListener("DOMContentLoaded", function () {
    const connectWalletButton = document.getElementById("connectWallet");
    const mintNFTButton = document.getElementById("mintNFT");
    const disconnectWalletButton = document.getElementById("disconnectWallet");
    const walletAddressDisplay = document.getElementById("walletAddress");
    const ethBalanceDisplay = document.getElementById("ethBalance");
    const supplyDisplay = document.getElementById("supply");

    let currentSupply = 0; // Jumlah NFT yang sudah mint
    const maxSupply = 4444; // Total maksimal supply NFT

    // Fungsi untuk memperbarui tampilan supply
    function updateSupplyDisplay() {
        supplyDisplay.innerText = `${currentSupply}/${maxSupply}`;
        if (currentSupply >= maxSupply) {
            mintNFTButton.innerText = "Sold Out";
            mintNFTButton.disabled = true;
        }
    }

    // Inisialisasi tampilan awal
    mintNFTButton.classList.add("hidden");
    disconnectWalletButton.classList.add("hidden");
    updateSupplyDisplay();

    // Fungsi untuk menangani koneksi wallet
    connectWalletButton.addEventListener("click", async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                const walletAddress = accounts[0];
                walletAddressDisplay.innerText = walletAddress;

                // Mendapatkan saldo ETH pengguna
                const balance = await ethereum.request({
                    method: "eth_getBalance",
                    params: [walletAddress, "latest"]
                });
                const ethBalance = parseFloat(parseInt(balance, 16) / 1e18).toFixed(4);
                ethBalanceDisplay.innerText = `${ethBalance} ETH`;

                // Sembunyikan tombol Connect Wallet, tampilkan tombol Mint NFT dan Disconnect
                connectWalletButton.classList.add("hidden");
                mintNFTButton.classList.remove("hidden");
                disconnectWalletButton.classList.remove("hidden");
            } catch (error) {
                console.error("Failed to connect wallet", error);
            }
        } else {
            alert("Please install MetaMask to use this feature!");
        }
    });

    // Fungsi untuk menangani disconnect wallet
    disconnectWalletButton.addEventListener("click", () => {
        // Reset tampilan dompet dan saldo
        walletAddressDisplay.innerText = "0xYourWalletAddress";
        ethBalanceDisplay.innerText = "0 ETH";

        // Sembunyikan tombol Mint NFT dan Disconnect, tampilkan tombol Connect Wallet
        mintNFTButton.classList.add("hidden");
        disconnectWalletButton.classList.add("hidden");
        connectWalletButton.classList.remove("hidden");
    });

    // Fungsi untuk menangani minting NFT
    mintNFTButton.addEventListener("click", async () => {
        try {
            // Tambahkan logika mint NFT di sini, misalnya pemanggilan kontrak pintar untuk mint NFT

            // Pembaruan contoh: setiap kali klik, jumlah supply bertambah
            currentSupply++;
            updateSupplyDisplay();

        } catch (error) {
            console.error("Minting NFT failed", error);
        }
    });
});
