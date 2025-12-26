// Middleware to validate signup data before processing
export const signupValidator = (req, res, next) => {
    // Get the data from the request
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, and password are required'
        });
    }

    // Check if the email looks like a real email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }

    // Make sure the password is strong enough
    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 8 characters'
        })
    }

    // If everything is good, move to the next step
    next();
}

// Middleware to validate login data before processing
export const loginValidator = (req, res, next) => {
    // Get email and password from the request
    const { email, password } = req.body;

    // Make sure both are provided
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and Password are required'
        })
    }
    // If good, continue
    next();
}


// Validate profile update data
export const updateProfileValidator = (req, res, next) => {
    const { name, email } = req.body;

    // Check at least one field provided
    if (!name && !email) {
        return res.status(400).json({
            success: false,
            message: 'At least one field (name or email) is required'
        })
    }

    // Validate email if provided
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            })
        }
    }

    next();
}


// Validate password change data
export const changePasswordValidator = (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    // Check required fields
    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Old password and new password are required'
        });
    }

    // Check new password length
    if (newPassword.length < 8) {
        return res.status(400).json({
            success: false,
            message: 'New password must be at least 8 characters'
        })
    }

    next();
}
