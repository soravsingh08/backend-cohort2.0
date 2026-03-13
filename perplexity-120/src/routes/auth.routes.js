import { Router } from "express";
import { register, login, verifyEmail, getMe } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";
const authRouter = Router();

/**
 * @description Register a new user
    * @route POST /api/auth/register
 * @access Public
 */
authRouter.post("/register", registerValidator, register);

/**
 * @description Login a user
 * @route POST /api/auth/login
 * @access Public
 * @body email, password
 */
authRouter.post("/login", loginValidator, login);

/**
 * @description Get current user
 * @route GET /api/auth/me
 * @access Private
 */
authRouter.get("/get-me", authUser, getMe);

/**
 * @description Verify user email
 * @route GET /api/auth/verify-email
 * @access Public
 */
authRouter.get("/verify-email", verifyEmail);

export default authRouter