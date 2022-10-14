//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AvatarRendererLite is ERC721URIStorage {
    using Strings for uint256;

    uint256 public counterSupply = 0;
    bool public paused = true;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    // public
    function mint(string memory _metadataIPFSHASH)  public payable returns (uint256) {

        _safeMint(msg.sender, counterSupply + 1);

        _setTokenURI(counterSupply + 1, _metadataIPFSHASH);

        counterSupply++;

        return counterSupply;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ifps://";
    }
}
