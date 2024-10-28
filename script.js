const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [
    // Masukkan ABI kontrak Anda di sini
];

const connectWalletButton = document.getElementById("connectWalletButton");
const mintNFTButton = document.getElementById("mintNFTButton");
const walletInfo = document.getElementById("walletInfo");
const walletAddressElement = document.getElementById("walletAddress");
const walletBalanceElement = document.getElementById("walletBalance");
const disconnectButton = document.getElementById("disconnectButton");
const supplyTracker = document.getElementById("supplyTracker");

let provider;
let signer;
let userAddress = "";

async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();
            displayWalletInfo();
            updateWalletBalance();
            updateSupplyTracker();
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    } else {
        alert("MetaMask not detected.");
    }
}

function displayWalletInfo() {
    connectWalletButton.style.display = "none";
    mintNFTButton.style.display = "block";
    walletInfo.style.display = "block";
    walletAddressElement.textContent = `Wallet Address: ${userAddress}`;
}

async function updateWalletBalance() {
    const balance = await provider.getBalance(userAddress);
    const etherBalance = ethers.utils.formatEther(balance);
    walletBalanceElement.textContent = `Balance: ${etherBalance} ETH`;
}

async function updateSupplyTracker() {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const totalSupply = await contract.getTotalSupply();
    supplyTracker.textContent = `${totalSupply}/4444`;
    if (totalSupply >= 4444) {
        mintNFTButton.textContent = "Sold Out";
        mintNFTButton.disabled = true;
    }
}

async function mintNFT() {
    try {
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const mintPrice = await contract.getMintPrice();
        const tx = await contract.mint({ value: mintPrice });
        await tx.wait();
        alert("Minting successful!");
        updateWalletBalance();
        updateSupplyTracker();
    } catch (error) {
        console.error("Minting failed:", error);
        alert("Minting failed. Check balance or try again.");
    }
}

function disconnectWallet() {
    userAddress = "";
    provider = null;
    signer = null;
    connectWalletButton.style.display = "block";
    mintNFTButton.style.display = "none";
    walletInfo.style.display = "none";
}

connectWalletButton.onclick = connectWallet;
mintNFTButton.onclick = mintNFT;
disconnectButton.onclick = disconnectWallet;
