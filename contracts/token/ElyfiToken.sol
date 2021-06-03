// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '../access/ElyfiAccessControl.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract ElyfiToken is ERC20Snapshot, ElyfiAccessControl {
  uint256 internal constant TOTAL_SUPPLY = 100000000 ether;

  constructor() ERC20('ELFI Token', 'ELFI') {
    _mint(msg.sender, TOTAL_SUPPLY);
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function snapshot() external onlySnapshotMaker returns (uint256) {
    return _snapshot();
  }
}
