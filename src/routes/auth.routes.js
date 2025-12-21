// Bring in Express to create routes
import express from 'express';
// Get the signup function from the auth controller
import { signup } from '../controllers/auth.controller.js';

// Create a new router for auth routes
const router = express.Router();

// Set up the signup route - when someone posts to /signup, call the signup function
router.post('/signup', signup);

// Export this router so it can be used in the main app
export default router;
