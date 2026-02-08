const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const authRouter = express.Router()




// / REGISTER USER
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  
  // check if email already exist?

  const existingUser = await userModel.findOne({email})

  if(existingUser){
    return res.status(400).json({
        message : "User already exist with this email"
    })
  }
    // 🔐 PASSWORD HASH
  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex")

  //create user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword
  })

  //tokenization 

  const token = jwt.sign(
    {id: user._id},
    process.env.JWT_SECRET
  )


 res.cookie("token", token)

  res.status(201).json({
    message: "User created successfully",
    user,
    token
  })
})

module.exports = authRouter
