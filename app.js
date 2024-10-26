const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
const contractAddress = "0xYourSmartContractAddress"; // Ganti dengan alamat kontrak Anda
const maxSupply = 10000; // Total supply NFT

const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{ "name": "to", "type": "address" }],
        "name": "mintNFT",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
];

const contract = new ethers.Contract(contractAddress, abi, provider);

async function updateSupply() {
    try {
        const totalMinted = await contract.totalSupply();
        document.getElementById("supply").textContent = `${totalMinted}/${maxSupply}`;
    } catch (error) {
        console.error("Gagal mengambil supply:", error);
    }
}

document.getElementById("connectWallet").onclick = async () => {
    try {
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        document.getElementById("status").textContent = `Connected: ${await signer.getAddress()}`;

        document.getElementById("connectWallet").style.display = "none";
        document.getElementById("supply").style.display = "block";
        document.getElementById("mintNft").style.display = "block";

        updateSupply();
    } catch (error) {
        console.error("Gagal menghubungkan wallet:", error);
    }
};

document.getElementById("mintNft").onclick = async () => {
    try {
        const tx = await contract.mintNFT(await signer.getAddress(), {
            value: ethers.utils.parseEther("0.01")
        });
        await tx.wait();

        alert("NFT berhasil dimint!");
        updateSupply();
    } catch (error) {
        console.error("Minting gagal:", error);
        alert("Minting gagal. Coba lagi.");
    }
};
