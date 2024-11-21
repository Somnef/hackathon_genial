const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Your User model
const {
  contractAddress,
  web3,
  getContractInstance,
} = require("./utils/contractUtil"); // Import your utility function

async function registerUser() {
  try {
    const contract = getContractInstance();
    const walletId = "0xC77B3dcc92F50d28CBb17821d56f682A9E329C05";
    const privateKey =
      "0xde6d1215b75bcf9d4adb5856802d03dcae2fefe7fc90864532779d9182599705"; // Add your private key

    // Get transaction details
    const nonce = await web3.eth.getTransactionCount(walletId);
    const gasPrice = await web3.eth.getGasPrice();
    const chainId = await web3.eth.getChainId();

    // Prepare the smart contract call
    const callFun = contract.methods.registerUser(walletId);
    const tx = {
      from: walletId,
      to: contractAddress,
      gas: await callFun.estimateGas({ from: walletId }),
      gasPrice: gasPrice,
      data: callFun.encodeABI(),
      nonce: nonce,
      chainId: chainId,
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // Send the signed transaction
    const txCallFunHash = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    // Get the transaction receipt
    const txCallFunReceipt = await web3.eth.getTransactionReceipt(
      txCallFunHash.transactionHash
    );

    console.log(txCallFunReceipt);
  } catch (error) {
    console.error("Error during registration:", error);
  }
}

// Call the function
registerUser();
