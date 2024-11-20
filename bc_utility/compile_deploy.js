const solc = require('solc');
const fs = require('fs');
const {Web3} = require('web3');

// Connect to the Hyperledger Besu network
const web3 = new Web3('http://localhost:8545');

// Read the contract file
const contractPath = './EnergyTrading.sol'; // Your contract file
const source = fs.readFileSync(contractPath, 'utf8');

// Compile the contract
const input = {
  language: 'Solidity',
  sources: {
    'EnergyTrading.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
};

const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));

// Get ABI and Bytecode
const abi = compiledContract.contracts['EnergyTrading.sol'].EnergyTrading.abi;
const bytecode = compiledContract.contracts['EnergyTrading.sol'].EnergyTrading.evm.bytecode.object;

async function deploy() {
  const accounts = await web3.eth.getAccounts();
  if (accounts.length === 0) {
    console.error('No accounts found. Please ensure your Ethereum client is running and accounts are unlocked.');
    return;
  }
  const deployer = accounts[0];

  // Unlock the deployer account
  await web3.eth.personal.unlockAccount(deployer, 'your_password', 10); // Unlock for 600 seconds

  const contract = new web3.eth.Contract(abi);

  const deployedContract = await contract.deploy({
    data: bytecode,
  }).send({
    from: deployer,
    gas: 1500000,
    gasPrice: '30000000000',
  });

  console.log('Contract deployed at address:', deployedContract.options.address);
}

deploy();
