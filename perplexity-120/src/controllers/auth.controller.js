
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";


/**
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body username, email, password
 */
export async function register(req, res) {
  const { username, email, password } = req.body;
  const isUsrAlredyExist = await userModel.findOne({ $or: [{ email }, { username }] });
  if (isUsrAlredyExist) {
    return res.status(400).json({ success: false, err: "User already exists" })
  }

  const user = await userModel.create({ username, email, password })

  //token and link 
  const emailVerificationToken = jwt.sign({
    email: user.email,
  }, process.env.JWT_SECRET)

  // send verification email
  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity!",
    html: `
    <p>Hi ${username},</p>
    <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you!</p>
    <p>Please click the link below to verify your email address:</p>
    <a href="http://localhost:5000/api/auth/verify-email?token=${emailVerificationToken}">Verify your email</a>
    <p>If you did not create this account, please ignore this email.</p>
    <p>Best regards,<br>The Perplexity Team</p>
  `
  })

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })

}


/**
 * @description Login a user
 * @route POST /api/auth/login
 * @access Public
 * @body email, password
 */

export async function login(req,res){
  const {email,password} = req.body;
  const user = await userModel.findOne({email}).select("+password");

  if(!user){
    return res.status(400).json({
      message:"Invalid email or password",
      success:false,
      err:"User not found"
    })
  }

  const isPasswordMatch = await user.isPasswordCorrect(password)
  if(!isPasswordMatch){
    return res.status(400).json({
      message:"Invalid email or password",
      success:false,
      err:"Invalid password"
    })
  }

  if(!user.verified){
    return res.status(400).json({
      message:"Please verify your email first",
      success:false,
      err:"Email not verified"
    })
  }

  const token = jwt.sign({
    id:user._id,
    username:user.username,
  },process.env.JWT_SECRET,{expiresIn:"7d"})

  res.cookie("token",token)

  res.status(200).json({
    message:"User logged in successfully",
    success:true,
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  })

}

/**
 * @desc get current logged in user 
 * @route GET /api/auth/get-me
 * @access Private
 */
export async function getMe(req,res){
  const userId = req.user.id;
  const user = await userModel.findById(userId).select("-password");

  if(!user){
    return res.status(400).json({
      message:"User not found",
      success:false,
      err:"User not found"
    })
  }

  res.status(200).json({
    message:"User fetched successfully",
    success:true,
    user
  })
}

/**
 * @description Verify user email
 * @route GET /api/auth/verify-email
 * @access Public
 * @query token
 */

export async function verifyEmail(req, res) {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email })
    if (!user) {
      return res.status(400).json({ success: false, err: "User not found" })
    }
    user.verified = true;
    await user.save();

    const html = `
   <h1>Email Verified Successfully</h1>
   <p>Your email has been verified successfully. You can now login to your account.</p>
   <a href="http://localhost:3000/login">Login</a>
   `
    return res.send(html)
  } catch (error) {
    return res.status(400).json({ success: false, err: "Invalid token" })
  }

} 