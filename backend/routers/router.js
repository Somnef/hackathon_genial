const express = require("express");
const offerController = require("../controllers/offerController");
const bidController = require("../controllers/bidController");
const blockchainController = require("../controllers/blockchainController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const errorHandler = require("../middleware/errorHandler"); // Your custom error handler

const router = express.Router();

// User routes
router.get("/api/user/list", userController.list);
router.post("/api/user/trade-history", userController.tradehistory);

// User auth routes

// create user -> create wallet -> register wallet with contract
router.post("/api/user/auth/sign-up", authController.signUp);

router.post("/api/user/auth/login", authController.login);
router.get("/api/auth/me", userController.getMe);

// Offer routes

// contract.methods.offerEnergy
router.post("/api/offer/create", offerController.create);
router.get("/api/offer/list", offerController.list);

// Auction bid routes
router.post("/api/auction/bid/create", bidController.create);
router.get("/api/auction/bid/list", bidController.list);

// Blockchain routes
router.post("/api/blockchain/transaction", blockchainController.transaction);
router.get(
  "/api/blockchain/transaction/:transactionHash",
  blockchainController.getTransactionByHash
);

// Global error handler middleware (after routes are defined)
router.use(errorHandler);

module.exports = router;