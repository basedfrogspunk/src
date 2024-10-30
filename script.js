// Inisialisasi variabel
let web3;
let contract;
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Ganti dengan alamat kontrak Anda
const abi = [ /* Masukkan ABI kontrak Anda di sini */ ];
let account;
let mintQuantity = 1; // Jumlah mint default

// Elemen DOM
const connectButton = document.getElementById('connectWallet');
const disconnectButton = document.getElementById('disconnectWallet');
const mintButton = document.getElementById('mintNFT');
const walletAddressElement = document.getElementById('walletAddress');
const ethBalanceElement = document.getElementById('ethBalance');
const supplyElement = document.getElementById('supply');
const quantityElement = document.getElementById('quantity');
const statusElement = document.getElementById('status');

// Menghubungkan wallet
connectButton.onclick = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = (await web3.eth.getAccounts())[0];
            walletAddressElement.innerText = `Wallet Address: ${account}`;
            await updateBalance();
            connectButton.style.display = 'none'; // Sembunyikan tombol connect
            disconnectButton.style.display = 'block'; // Tampilkan tombol disconnect
            mintButton.style.display = 'block'; // Tampilkan tombol mint
            document.getElementById('walletInfo').style.display = 'block'; // Tampilkan info wallet
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Please install MetaMask!');
    }
};

// Memutuskan wallet
disconnectButton.onclick = () => {
    account = null;
    walletAddressElement.innerText = '';
    ethBalanceElement.innerText = '';
    connectButton.style.display = 'block'; // Tampilkan tombol connect
    disconnectButton.style.display = 'none'; // Sembunyikan tombol disconnect
    mintButton.style.display = 'none'; // Sembunyikan tombol mint
    document.getElementById('walletInfo').style.display = 'none'; // Sembunyikan info wallet
};

// Memperbarui saldo ETH
async function updateBalance() {
    const balance = await web3.eth.getBalance(account);
    ethBalanceElement.innerText = `ETH Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;
}

// Fungsi untuk mencetak NFT
mintButton.onclick = async () => {
    if (!account) {
        alert('Please connect your wallet first!');
        return;
    }

    const supply = parseInt(supplyElement.innerText.split(' ')[0]); // Ambil supply yang telah dicetak
    const totalSupply = 4444; // Total supply

    if (supply >= totalSupply) {
        alert('All NFTs have been minted!');
        return;
    }

    try {
        let price;
        if (supply < 1000) { // Fase 1
            price = web3.utils.toWei('0', 'ether'); // FreeMint
        } else if (supply < 3000) { // Fase 2
            price = web3.utils.toWei('0.0015', 'ether'); // Fase 2
        } else { // Fase 3
            price = web3.utils.toWei('0.0025', 'ether'); // Fase 3
        }

        const result = await contract.methods.mint(mintQuantity).send({ from: account, value: price * mintQuantity });
        console.log(result);
        statusElement.innerText = 'Minting successful!';
        supplyElement.innerText = `${supply + mintQuantity} / ${totalSupply}`; // Perbarui supply
    } catch (error) {
        console.error(error);
        statusElement.innerText = 'Minting failed!';
    }
};

// Fungsi untuk menambah atau mengurangi jumlah mint
document.getElementById('increase').onclick = () => {
    if (mintQuantity < 5) {
        mintQuantity++;
        quantityElement.innerText = mintQuantity;
    }
};

document.getElementById('decrease').onclick = () => {
    if (mintQuantity > 1) {
        mintQuantity--;
        quantityElement.innerText = mintQuantity;
    }
};

// Inisialisasi kontrak
window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(abi, contractAddress);
    } else {
        alert('Please install MetaMask!');
    }
});
