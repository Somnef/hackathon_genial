const errorHandler = (err, req, res, next) => {
  // Set default status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error("Error:", err); // Log the error for debugging

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
