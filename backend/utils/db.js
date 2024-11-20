const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hackathon_blockchain:moncef_Is_French1995@eskimos.qq9sb.mongodb.net/?retryWrites=true&w=majority&appName=eskimos"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
