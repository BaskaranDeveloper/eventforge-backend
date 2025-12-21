// Bring in Express to create routes
import express from 'express';
// Get the signup and login functions from the auth controller
import { login, signup } from '../controllers/auth.controller.js';
// Get the validators to check auth data
import { loginValidator, signupValidator } from '../middlewares/validators/auth.validator.js';

import { protect } from '../middlewares/auth.middleware.js';

// Create a new router for auth routes
const router = express.Router();

// Set up the signup route with validation - first check the data, then create the user
router.post('/signup', signupValidator, signup);

// Set up the signin route with validation - first check the data, then log in the user
router.post('/signin', loginValidator, login);


// product middleware
router.get("/me", protect, (req, res) => {
    return res.status(200).json({
        sucess: true,
        message: 'Access granted',
        user: req.user
    });
})
// Export this router so it can be used in the main app
export default router;
