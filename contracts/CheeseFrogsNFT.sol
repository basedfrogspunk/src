// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CheeseFrogsNFT is ERC721, Ownable {
    using Strings for uint256;

    uint256 public constant MAX_SUPPLY = 4444;
    uint256 public totalSupply;
    
    enum MintPhase { FreeMint, PhaseTwo, PhaseThree }
    MintPhase public currentPhase;
    
    mapping(address => uint256) public mintCount;

    constructor() ERC721("CheeseFrogs", "CFROG") {
        currentPhase = MintPhase.FreeMint; // Memulai dari fase FreeMint
    }

    // Mengatur fase minting
    function setMintPhase(uint8 phase) external onlyOwner {
        require(phase <= 2, "Invalid phase");
        currentPhase = MintPhase(phase);
    }

    // Fungsi mint NFT
    function mint(uint256 quantity) external payable {
        require(totalSupply + quantity <= MAX_SUPPLY, "Exceeds max supply");
        require(quantity > 0, "Must mint at least one NFT");
        
        if (currentPhase == MintPhase.FreeMint) {
            require(mintCount[msg.sender] < 1, "Max 1 NFT per wallet in FreeMint phase");
            require(msg.value == 0, "No payment required in FreeMint phase");
        } else if (currentPhase == MintPhase.PhaseTwo) {
            require(mintCount[msg.sender] + quantity <= 2, "Max 2 NFTs per wallet in Phase 2");
            require(msg.value == 0.0015 ether * quantity, "Incorrect ETH amount for Phase 2");
        } else if (currentPhase == MintPhase.PhaseThree) {
            require(mintCount[msg.sender] + quantity <= 5, "Max 5 NFTs per wallet in Phase 3");
            require(msg.value == 0.0025 ether * quantity, "Incorrect ETH amount for Phase 3");
        }
        
        for (uint256 i = 0; i < quantity; i++) {
            totalSupply++;
            mintCount[msg.sender]++;
            _safeMint(msg.sender, totalSupply); // Mint NFT
        }
    }

    // Mengambil metadata NFT
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://your-base-uri.com/metadata/"; // Ganti dengan base URI Anda
    }

    // Mengambil jumlah mint per wallet
    function getMintCount(address wallet) external view returns (uint256) {
        return mintCount[wallet];
    }

    // Mengambil total supply NFT
    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }

    // Fungsi untuk menarik ETH dari kontrak
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
