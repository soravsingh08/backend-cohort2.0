import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";

const authRouter = Router();

// POST /api/auth/register
authRouter.route("/register").post(registerValidator, register);

export default authRouter