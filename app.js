// Inisialisasi provider dan kontrak
const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
const contractAddress = "0xYourSmartContractAddress"; // Ganti dengan alamat kontrak Anda
const maxSupply = 10000; // Total supply NFT

// ABI dari smart contract
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

// Membuat instansi kontrak
const contract = new ethers.Contract(contractAddress, abi, provider);

// Fungsi untuk memperbarui supply
async function updateSupply() {
    try {
        const totalMinted = await contract.totalSupply();
        document.getElementById("supply").textContent = `${totalMinted}/${maxSupply}`;
    } catch (error) {
        console.error("Gagal mengambil supply:", error);
    }
}

// Event listener untuk menghubungkan wallet
document.getElementById("connectWallet").addEventListener("click", async () => {
    try {
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        document.getElementById("status").textContent = `Connected: ${await signer.getAddress()}`;

        // Menyembunyikan tombol Connect Wallet dan menampilkan tombol Mint NFT
        document.getElementById("connectWallet").style.display = "none";
        document.getElementById("supply").style.display = "block";
        document.getElementById("mintNft").style.display = "inline-block";

        // Memperbarui supply NFT setelah wallet terhubung
        updateSupply();
    } catch (error) {
        console.error("Gagal menghubungkan wallet:", error);
    }
});

// Event listener untuk mint NFT
document.getElementById("mintNft").addEventListener("click", async () => {
    const supplyDisplay = document.getElementById("supply");
    let currentSupply = parseInt(supplyDisplay.textContent.split("/")[0]);

    // Mengupdate supply
    if (currentSupply < maxSupply) {
        try {
            const tx = await contract.mintNFT(await signer.getAddress(), {
                value: ethers.utils.parseEther("0.01") // Ganti dengan harga minting NFT yang sesuai
            });
            await tx.wait();

            alert("NFT berhasil dimint!");
            currentSupply++;
            supplyDisplay.textContent = `${currentSupply}/${maxSupply}`; // Update tampilan supply
        } catch (error) {
            console.error("Minting gagal:", error);
            alert("Minting gagal. Coba lagi.");
        }
    } else {
        alert("All NFTs have been minted!");
    }
});

// Event listener untuk menampilkan supply saat halaman dimuat
window.onload = updateSupply;
