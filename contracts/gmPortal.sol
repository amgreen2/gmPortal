// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract GmPortal {
    uint256 totalGms;

    uint256 private seed;

    event NewGM(address indexed from, uint256 timestamp, string message);

    struct GM {
        address gmer;
        string message;
        uint256 timestamp;
    }
    GM[] gms;

    mapping(address => uint256) public lastGmd;

    constructor() payable {
        console.log("The smartiest of contracts");
        console.log("Constructor constructed");
        seed = (block.timestamp + block.difficulty) % 100;
    }
    function gm(string memory _message) public {
        //cooldown timer
        require(lastGmd[msg.sender] + 30 seconds 
        < block.timestamp, "Must wait 30 seconds before waving again.");
        lastGmd[msg.sender] = block.timestamp;

        totalGms += 1;
        console.log("%s has gm'd with message %s", msg.sender, _message);

        gms.push(GM(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prize = 0.00001 ether;
            require(
                prize <= address(this).balance,
                "Trying to wthdraw more money than the contract has"
            );
            (bool success, ) = (msg.sender).call{value: prize}("");
            require(success, "Failed to withdraw ether from the contract.");
        }
        emit NewGM(msg.sender, block.timestamp, _message);

    }

    function getAllGms() public view returns (GM[] memory) {
        return gms;
    }
    function getTotalGms() public view returns (uint256) {
        console.log("We have %d total gm's!", totalGms);
        return totalGms;
    }

}