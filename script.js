let web3;
let account;
let contract;
let supply = 0; // Menyimpan jumlah NFT yang sudah dimint
const totalSupply = 4444; // Total supply NFT

// Kontrak ABI dan alamat kontrak Anda
const contractABI = [
   [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"BatchMintInvalidBatchId","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"BatchMintInvalidTokenId","type":"error"},{"inputs":[{"internalType":"uint256","name":"batchId","type":"uint256"}],"name":"BatchMintMetadataFrozen","type":"error"},{"inputs":[],"name":"ContractMetadataUnauthorized","type":"error"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"CurrencyTransferLibFailedNativeTransfer","type":"error"},{"inputs":[{"internalType":"bytes32","name":"expected","type":"bytes32"},{"internalType":"bytes32","name":"actual","type":"bytes32"}],"name":"DelayedRevealIncorrectResultHash","type":"error"},{"inputs":[],"name":"DelayedRevealNothingToReveal","type":"error"},{"inputs":[{"internalType":"uint256","name":"expected","type":"uint256"},{"internalType":"uint256","name":"actual","type":"uint256"}],"name":"DropClaimExceedLimit","type":"error"},{"inputs":[{"internalType":"uint256","name":"expected","type":"uint256"},{"internalType":"uint256","name":"actual","type":"uint256"}],"name":"DropClaimExceedMaxSupply","type":"error"},{"inputs":[{"internalType":"address","name":"expectedCurrency","type":"address"},{"internalType":"uint256","name":"expectedPricePerToken","type":"uint256"},{"internalType":"address","name":"actualCurrency","type":"address"},{"internalType":"uint256","name":"actualExpectedPricePerToken","type":"uint256"}],"name":"DropClaimInvalidTokenPrice","type":"error"},{"inputs":[{"internalType":"uint256","name":"expected","type":"uint256"},{"internalType":"uint256","name":"actual","type":"uint256"}],"name":"DropClaimNotStarted","type":"error"},{"inputs":[],"name":"DropExceedMaxSupply","type":"error"},{"inputs":[],"name":"DropNoActiveCondition","type":"error"},{"inputs":[],"name":"DropUnauthorized","type":"error"},{"inputs":[],"name":"LazyMintInvalidAmount","type":"error"},{"inputs":[],"name":"LazyMintUnauthorized","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnableUnauthorized","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"PermissionsAlreadyGranted","type":"error"},{"inputs":[{"internalType":"address","name":"expected","type":"address"},{"internalType":"address","name":"actual","type":"address"}],"name":"PermissionsInvalidPermission","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"bytes32","name":"neededRole","type":"bytes32"}],"name":"PermissionsUnauthorizedAccount","type":"error"},{"inputs":[{"internalType":"uint256","name":"max","type":"uint256"},{"internalType":"uint256","name":"actual","type":"uint256"}],"name":"PlatformFeeExceededMaxFeeBps","type":"error"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"name":"PlatformFeeInvalidRecipient","type":"error"},{"inputs":[],"name":"PlatformFeeUnauthorized","type":"error"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"name":"PrimarySaleInvalidRecipient","type":"error"},{"inputs":[],"name":"PrimarySaleUnauthorized","type":"error"},{"inputs":[{"internalType":"uint256","name":"max","type":"uint256"},{"internalType":"uint256","name":"actual","type":"uint256"}],"name":"RoyaltyExceededMaxFeeBps","type":"error"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"}],"name":"RoyaltyInvalidRecipient","type":"error"},{"inputs":[],"name":"RoyaltyUnauthorized","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"uint256","name":"startTimestamp","type":"uint256"},{"internalType":"uint256","name":"maxClaimableSupply","type":"uint256"},{"internalType":"uint256","name":"supplyClaimed","type":"uint256"},{"internalType":"uint256","name":"quantityLimitPerWallet","type":"uint256"},{"internalType":"bytes32","name":"merkleRoot","type":"bytes32"},{"internalType":"uint256","name":"pricePerToken","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"string","name":"metadata","type":"string"}],"indexed":false,"internalType":"struct IClaimCondition.ClaimCondition[]","name":"claimConditions","type":"tuple[]"},{"indexed":false,"internalType":"bool","name":"resetEligibility","type":"bool"}],"name":"ClaimConditionsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"prevURI","type":"string"},{"indexed":false,"internalType":"string","name":"newURI","type":"string"}],"name":"ContractURIUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newRoyaltyRecipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"newRoyaltyBps","type":"uint256"}],"name":"DefaultRoyalty","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"platformFeeRecipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"flatFee","type":"uint256"}],"name":"FlatPlatformFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"maxTotalSupply","type":"uint256"}],"name":"MaxTotalSupplyUpdated","type":"event"},{"anonymous":false,"inputs":[],"name":"MetadataFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"prevOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"platformFeeRecipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"platformFeeBps","type":"uint256"}],"name":"PlatformFeeInfoUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"enum IPlatformFee.PlatformFeeType","name":"feeType","type":"uint8"}],"name":"PlatformFeeTypeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"}],"name":"PrimarySaleRecipientUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"royaltyRecipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"royaltyBps","type":"uint256"}],"name":"RoyaltyForToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"string","name":"revealedURI","type":"string"}],"name":"TokenURIRevealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"claimConditionIndex","type":"uint256"},{"indexed":true,"internalType":"address","name":"claimer","type":"address"},{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"startTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"quantityClaimed","type":"uint256"}],"name":"TokensClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"startTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endTokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"baseURI","type":"string"},{"indexed":false,"internalType":"bytes","name":"encryptedBaseURI","type":"bytes"}],"name":"TokensLazyMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"batchFrozen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint256","name":"_quantity","type":"uint256"},{"internalType":"address","name":"_currency","type":"address"},{"internalType":"uint256","name":"_pricePerToken","type":"uint256"},{"components":[{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"},{"internalType":"uint256","name":"quantityLimitPerWallet","type":"uint256"},{"internalType":"uint256","name":"pricePerToken","type":"uint256"},{"internalType":"address","name":"currency","type":"address"}],"internalType":"struct IDrop.AllowlistProof","name":"_allowlistProof","type":"tuple"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"claim","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimCondition","outputs":[{"internalType":"uint256","name":"currentStartId","type":"uint256"},{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractType","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractVersion","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bytes","name":"key","type":"bytes"}],"name":"encryptDecrypt","outputs":[{"internalType":"bytes","name":"result","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"encryptedData","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"freezeBatchBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getActiveClaimConditionId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBaseURICount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getBatchIdAtIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_conditionId","type":"uint256"}],"name":"getClaimConditionById","outputs":[{"components":[{"internalType":"uint256","name":"startTimestamp","type":"uint256"},{"internalType":"uint256","name":"maxClaimableSupply","type":"uint256"},{"internalType":"uint256","name":"supplyClaimed","type":"uint256"},{"internalType":"uint256","name":"quantityLimitPerWallet","type":"uint256"},{"internalType":"bytes32","name":"merkleRoot","type":"bytes32"},{"internalType":"uint256","name":"pricePerToken","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"string","name":"metadata","type":"string"}],"internalType":"struct IClaimCondition.ClaimCondition","name":"condition","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDefaultRoyaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFlatPlatformFeeInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlatformFeeInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlatformFeeType","outputs":[{"internalType":"enum IPlatformFee.PlatformFeeType","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_batchId","type":"uint256"},{"internalType":"bytes","name":"_key","type":"bytes"}],"name":"getRevealURI","outputs":[{"internalType":"string","name":"revealedURI","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"member","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getRoyaltyInfoForToken","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_conditionId","type":"uint256"},{"internalType":"address","name":"_claimer","type":"address"}],"name":"getSupplyClaimedByWallet","outputs":[{"internalType":"uint256","name":"supplyClaimedByWallet","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRoleWithSwitch","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_defaultAdmin","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_contractURI","type":"string"},{"internalType":"address[]","name":"_trustedForwarders","type":"address[]"},{"internalType":"address","name":"_saleRecipient","type":"address"},{"internalType":"address","name":"_royaltyRecipient","type":"address"},{"internalType":"uint128","name":"_royaltyBps","type":"uint128"},{"internalType":"uint128","name":"_platformFeeBps","type":"uint128"},{"internalType":"address","name":"_platformFeeRecipient","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_batchId","type":"uint256"}],"name":"isEncryptedBatch","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"string","name":"_baseURIForTokens","type":"string"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"lazyMint","outputs":[{"internalType":"uint256","name":"batchId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextTokenIdToClaim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextTokenIdToMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"primarySaleRecipient","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"},{"internalType":"bytes","name":"_key","type":"bytes"}],"name":"reveal","outputs":[{"internalType":"string","name":"revealedURI","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"salePrice","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"royaltyAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"startTimestamp","type":"uint256"},{"internalType":"uint256","name":"maxClaimableSupply","type":"uint256"},{"internalType":"uint256","name":"supplyClaimed","type":"uint256"},{"internalType":"uint256","name":"quantityLimitPerWallet","type":"uint256"},{"internalType":"bytes32","name":"merkleRoot","type":"bytes32"},{"internalType":"uint256","name":"pricePerToken","type":"uint256"},{"internalType":"address","name":"currency","type":"address"},{"internalType":"string","name":"metadata","type":"string"}],"internalType":"struct IClaimCondition.ClaimCondition[]","name":"_conditions","type":"tuple[]"},{"internalType":"bool","name":"_resetClaimEligibility","type":"bool"}],"name":"setClaimConditions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"setContractURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_royaltyRecipient","type":"address"},{"internalType":"uint256","name":"_royaltyBps","type":"uint256"}],"name":"setDefaultRoyaltyInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_platformFeeRecipient","type":"address"},{"internalType":"uint256","name":"_flatFee","type":"uint256"}],"name":"setFlatPlatformFeeInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxTotalSupply","type":"uint256"}],"name":"setMaxTotalSupply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_platformFeeRecipient","type":"address"},{"internalType":"uint256","name":"_platformFeeBps","type":"uint256"}],"name":"setPlatformFeeInfo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"enum IPlatformFee.PlatformFeeType","name":"_feeType","type":"uint8"}],"name":"setPlatformFeeType","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_saleRecipient","type":"address"}],"name":"setPrimarySaleRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_bps","type":"uint256"}],"name":"setRoyaltyInfoForToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"}],"name":"updateBatchBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_conditionId","type":"uint256"},{"internalType":"address","name":"_claimer","type":"address"},{"internalType":"uint256","name":"_quantity","type":"uint256"},{"internalType":"address","name":"_currency","type":"address"},{"internalType":"uint256","name":"_pricePerToken","type":"uint256"},{"components":[{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"},{"internalType":"uint256","name":"quantityLimitPerWallet","type":"uint256"},{"internalType":"uint256","name":"pricePerToken","type":"uint256"},{"internalType":"address","name":"currency","type":"address"}],"internalType":"struct IDrop.AllowlistProof","name":"_allowlistProof","type":"tuple"}],"name":"verifyClaim","outputs":[{"internalType":"bool","name":"isOverride","type":"bool"}],"stateMutability":"view","type":"function"}]
];
const contractAddress = '0x8e5A29002e4be62a4a1AfD211AE7fFF5DfD1bD49'; // Ganti dengan alamat kontrak Anda

// Fungsi untuk menginisialisasi saat halaman dimuat
window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        
        // Event listener untuk tombol
        document.getElementById('connectWallet').addEventListener('click', connectWallet);
        document.getElementById('mintNFT').addEventListener('click', mintNFT);
        document.getElementById('disconnectWallet').addEventListener('click', disconnectWallet);
        
        // Menyembunyikan tombol Mint NFT dan Disconnect saat halaman dimuat
        document.getElementById('mintNFT').style.display = 'none';
        document.getElementById('disconnectWallet').style.display = 'none';
    } else {
        alert('Please install MetaMask!');
    }
});

