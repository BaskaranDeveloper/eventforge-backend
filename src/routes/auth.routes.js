// Bring in Express to create routes
import express from 'express';
// Get the signup function from the auth controller
import { signup } from '../controllers/auth.controller.js';
// Get the validator to check signup data
import { signupValidator } from '../middlewares/validators/auth.validator.js';

// Create a new router for auth routes
const router = express.Router();

// Set up the signup route with validation - first check the data, then create the user
router.post('/signup', signupValidator, signup);

// Export this router so it can be used in the main app
export default router;
