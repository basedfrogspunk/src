let currentSupply = 0; // Mulai dari 0
const maxSupply = 4444; // Maksimal supply

function updateSupplyTracker() {
    const supplyTracker = document.getElementById("supply-tracker");
    supplyTracker.textContent = `${currentSupply}/${maxSupply}`;
}

function mintNFT() {
    if (currentSupply < maxSupply) {
        currentSupply += 1; // Tambahkan 1 setiap kali ada mint
        updateSupplyTracker();

        // Cek jika supply sudah habis
        if (currentSupply >= maxSupply) {
            const mintButton = document.getElementById("mint-nft");
            mintButton.textContent = "Sold Out"; // Ubah teks tombol menjadi "Sold Out"
            mintButton.classList.add("sold-out"); // Tambahkan gaya sold out
            mintButton.disabled = true; // Nonaktifkan tombol setelah supply habis
        }
    }
}

function connectWallet() {
    // Logika untuk menghubungkan wallet (dummy function)
    // Misalnya, Anda bisa menggunakan Web3.js atau Ethers.js untuk menghubungkan wallet

    const walletAddress = "0x1234567890abcdef1234567890abcdef12345678"; // Contoh alamat wallet
    const connectButton = document.getElementById("connect-wallet");
    const mintButton = document.getElementById("mint-nft");
    const disconnectButton = document.getElementById("disconnect");
    const walletInfo = document.getElementById("wallet-info");

    // Tampilkan alamat wallet setelah berhasil terhubung
    walletInfo.textContent = `Connected: ${walletAddress}`;
    
    // Tampilkan tombol Mint dan Disconnect setelah wallet terhubung
    connectButton.style.display = "none"; // Sembunyikan tombol Connect
    mintButton.style.display = "block"; // Tampilkan tombol Mint
    disconnectButton.style.display = "block"; // Tampilkan tombol Disconnect
}

function disconnectWallet() {
    const connectButton = document.getElementById("connect-wallet");
    const mintButton = document.getElementById("mint-nft");
    const disconnectButton = document.getElementById("disconnect");
    const walletInfo = document.getElementById("wallet-info");

    // Reset tampilan
    connectButton.style.display = "block"; // Tampilkan tombol Connect
    mintButton.style.display = "none"; // Sembunyikan tombol Mint
    disconnectButton.style.display = "none"; // Sembunyikan tombol Disconnect
    walletInfo.textContent = ""; // Hapus informasi wallet
}

// Panggil fungsi ini setiap kali halaman dimuat untuk mengatur tampilan awal
updateSupplyTracker();

// Import Web3
if (typeof window.ethereum !== 'undefined') {
    const Web3 = require('web3');
    const web3 = new Web3(window.ethereum);

    // Alamat kontrak dan ABI (Application Binary Interface)
    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Ganti dengan alamat kontrak yang telah dideploy
    const contractABI = [ /* ABI dari kontrak Anda di sini */ ];

    const cheeseFrogsNFT = new web3.eth.Contract(contractABI, contractAddress);

    async function mintNFT() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const mintPrice = await cheeseFrogsNFT.methods.mintPrice().call();

        cheeseFrogsNFT.methods.mintNFT()
            .send({ from: account, value: mintPrice })
            .on('transactionHash', function(hash){
                console.log('Transaction sent:', hash);
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log('Transaction confirmed:', receipt);
                // Perbarui supply tracker setelah berhasil mint
                currentSupply += 1;
                updateSupplyTracker();
            })
            .on('error', function(error, receipt) {
                console.error('Error minting NFT:', error);
            });
    }
}
