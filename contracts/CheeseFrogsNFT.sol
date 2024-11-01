// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CheeseFrogsNFT is ERC721, Ownable {
    uint256 public totalSupply; // Total supply NFT
    uint256 public maxSupply = 4444; // Maksimal supply
    uint256 public phaseOneSupply = 700; // Supply fase 1
    uint256 public phaseTwoSupply = 1200; // Supply fase 2
    uint256 public phaseThreeSupply = maxSupply - phaseOneSupply - phaseTwoSupply; // Supply fase 3
    uint256 public mintPricePhase1 = 0; // Harga fase 1 (FreeMint)
    uint256 public mintPricePhase2 = 0.0005 ether; // Harga fase 2
    uint256 public mintPricePhase3 = 0.0015 ether; // Harga fase 3

    mapping(address => uint256) public mintCount; // Mencatat jumlah mint per alamat

    enum MintPhase { Phase1, Phase2, Phase3 } // Enum untuk fase minting
    MintPhase public currentPhase; // Menyimpan fase saat ini

    constructor() ERC721("CheeseFrogs NFT", "CFrogs") {}

    // Fungsi untuk mendapatkan harga minting berdasarkan fase
    function getCurrentMintPrice() public view returns (uint256) {
        if (currentPhase == MintPhase.Phase1) return mintPricePhase1;
        if (currentPhase == MintPhase.Phase2) return mintPricePhase2;
        if (currentPhase == MintPhase.Phase3) return mintPricePhase3;
        return 0;
    }

    // Fungsi untuk minting NFT
    function mintNFT(uint256 quantity) external payable {
        require(totalSupply + quantity <= maxSupply, "Exceeds max supply");
        require(quantity > 0, "Mint at least one NFT");
        require(mintCount[msg.sender] + quantity <= maxMintPerPhase(), "Exceeds max mint per wallet");
        require(msg.value >= getCurrentMintPrice() * quantity, "Insufficient payment");

        for (uint256 i = 0; i < quantity; i++) {
            totalSupply++;
            mintCount[msg.sender]++;
            _safeMint(msg.sender, totalSupply); // Mint NFT ke alamat pengirim
        }

        // Memeriksa apakah kita harus beralih fase
        updateMintPhase();
    }

    // Fungsi untuk mendapatkan batas minting per wallet berdasarkan fase
    function maxMintPerPhase() public view returns (uint256) {
        if (currentPhase == MintPhase.Phase1) return 1; // Maksimal mint fase 1
        if (currentPhase == MintPhase.Phase2) return 2; // Maksimal mint fase 2
        if (currentPhase == MintPhase.Phase3) return 5; // Maksimal mint fase 3
        return 0;
    }

    // Fungsi untuk memperbarui fase minting
    function updateMintPhase() internal {
        if (totalSupply < phaseOneSupply) {
            currentPhase = MintPhase.Phase1; // Fase 1
        } else if (totalSupply < phaseOneSupply + phaseTwoSupply) {
            currentPhase = MintPhase.Phase2; // Fase 2
        } else {
            currentPhase = MintPhase.Phase3; // Fase 3
        }
    }

    // Fungsi untuk menarik Ether yang diterima
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance); // Mengirim saldo ke pemilik kontrak
    }
}
