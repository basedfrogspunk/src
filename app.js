// Menangani klik pada tombol Connect Wallet
document.getElementById('connectWallet').addEventListener('click', function() {
    const walletOptions = document.getElementById('walletOptions');
    // Tampilkan atau sembunyikan opsi dompet
    if (walletOptions.style.display === 'none') {
        walletOptions.style.display = 'block';
    } else {
        walletOptions.style.display = 'none';
    }
});

// Menangani klik pada setiap tombol dompet
const walletButtons = document.querySelectorAll('.wallet-button');
walletButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedWallet = this.getAttribute('data-wallet');
        // Tindakan yang sesuai berdasarkan dompet yang dipilih
        alert(`You selected: ${selectedWallet}`);
        
        // Logika untuk menghubungkan dengan dompet yang dipilih
        connectWallet(selectedWallet);
    });
});

// Fungsi untuk menghubungkan ke dompet
function connectWallet(wallet) {
    // Di sini Anda bisa menambahkan logika untuk menghubungkan ke dompet
    // Misalnya, menggunakan ethers.js untuk MetaMask
    if (wallet === 'metamask') {
        // Cek apakah MetaMask terpasang
        if (typeof window.ethereum !== 'undefined') {
            // Meminta akses akun
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    // Jika berhasil terhubung, tampilkan tombol Mint NFT dan supply
                    document.getElementById('mintNft').style.display = 'block';
                    document.getElementById('supply').style.display = 'block'; // Menampilkan supply
                    document.getElementById('status').innerText = `Connected to ${accounts[0]}`;
                })
                .catch(error => {
                    console.error(error);
                    document.getElementById('status').innerText = 'Connection failed';
                });
        } else {
            alert('Please install MetaMask!');
       
