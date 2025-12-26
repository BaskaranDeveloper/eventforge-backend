// Bring in the User model
import User from "../models/user.model.js";

// Function to get the current user's profile
export const getMyProfile = async (req, res) => {
    try {
        // Get the user ID from the authenticated request
        const userId = req.user.id;
        // Find the user in the database
        const user = await User.findById(userId);

        // If user not found, return error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        // Return the user's profile data
        return res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });


    } catch (error) {
        // Log errors and send generic error response
        console.error("Get profile error: " + error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}


export const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        // Prevent email duplication
        if (email) {
            const emailExists = await User.findOne({
                email,
                _id: { $ne: userId }
            });

            if (emailExists) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already in use'
                })
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile Update successfully",
            data: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }
        })

    } catch (error) {

        console.error('Update profile error: ', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })


    }

}