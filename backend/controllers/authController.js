const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Your User model
const {
  contractAddress,
  web3,
  getContractInstance,
} = require("../utils/contractUtil"); // Import your utility function

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Sign-Up Controller
const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Create a new wallet for the user
    const newAccount = web3.eth.accounts.create(); // Generates a new wallet (privateKey and address)
    const { privateKey, address: walletId } = newAccount;

    // Check if the wallet ID is already in use
    const existingWallet = await User.findOne({ walletId });
    if (existingWallet) {
      return res.status(400).json({ message: "Wallet ID is already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      walletId,
      privateKey, // Store private key securely
    });

    // Save user to the database
    await user.save();

    // Get the contract instance from the utility
    const contract = getContractInstance();

    // Register the user on the blockchain
    const nonce = await web3.eth.getTransactionCount(walletId);
    const gasPrice = await web3.eth.getGasPrice();
    const chainId = await web3.eth.getChainId();

    // Call registerUser() on the smart contract
    const callFun = contract.methods.registerUser(walletId); // Pass walletId to the smart contract
    const tx = {
      from: walletId,
      to: contractAddress,
      gas: await callFun.estimateGas({ from: walletId }),
      gasPrice: gasPrice,
      data: callFun.encodeABI(),
      nonce: nonce,
      chainId: chainId,
    };

    // // Sign the transaction
    // const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    // const txCallFunHash = await web3.eth.sendSignedTransaction(
    //   signedTx.rawTransaction
    // );
    // const txCallFunReceipt = await web3.eth.getTransactionReceipt(
    //   txCallFunHash.transactionHash
    // );

    // console.log(txCallFunReceipt);

    return res.status(201).json({
      message: "User registered successfully.",
      walletId: walletId, // Return wallet ID to the frontend (if needed)
    });
  } catch (error) {
    next(error);
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, walletId: user.walletId },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token, message: "Login successful." });
  } catch (error) {
    next(error);
  }
};

// Get Me Controller
const getMe = async (req, res) => {
  try {
    const userId = req.user._id; // Extracted from JWT middleware
    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, signUp, getMe };
