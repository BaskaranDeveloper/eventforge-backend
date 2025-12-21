// Bring in JWT library to create and verify tokens
import jwt from "jsonwebtoken";

// Function to create a JWT token for a user
export const generateToken = (payload) => {
    // Sign the token with user data, secret key, and expiration time
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}