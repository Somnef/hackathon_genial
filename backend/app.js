const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routers/router"); // Your routes
const connectDB = require("./utils/db"); // Your database connection utility

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json()); // For parsing application/json

// Routes
app.use(router); // Attach routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
