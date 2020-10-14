// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract BTCCapOracle {
  // Contract owner
  address public owner;

  // BTC Marketcap Storage
  uint public _btcMarketCap;

  // Callback function
  event CallbackGetBTCCap();

  constructor() public {
    owner = msg.sender;
  }

  function updateBTCCap() public {
    // Calls the callback function
    emit CallbackGetBTCCap();
  }

  function setBTCCap(uint cap) public {
    // If it isn't sent by a trusted oracle, a.k.a ourselves, ignore it
    require(msg.sender == owner, "This function is restricted to the contract's owner");
    _btcMarketCap = cap;
  }

  function getBTCCap() view public returns (uint) {
    return _btcMarketCap;
  }
}
