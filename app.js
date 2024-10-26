document.addEventListener("DOMContentLoaded", () => {
    const connectWalletButton = document.getElementById("connectWallet");
    const walletAddressText = document.getElementById("walletAddressText");
    const walletAddressElement = document.getElementById("walletAddress");
    const supplyElement = document.getElementById("supply");
    const mintNftButton = document.getElementById("mintNft");

    let provider;

    // Fungsi untuk connect ke MetaMask
    async function connectWallet() {
        if (typeof window.ethereum !== "undefined") {
            try {
                provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();

                // Menampilkan alamat wallet dan tombol mint
                walletAddressText.textContent = address;
                walletAddressElement.style.display = "block";
                supplyElement.style.display = "block";
                mintNftButton.style.display = "block";
            } catch (error) {
                console.error("Gagal menghubungkan wallet:", error);
            }
        } else {
            alert("MetaMask tidak terdeteksi. Silakan instal MetaMask.");
        }
    }

    // Event listener untuk connect wallet
    connectWalletButton.addEventListener("click", connectWallet);
});
