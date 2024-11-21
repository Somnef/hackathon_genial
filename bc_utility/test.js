const Web3 = require('web3');
const web3 = new Web3('http://172.21.128.1:7545'); // Your Besu node host and RPC port

const abi = [/* Your contract ABI here */];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const energyTradingSol = new web3.eth.Contract(abi, contractAddress);

const payerAddress = '0xA7e37689F9C63dB93291EE13FD7666E2C8Cc0B49';
const privateKey = '8417779402eae454d51d3633bf9f649a0d9f64f553400f61680e5900efcbc8fb';

async function registerUser() {
    const nonce = await web3.eth.getTransactionCount(payerAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const chainId = await web3.eth.getChainId();

    const callFun = energyTradingSol.methods.registerUser();
    const tx = {
        from: payerAddress,
        to: contractAddress,
        gas: await callFun.estimateGas({ from: payerAddress }),
        gasPrice: gasPrice,
        data: callFun.encodeABI(),
        nonce: nonce,
        chainId: chainId
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const txCallFunHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    const txCallFunReceipt = await web3.eth.getTransactionReceipt(txCallFunHash.transactionHash);

    console.log(txCallFunReceipt);
}

registerUser().catch(console.error);