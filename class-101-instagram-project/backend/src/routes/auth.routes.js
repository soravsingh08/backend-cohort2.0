const express = require("express");
const authController =require("../controllers/auth.controller")
const identifyUser = require("../middlewares/auth.middleware")

const authRouter = express.Router();

authRouter.post("/register",authController.registerController);

authRouter.post("/login", authController.loginController );

/**
 * @route GET /api/auth/get-me 
 * @description get current logged in user info
 * @access Private
 */ 

authRouter.get("/get-me", identifyUser, authController.getMeController)

module.exports = authRouter;

