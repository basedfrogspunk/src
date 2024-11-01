// app.js

// Variabel global untuk menyimpan informasi wallet dan state minting
let provider; // Untuk menyimpan provider wallet
let signer; // Untuk menyimpan signer wallet
let walletAddress; // Alamat wallet yang terhubung
let nftQuantity = 1; // Jumlah NFT yang ingin di-mint
let totalSupply = 4444; // Total supply NFT
let currentSupply = 0; // Supply saat ini (dimulai dari 0)
let mintPhase = 1; // Fase minting saat ini

// Menangani interaksi dengan DOM
document.getElementById('connectWallet').onclick = connectWallet; // Menangani klik pada tombol Connect Wallet
document.getElementById('increase').onclick = () => changeQuantity(1); // Menangani klik pada tombol +
document.getElementById('decrease').onclick = () => changeQuantity(-1); // Menangani klik pada tombol -
document.getElementById('mintNFT').onclick = mintNFT; // Menangani klik pada tombol Mint NFT
document.getElementById('disconnectWallet').onclick = disconnectWallet; // Menangani klik pada tombol Disconnect

// Fungsi untuk menghubungkan wallet
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        provider = new ethers.providers.Web3Provider(window.ethereum); // Menggunakan provider dari MetaMask
        await provider.send('eth_requestAccounts', []); // Meminta akses ke akun
        signer = provider.getSigner(); // Mendapatkan signer untuk transaksi
        walletAddress = await signer.getAddress(); // Mendapatkan alamat wallet

        // Mengupdate UI setelah wallet terhubung
        document.getElementById('walletAddress').innerText = `Wallet Address: ${walletAddress}`;
        const balance = await provider.getBalance(walletAddress);
        document.getElementById('walletBalance').innerText = `Balance: ${ethers.utils.formatEther(balance)} ETH`;
        document.getElementById('walletInfo').style.display = 'block'; // Menampilkan informasi wallet
        document.getElementById('connectWallet').style.display = 'none'; // Menyembunyikan tombol Connect Wallet
        document.getElementById('mintNFT').style.display = 'block'; // Menampilkan tombol Mint NFT
        document.getElementById('disconnectWallet').style.display = 'block'; // Menampilkan tombol Disconnect Wallet
        updateSupplyCount(); // Memperbarui count supply
    } else {
        alert('Please install MetaMask!'); // Peringatan jika MetaMask tidak terdeteksi
    }
}

// Fungsi untuk memutuskan koneksi wallet
function disconnectWallet() {
    walletAddress = null; // Mengosongkan alamat wallet
    signer = null; // Mengosongkan signer
    document.getElementById('walletInfo').style.display = 'none'; // Menyembunyikan informasi wallet
    document.getElementById('connectWallet').style.display = 'block'; // Menampilkan tombol Connect Wallet
    document.getElementById('mintNFT').style.display = 'none'; // Menyembunyikan tombol Mint NFT
    document.getElementById('disconnectWallet').style.display = 'none'; // Menyembunyikan tombol Disconnect Wallet
}

// Fungsi untuk mengubah jumlah NFT yang ingin di-mint
function changeQuantity(amount) {
    nftQuantity += amount; // Mengubah jumlah NFT
    if (nftQuantity < 1) nftQuantity = 1; // Minimum 1 NFT
    if (mintPhase === 1 && nftQuantity > 1) nftQuantity = 1; // Fase 1 maksimum 1
    if (mintPhase === 2 && nftQuantity > 2) nftQuantity = 2; // Fase 2 maksimum 2
    if (mintPhase === 3 && nftQuantity > 5) nftQuantity = 5; // Fase 3 maksimum 5
    document.getElementById('nftQuantity').innerText = nftQuantity; // Memperbarui jumlah NFT di UI
}

// Fungsi untuk melakukan minting NFT
async function mintNFT() {
    const mintPrice = getMintPrice(); // Mendapatkan harga mint sesuai fase
    const totalPrice = mintPrice * nftQuantity; // Menghitung total harga

    // Memastikan saldo mencukupi
    const balance = await provider.getBalance(walletAddress);
    if (ethers.utils.parseEther(totalPrice.toString()).gt(balance)) {
        alert('Insufficient balance to mint NFTs.');
        return;
    }

    try {
        const tx = await signer.sendTransaction({
            to: 'YOUR_CONTRACT_ADDRESS', // Ganti dengan alamat kontrak NFT Anda
            value: ethers.utils.parseEther(totalPrice.toString()) // Mengirim jumlah ETH sesuai dengan harga mint
        });

        await tx.wait(); // Menunggu hingga transaksi selesai
        currentSupply += nftQuantity; // Menambah supply saat ini
        updateSupplyCount(); // Memperbarui count supply
        alert('NFT Minted Successfully!'); // Notifikasi keberhasilan minting
    } catch (error) {
        console.error('Minting failed:', error);
        alert('Minting failed. Please try again.'); // Notifikasi kegagalan minting
    }
}

// Fungsi untuk memperbarui informasi supply di UI
function updateSupplyCount() {
    document.getElementById('supplyCount').innerText = `${currentSupply}/${totalSupply}`; // Menampilkan supply saat ini
    if (currentSupply >= totalSupply) {
        document.getElementById('mintNFT').innerText = 'Sold Out'; // Mengubah tombol jika supply habis
        document.getElementById('mintNFT').disabled = true; // Menonaktifkan tombol mint
    }
}

// Fungsi untuk mendapatkan harga mint sesuai fase
function getMintPrice() {
    if (mintPhase === 1) return 0; // Fase 1 FreeMint
    if (mintPhase === 2) return 0.0005; // Fase 2 harga
    if (mintPhase === 3) return 0.0015; // Fase 3 harga
}

// Fungsi untuk mengelola fase minting
function manageMintPhase() {
    if (currentSupply < 700) {
        mintPhase = 1; // Fase 1 jika supply kurang dari 700
    } else if (currentSupply < 1900) {
        mintPhase = 2; // Fase 2 jika supply kurang dari 1900
    } else {
        mintPhase = 3; // Fase 3 jika supply mencapai lebih dari 1900
    }
}

// Panggil fungsi manageMintPhase saat memulai
manageMintPhase();

