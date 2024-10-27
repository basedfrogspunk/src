const providerOptions = {
    walletconnect: {
        package: window.WalletConnectProvider.default,
        options: {
            infuraId: "5f6a2059e50245f1b8df50fe81d02ae2", // Ganti dengan ID Infura kamu
        },
    },
    coinbasewallet: {
        package: window.CoinbaseWalletProvider.default,
        options: {
            appName: "CheeseFrogs",
            infuraId: "5f6a2059e50245f1b8df50fe81d02ae2", // Ganti dengan ID Infura kamu
        },
    },
};

const web3Modal = new Web3Modal.default({
    cacheProvider: true,
    providerOptions,
});

let provider;
let signer;

const contractAddress = "0xC09CbdD6a6e9381Fb73581b0ee5A536f0fEBb13c"; // Ganti dengan alamat kontrak
const contractABI = [
    // Tambahkan ABI kontrak di sini
];

async function connectWallet() {
    try {
        provider = await web3Modal.connect();
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        signer = ethersProvider.getSigner();

        document.getElementById("status").textContent = "Wallet Connected!";
        document.getElementById("mintNft").style.display = "inline-block";
        updateSupply();
    } catch (error) {
        console.error("Connection failed", error);
        document.getElementById("status").textContent = "Failed to connect wallet.";
    }
}

async function updateSupply() {
    const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
    const totalSupply = await nftContract.totalSupply();
    document.getElementById("supply").textContent = `${totalSupply} / 4444`;
}

async function mintNFT() {
    const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await nftContract.mint({
        value: ethers.utils.parseEther("0.05"),
    });
    await tx.wait();
    document.getElementById("status").textContent = "Mint Successful!";
    updateSupply();
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("mintNft").addEventListener("click", mintNFT);
