// Inisialisasi Web3
let web3;
let contract;
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Ganti dengan alamat kontrak yang sudah di-deploy
const abi = [ /* ABI kontrak Anda di sini */ ];

const mintAmountElement = document.getElementById('mintAmount');
const supplyCounter = document.getElementById('supplyCounter');
const connectWalletButton = document.getElementById('connectWalletButton');
const mintButton = document.getElementById('mintButton');
const walletInfo = document.getElementById('walletInfo');
const disconnectButton = document.getElementById('disconnectButton');
const statusMessage = document.getElementById('status');

// Variabel untuk menyimpan jumlah mint yang diinginkan
let mintAmount = 1;

// Fungsi untuk mengupdate jumlah mint yang akan dilakukan
function updateMintAmount(amount) {
    mintAmount = Math.max(1, mintAmount + amount); // Tidak boleh kurang dari 1
    mintAmountElement.textContent = mintAmount;
}

// Fungsi untuk menghubungkan wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            contract = new web3.eth.Contract(abi, contractAddress);

            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            walletInfo.textContent = `Wallet: ${account}`;
            walletInfo.style.display = 'block';
            connectWalletButton.style.display = 'none'; // Sembunyikan tombol connect
            mintButton.style.display = 'block'; // Tampilkan tombol mint
            disconnectButton.style.display = 'block'; // Tampilkan tombol disconnect
        } catch (error) {
            console.error("Connection failed", error);
            statusMessage.textContent = "Connection failed. Please try again.";
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// Fungsi untuk memutuskan koneksi wallet
function disconnectWallet() {
    walletInfo.style.display = 'none';
    connectWalletButton.style.display = 'block'; // Tampilkan tombol connect
    mintButton.style.display = 'none'; // Sembunyikan tombol mint
    disconnectButton.style.display = 'none'; // Sembunyikan tombol disconnect
    statusMessage.textContent = "Disconnected from wallet.";
}

// Fungsi untuk mint NFT
async function mintNFT() {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    
    let price;

    // Menentukan harga berdasarkan fase
    try {
        const phase = await contract.methods.currentPhase().call();
        if (phase == 0) { // FreeMint
            price = 0;
        } else if (phase == 1) { // PhaseTwo
            price = 0.0005 * mintAmount;
        } else if (phase == 2) { // PhaseThree
            price = 0.0015 * mintAmount;
        }

        const result = await contract.methods.mint(mintAmount).send({ 
            from: account, 
            value: web3.utils.toWei(price.toString(), 'ether') 
        });

        console.log(result);
        statusMessage.textContent = `Minting successful! Transaction Hash: ${result.transactionHash}`;
        // Update supply counter here
        updateSupplyCounter();
    } catch (error) {
        console.error("Minting failed", error);
        statusMessage.textContent = "Minting failed. Please check your wallet or the contract.";
    }
}

// Fungsi untuk memperbarui jumlah pasokan
async function updateSupplyCounter() {
    const totalSupply = await contract.methods.totalSupply().call();
    supplyCounter.textContent = `${totalSupply}/4444`;
}

// Event listener untuk tombol
document.getElementById('incrementButton').addEventListener('click', () => updateMintAmount(1));
document.getElementById('decrementButton').addEventListener('click', () => updateMintAmount(-1));
connectWalletButton.addEventListener('click', connectWallet);
disconnectButton.addEventListener('click', disconnectWallet);
mintButton.addEventListener('click', mintNFT);
