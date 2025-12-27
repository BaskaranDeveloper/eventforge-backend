import express from "express";
import {
    signup,
    login,
    forgotPassword,
    resetPassword
} from "../controllers/auth.controller.js";
import {
    signupValidator,
    loginValidator
} from "../middlewares/validators/auth.validator.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);

router.get("/me", protect, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Access granted",
        user: req.user
    });
});

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
