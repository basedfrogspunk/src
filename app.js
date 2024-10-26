document.addEventListener("DOMContentLoaded", () => {
    const connectWalletButton = document.getElementById("connectWallet");
    const mintNftButton = document.getElementById("mintNft");
    const walletAddressText = document.getElementById("walletAddressText");
    const walletAddressElement = document.getElementById("walletAddress");

    let provider;

    // Fungsi untuk connect ke MetaMask
    async function connectWallet() {
        if (typeof window.ethereum !== "undefined") {
            try {
                provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();

                // Tampilkan alamat wallet dan tombol mint, sembunyikan tombol connect
                walletAddressText.textContent = address;
                walletAddressElement.style.display = "block";
                connectWalletButton.style.display = "none";
                mintNftButton.style.display = "block";
            } catch (error) {
                console.error("Gagal menghubungkan wallet:", error);
            }
        } else {
            alert("MetaMask tidak terdeteksi. Silakan instal MetaMask.");
        }
    }

    connectWalletButton.addEventListener("click", connectWallet);
});
