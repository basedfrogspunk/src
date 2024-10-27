let provider;
let signer;
let contract;
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Ganti dengan alamat kontrak Anda
const abi = [
    "function mint() public payable",
    "function mintPrice() public view returns (uint256)",
];

async function init() {
    if (typeof window.ethereum !== "undefined") {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
    }
}

document.getElementById('connectWalletButton').addEventListener('click', () => {
    const walletOptions = document.getElementById('walletOptions');
    const isVisible = walletOptions.style.display === 'block';
    walletOptions.style.display = isVisible ? 'none' : 'block';
});

// Pilihan wallet
document.querySelectorAll('.wallet').forEach(walletButton => {
    walletButton.addEventListener('click', async (e) => {
        const walletName = e.target.innerText;
        alert(`Connecting to ${walletName}...`);

        // Menyembunyikan pilihan wallet dan menampilkan bagian mint
        document.getElementById('walletOptions').style.display = 'none';
        document.getElementById('connectWalletButton').style.display = 'none';
        document.getElementById('mintSection').style.display = 'block';
    });
});

document.getElementById('mintButton').addEventListener('click', async () => {
    if (!contract) {
        alert("Contract not initialized.");
        return;
    }

    try {
        const mintPrice = await contract.mintPrice();
        const transaction = await contract.mint({ value: mintPrice });

        // Menunggu transaksi selesai
        await transaction.wait();
        alert("NFT minted successfully!");

        // Update supply dan ubah status
        let currentSupply = parseInt(document.getElementById('supply').innerText.split('/')[0]);
        currentSupply += 1;
       
