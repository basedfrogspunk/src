const { createThirdwebClient, ConnectButton, darkTheme, createWallet, ethereum, ThirdwebProvider } = window["thirdwebReact"];

// Konfigurasi Thirdweb Client
const client = createThirdwebClient({
  clientId: "0962c4cf2f928af161be0d939a6e6573",  // Masukkan clientId kamu di sini
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.okex.wallet"),
  createWallet("com.safepal"),
  createWallet("pro.tokenpocket"),
  createWallet("walletConnect"),
  createWallet("com.trustwallet.app"),
  createWallet("com.bitget.web3"),
  createWallet("org.uniswap"),
  createWallet("me.rainbow"),
];

function Example() {
  return React.createElement(ConnectButton, {
    client: client,
    wallets: wallets,
    theme: darkTheme({
      colors: {
        accentText: "hsl(242, 94%, 45%)",
        selectedTextBg: "hsl(240, 96%, 37%)",
        selectedTextColor: "hsl(228, 12%, 8%)",
        accentButtonBg: "hsl(137, 99%, 38%)",
      },
    }),
    connectButton: { label: "Connect Wallet" },
    connectModal: {
      size: "compact",
      title: "Connect Wallet",
      showThirdwebBranding: false,
    },
    accountAbstraction: {
      chain: ethereum,  // ganti dengan chain yang ingin kamu gunakan
      sponsorGas: true,
    },
    auth: {
      async doLogin(params) {
        // panggil backend untuk verifikasi payload
      },
      async doLogout() {
        // panggil backend untuk logout user jika perlu
      },
      async getLoginPayload(params) {
        // panggil backend dan return payload
      },
      async isLoggedIn() {
        // panggil backend untuk cek apakah user sudah login
      },
    },
  });
}

// Render ke dalam HTML
ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(ThirdwebProvider, null, React.createElement(Example))
);

