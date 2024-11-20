const { Web3 } = require("web3");

// Initialize Web3
const web3 = new Web3("http://192.168.137.200:7545"); // Replace with your blockchain node URL

// ABI and Contract Address
const contractABI = require("./contract_abi.json");
const contractAddress = "0x2d78dfB74d31B65c8E93F3a0CFa3e6D30b627066"; // Replace with your contract's address

// Utility function to get the contract instance
const getContractInstance = () => {
  return new web3.eth.Contract(contractABI, contractAddress);
};

module.exports = { web3, getContractInstance, contractAddress };
