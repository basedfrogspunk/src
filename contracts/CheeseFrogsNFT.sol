// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CheeseFrogsNFT is ERC721, Ownable {
    using SafeMath for uint256;

    uint256 public constant MAX_SUPPLY = 4444;
    uint256 public phaseOneSupply = 700;
    uint256 public phaseTwoSupply = 1200;
    uint256 public phaseThreeSupply = MAX_SUPPLY - phaseOneSupply - phaseTwoSupply;

    uint256 public phase; // 0: FreeMint, 1: PhaseTwo, 2: PhaseThree
    mapping(address => uint256) public walletMinted; // Track how many NFTs have been minted by an address

    // Event for Minting
    event Minted(address indexed owner, uint256 indexed tokenId);

    constructor() ERC721("CheeseFrogs", "CFrogs") {}

    function mint(uint256 amount) external payable {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        require(walletMinted[msg.sender] + amount <= getMaxMintPerWallet(), "Exceeds max mint per wallet");
        require(amount > 0, "Amount must be greater than 0");

        uint256 price = getCurrentMintPrice().mul(amount);
        require(msg.value >= price, "Insufficient funds sent");

        for (uint256 i = 0; i < amount; i++) {
            uint256 tokenId = totalSupply() + 1; // Token IDs start from 1
            _mint(msg.sender, tokenId);
            emit Minted(msg.sender, tokenId);
        }

        walletMinted[msg.sender] += amount;
    }

    function getMaxMintPerWallet() public view returns (uint256) {
        if (phase == 0) return 1; // FreeMint phase
        else if (phase == 1) return 2; // PhaseTwo
        else if (phase == 2) return 5; // PhaseThree
        return 0; // Default to 0 if phase is invalid
    }

    function getCurrentMintPrice() public view returns (uint256) {
        if (phase == 0) return 0; // FreeMint
        else if (phase == 1) return 0.0005 ether; // PhaseTwo
        else if (phase == 2) return 0.0015 ether; // PhaseThree
        return 0; // Default to 0 if phase is invalid
    }

    function totalSupply() public view returns (uint256) {
        return phaseOneSupply + phaseTwoSupply + phaseThreeSupply;
    }

    function setPhase(uint256 newPhase) external onlyOwner {
        require(newPhase >= 0 && newPhase <= 2, "Invalid phase");
        phase = newPhase;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function setPhaseOneSupply(uint256 newSupply) external onlyOwner {
        require(newSupply <= MAX_SUPPLY, "New supply exceeds MAX_SUPPLY");
        phaseOneSupply = newSupply;
    }

    function setPhaseTwoSupply(uint256 newSupply) external onlyOwner {
        require(newSupply <= MAX_SUPPLY - phaseOneSupply, "New supply exceeds available supply");
        phaseTwoSupply = newSupply;
    }

    function setPhaseThreeSupply(uint256 newSupply) external onlyOwner {
        require(newSupply <= MAX_SUPPLY - phaseOneSupply - phaseTwoSupply, "New supply exceeds available supply");
        phaseThreeSupply = newSupply;
    }
}
