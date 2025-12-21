// Bring in JWT to verify tokens
import jwt from "jsonwebtoken";

// Middleware to protect routes - checks if user is logged in with valid token
export const protect = (req, res, next) => {
    try {
        // Get the token from the request
        let token;

        // Check if Authorization header starts with "Bearer"
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            // Extract the token part after "Bearer "
            token = req.headers.authorization.split(" ")[1];
        }

        // If no token found, return error
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token missing'
            })
        }

        // Verify the token with our secret
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // Add user info from token to the request
        req.user = {
            id: decode.id,
            role: decode.role
        }

        // Continue to the next middleware/route
        next()

    } catch (error) {
        // If token is invalid, return error
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token invalid'
        })

    }
}