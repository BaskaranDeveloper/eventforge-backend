// Bring in the User model to work with user data
import User from "../models/user.model.js";

// Function to handle user signup
export const signup = async (req, res) => {
    try {
        // Get the name, email, and password from the request
        const { name, email, password } = req.body;


        // Check if a user with this email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "User already exists"
            });
        };

        // Create a new user in the database
        const user = await User.create(
            {
                name,
                email,
                password
            }
        );

        // Send back a success response with user info
        return res.status(200).json(
            {
                success: true,
                message: "User created successfully",
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        );

    } catch (error) {
        // Log any errors and send a generic error response
        console.error("Sign up error:" + error);

        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })

    }
}