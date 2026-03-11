import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";
import { body, validationResult } from "express-validator";

const authRouter = Router();

authRouter.post("/register",
    [
   body("username").isString().withMessage("User name should be string"),
   body("email").isEmail().withMessage("Email should be valid email adress"),
   

    ]
, registerController)

export default authRouter;