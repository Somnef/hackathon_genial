const jwt = require('jsonwebtoken');

// Load the JWT secret from environment variables or use a default value
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing.' });
        }

        // Extract the token (Bearer <TOKEN>)
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token missing.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach the decoded payload (user info) to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
