const { Web3 } = require("web3");

// Initialize Web3
const web3 = new Web3("http://192.168.137.200:7545"); // Replace with your blockchain node URL

// ABI and Contract Address
const contractABI = [
  // Replace with your contract's ABI
];
const contractAddress = "0x..."; // Replace with your contract's address

// Utility function to get the contract instance
const getContractInstance = () => {
  return new web3.eth.Contract(contractABI, contractAddress);
};

module.exports = { web3, getContractInstance };
