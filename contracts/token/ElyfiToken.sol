// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol';

contract ElyfiToken is ERC20Snapshot {
  uint256 internal constant TOTAL_SUPPLY = 100000000 ether;

  constructor() ERC20('ELFI Token', 'ELFI') {
    _mint(msg.sender, TOTAL_SUPPLY);
  }
}
