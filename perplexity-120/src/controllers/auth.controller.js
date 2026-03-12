import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  const isUsrAlredyExist = await userModel.findOne({ $or: [{ email }, { username }] });
  if (isUsrAlredyExist) {
    return res.status(400).json({ success: false, err: "User already exists" })
  }

  const user = await userModel.create({ username, email, password })

  // send verification email
  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity!",
    html: `
    <p>Hi ${username},</p>
    <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you!</p>
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