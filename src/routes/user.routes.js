// Bring in Express for routing
import express from "express";
// Get the auth middleware to protect routes
import { protect } from "../middlewares/auth.middleware.js";
// Get the profile controller function
import { getMyProfile, updateMyProfile } from "../controllers/user.controller.js";

import { updateProfileValidator } from "../middlewares/validators/auth.validator.js"

// Create a router for user routes
const router = express.Router();

// GET /api/users/me - get current user's profile (requires login)
router.get("/me", protect, getMyProfile)
router.put('/me', protect, updateProfileValidator, updateMyProfile)

export default router;