const { Web3 } = require("web3");

const web3 = new Web3("http://192.168.137.200:7545");

const contractABI = require("./contract_abi.json");
const contractAddress = require("./contract_address.json").contractAddress;

const getContractInstance = () => {
  return new web3.eth.Contract(contractABI, contractAddress);
};

module.exports = { web3, getContractInstance, contractAddress };
