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
    const walletId = "0xc28854ac599aA7AE052bAc7BDA90afFEF46A10FE";
    const privateKey =
      "0x07f6e3cfa97f1509e6de552df32d5288271c90f3946cdfbb6cb957a80fbf28d2"; // Add your private key

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
