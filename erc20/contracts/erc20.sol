// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20("MyToken", "MYT"){
    address private owner =0xB5ADB29C608CFbfA5D6BB216cCC80eCBd76A45F1;


  constructor(){

    owner=0xB5ADB29C608CFbfA5D6BB216cCC80eCBd76A45F1;
    require(owner!=address(0), "Zero address not allowed");
    _mint(owner, 20000e18);
  }

function mint(uint _amount ) external{
    require(msg.sender==owner, "You are not authorize to mint new Token");

    _mint(msg.sender, _amount * 1e18);
}
}
