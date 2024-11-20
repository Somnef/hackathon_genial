// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Tambola {
    uint256 amount_gathered = 0;

    address payable wallet;

    event Winner(address _winner, uint256 _amount);

    modifier onlyPermittedAmount() {
        require (msg.value > 1e18 && msg.value % 2 == 0, "Please pass in a valid amount (2*n Eth, with n > 0).");
        _;
    }

    constructor() {
        wallet = payable(msg.sender);
    }

    function pay() public payable onlyPermittedAmount {
        amount_gathered += (msg.value / (2 * 1e18));
        wallet.transfer(msg.value / 2);

        if (amount_gathered >= 10) {
            payable(msg.sender).transfer(amount_gathered * 1e18);

            emit Winner(msg.sender, amount_gathered);
            
            amount_gathered = 0;
        }
    }
}