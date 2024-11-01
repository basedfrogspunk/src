let currentSupply = 0; // Jumlah NFT yang sudah di-mint
const maxSupply = 4444; // Maksimum jumlah NFT yang tersedia
let mintAmount = 1; // Jumlah NFT yang ingin di-mint
let web3; // Objek web3

// Menghubungkan wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const balance = await web3.eth.getBalance(accounts[0]);
            const ethBalance = web3.utils.fromWei(balance, 'ether');

            document.getElementById('walletAddress').innerText = `Wallet: ${accounts[0]}`;
            document.getElementById('walletBalance').innerText = `Balance: ${ethBalance} ETH`;
            document.getElementById('walletInfo').style.display = 'block';
            document.getElementById('connectButton').style.display = 'none';
            document.getElementById('mintButton').style.display = 'block';
            document.getElementById('disconnectButton').style.display = 'block';
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    } else {
        alert('Please install MetaMask!');
    }
}

// Memutuskan koneksi wallet
function disconnectWallet() {
    document.getElementById('walletAddress').innerText = '';
    document.getElementById('walletBalance').innerText = '';
    document.getElementById('walletInfo').style.display = 'none';
    document.getElementById('connectButton').style.display = 'block';
    document.getElementById('mintButton').style.display = 'none';
    document.getElementById('disconnectButton').style.display = 'none';
}

// Menambah jumlah mint
function increaseMint() {
    if (mintAmount < maxSupply - currentSupply) {
        mintAmount++;
        document.getElementById('mintAmount').innerText = mintAmount;
    }
}

// Mengurangi jumlah mint
function decreaseMint() {
    if (mintAmount > 1) {
        mintAmount--;
        document.getElementById('mintAmount').innerText = mintAmount;
    }
}

// Proses mint NFT
async function mintNFT() {
    if (currentSupply + mintAmount > maxSupply) {
        alert("Cannot mint more than available supply!");
        return;
    }

    // Logika mint NFT, ini adalah contoh dummy, Anda harus menggantinya dengan kontrak NFT Anda
    try {
        // Contoh pengiriman transaksi mint
        // const result = await contract.methods.mint(mintAmount).send({ from: accounts[0] });
        
        currentSupply += mintAmount; // Update jumlah supply
        document.getElementById('supply').innerText = `${currentSupply}/${maxSupply}`;
        document.getElementById('status').innerText = `Successfully minted ${mintAmount} NFT(s)!`;
    } catch (error) {
        console.error("Error minting NFT:", error);
        document.getElementById('status').innerText = "Minting failed!";
    }
}

// Memperbarui tampilan supply
document.getElementById('supply').innerText = `${currentSupply}/${maxSupply}`;
