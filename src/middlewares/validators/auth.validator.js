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

