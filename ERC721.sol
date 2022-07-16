pragma solidity ^0.8.0;

import "../ERC721Upgradeable.sol";
import "../../../utils/CountersUpgradeable.sol";

contract GameItem is ERC721Upgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    constructor() ERC721Upgradeable() public {
    }

    function awardItem(address player, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);

        return newItemId;
    }
}