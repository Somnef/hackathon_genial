// Import required modules
const express = require("express");
const Web3 = require("web3");
const bodyParser = require("body-parser");

// Initialize the app
const app = express();
app.use(bodyParser.json()); // For parsing JSON payloads

// Initialize Web3 and connect to your blockchain
const web3 = new Web3("http://localhost:8545"); // Replace with your blockchain node URL

// ABI and Contract Address
const contractABI = [
  // Replace with your contract's ABI
];
const contractAddress = "0x..."; // Replace with your contract address

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Sample route to get data from the smart contract
app.get("/api/data", async (req, res) => {
  try {
    const data = await contract.methods.getData().call(); // Replace with your smart contract's read method
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, error: "Unable to fetch data" });
  }
});

app.post("/api/send", async (req, res) => {
  const { param1, param2 } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const receipt = await contract.methods
      .setData(param1, param2)
      .send({ from: accounts[0] });

    res.json({ success: true, receipt });
  } catch (error) {
    console.error("Error sending transaction:", error);
    res
      .status(500)
      .json({ success: false, error: "Unable to send transaction" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