// Fungsi untuk menghubungkan wallet
async function connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    document.getElementById('walletAddress').innerText = account;
    await updateBalance();
    updateSupply();

    // Menampilkan tombol Mint NFT dan Disconnect setelah wallet terhubung
    document.getElementById('mintNFT').style.display = 'inline-block';
    document.getElementById('disconnectWallet').style.display = 'inline-block';
    
    // Menyembunyikan tombol Connect Wallet setelah terhubung
    document.getElementById('connectWallet').style.display = 'none';

    // Inisialisasi kontrak
    contract = new web3.eth.Contract(contractABI, contractAddress);
}

// Fungsi untuk memperbarui saldo ETH pengguna
async function updateBalance() {
    const balance = await web3.eth.getBalance(account);
    const etherBalance = web3.utils.fromWei(balance, 'ether');
    document.getElementById('ethBalance').innerText = etherBalance + ' ETH';
}

// Fungsi untuk melakukan minting NFT
async function mintNFT() {
    if (!account) {
        alert('Please connect your wallet first!');
        return;
    }

    try {
        // Memanggil fungsi mint di kontrak Anda
        await contract.methods.mint(account).send({ from: account, value: web3.utils.toWei('0.05', 'ether') }); // Sesuaikan nilai dengan biaya minting
        supply++;
        updateSupply();
    } catch (error) {
        console.error(error);
        alert('Minting failed. Please try again.');
    }
}

