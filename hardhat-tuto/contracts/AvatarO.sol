//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AvatarO is ERC721, Ownable, ERC721Enumerable, ERC721URIStorage {
    using Strings for uint256;

    uint256 public cost = 0.08 ether;
    uint256 public maxSupply = 10000;
    uint256 public counterSupply = 0;
    bool public paused = true;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    // public
    function mint(string memory _metadataURI)  public payable returns (uint256) {
        uint256 supply = totalSupply();
        require(!paused, "Contract paused, no minting allowed.");
        require(
            supply + 1 <= maxSupply,
            "Max supply reached, no minting allowed"
        );
        require(msg.value >= cost,(string) (abi.encodePacked(
                "Not enough fund, should pay more than ",
                cost,
                "eth"
            ))
        );

        _safeMint(msg.sender, supply + 1);

        _setTokenURI(supply + 1, _metadataURI);

        return supply + 1;
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setMaxSupply(uint256 _newMaxSupply) public onlyOwner {
        maxSupply = _newMaxSupply;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    /* 
  function withdraw() public payable onlyOwner {
    (bool hs, ) = payable(0x97D348fe58478a1FA29de4726134815A57834880).call{value: address(this).balance * 50 / 100}("");
    require(hs);
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }*/

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }
}
