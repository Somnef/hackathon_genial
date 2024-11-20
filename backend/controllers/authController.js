const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Your User model

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Sign-Up Controller
const signUp = async (req, res) => {
  try {
    const { name, email, password, walletId } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

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
    });

    await user.save();

    return res.status(201).json({ message: "User registered successfully." });
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