// Fungsi untuk memperbarui supply NFT
function updateSupply() {
    document.getElementById('supply').innerText = `${supply}/${totalSupply}`;
    
    // Mengubah status tombol Mint NFT jika sudah terjual habis
    if (supply >= totalSupply) {
        document.getElementById('mintNFT').innerText = 'Sold Out';
        document.getElementById('mintNFT').disabled = true; // Menonaktifkan tombol
    }
}

// Fungsi untuk memutuskan koneksi wallet
function disconnectWallet() {
    account = null;
    document.getElementById('walletAddress').innerText = '0xYourWalletAddress';
    document.getElementById('ethBalance').innerText = '0 ETH';
    document.getElementById('supply').innerText = '0/4444';
    document.getElementById('mintNFT').innerText = 'Mint NFT';
    document.getElementById('mintNFT').disabled = false; // Mengaktifkan kembali tombol

    // Menampilkan kembali tombol Connect Wallet dan menyembunyikan yang lainnya
    document.getElementById('connectWallet').style.display = 'inline-block';
    document.getElementById('mintNFT').style.display = 'none';
    document.getElementById('disconnectWallet').style.display = 'none';
}

// Event listener untuk memperbarui tampilan supply
document.addEventListener("DOMContentLoaded", function () {
    const connectWalletButton = document.getElementById("connectWallet");
    const mintNFTButton = document.getElementById("mintNFT");
    const disconnectWalletButton = document.getElementById("disconnectWallet");
    const walletAddressDisplay = document.getElementById("walletAddress");
    const ethBalanceDisplay = document.getElementById("ethBalance");
    const supplyDisplay = document.getElementById("supply");

    let currentSupply = 0; // Jumlah NFT yang sudah mint
    const maxSupply = 4444; // Total maksimal supply NFT

    // Fungsi untuk memperbarui tampilan supply
    function updateSupplyDisplay() {
        supplyDisplay.innerText = `${currentSupply}/${maxSupply}`;
        if (currentSupply >= maxSupply) {
            mintNFTButton.innerText = "Sold Out";
            mintNFTButton.disabled = true;
        }
    }

    // Inisialisasi tampilan awal
    mintNFTButton.classList.add("hidden");
    disconnectWalletButton.classList.add("hidden");
    updateSupplyDisplay();

    // Fungsi untuk menangani koneksi wallet
    connectWalletButton.addEventListener("click", async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                const walletAddress = accounts[0];
                walletAddressDisplay.innerText = walletAddress;

                // Mendapatkan saldo ETH pengguna
                const balance = await ethereum.request({
                    method: "eth_getBalance",
                    params: [walletAddress, "latest"]
                });
                const ethBalance = parseFloat(parseInt(balance, 16) / 1e18).toFixed(4);
                ethBalanceDisplay.innerText = `${ethBalance} ETH`;

                // Sembunyikan tombol Connect Wallet, tampilkan tombol Mint NFT dan Disconnect
                connectWalletButton.classList.add("hidden");
                mintNFTButton.classList.remove("hidden");
                disconnectWalletButton.classList.remove("hidden");
            } catch (error) {
                console.error("Failed to connect wallet", error);
            }
        } else {
            alert("Please install MetaMask to use this feature!");
        }
    });

    // Fungsi untuk menangani disconnect wallet
    disconnectWalletButton.addEventListener("click", () => {
        // Reset tampilan dompet dan saldo
        walletAddressDisplay.innerText = "0xYourWalletAddress";
        ethBalanceDisplay.innerText = "0 ETH";

        // Sembunyikan tombol Mint NFT dan Disconnect, tampilkan tombol Connect Wallet
        mintNFTButton.classList.add("hidden");
        disconnectWalletButton.classList.add("hidden");
        connectWalletButton.classList.remove("hidden");
    });

    // Fungsi untuk menangani minting NFT
    mintNFTButton.addEventListener("click", async () => {
        try {
            // Tambahkan logika mint NFT di sini, misalnya pemanggilan kontrak pintar untuk mint NFT

            // Pembaruan contoh: setiap kali klik, jumlah supply bertambah
            currentSupply++;
            updateSupplyDisplay();

        } catch (error) {
            console.error("Minting NFT failed", error);
        }
    });
});
