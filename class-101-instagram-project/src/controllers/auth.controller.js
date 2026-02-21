const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

async function registerController(req, res) {
  const { email, username, password, bio, profileImage } = req.body;

  // const isUserExistByEmail = await userModel.findOne({email})

  // if(isUserExistByEmail){
  //     return res.status(409).json({
  //         message:"user already exist with this email"
  //     })
  // }

  //effecient way

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        "User already exist" +
        (isUserAlreadyExist.email == email
          ? "Email already exist"
          : "User name already exist"),
    });
  }

  const hash = await bcrypt.hash(password,10)

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  /**
   * -user ka data hona chahiye
   * - data unique hona chchaiye us se sign krte hai
   */

  const token = jwt.sign(
    {
      id: user._id,username:user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    email: user.email,
    username: user.username,
    bio: user.bio,
    profileImage: user.profileImage,
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found ",
    });
  }

  // const hash = crypto.createHash("sha256").update(password).digest("hex");
  // const isPasswordValid = hash === user.password;

    const isPasswordValid = await bcrypt.compare(password,user.password)

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password invalid",
    });
  }

  const token = jwt.sign({ id: user._id, username:user.username}, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "User loggedIn successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
  registerController,
  loginController,
  
};