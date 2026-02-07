const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()

authRouter.post("/register", async (req,res)=>{ //api creation - register, ye path hai page ka 
    const {email,name,password} = req.body // req.body se data ayega

    //we cat show 500 error direct
    const isUserAlreadyExists = await userModel.findOne({email})
    if(isUserAlreadyExists){
      return res.status(400).json({
        message:"User already exist with this email"
      })
    }


    const hash = crypto.createHash("md5").update(password).digest("hex")

    //to save this data we need model 
  //upar vale data se ek user ceate kreneg 
    const user = await userModel.create({
      email, password: hash, name 
    })

    const token = jwt.sign({
      id:user._id
    },

    process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message : "user registered",
        user,
        token
    })
   
})

/**
 * /api/auth/protected - to access
 */
authRouter.post("/protected", (req,res)=>{
  console.log(req.cookies);

  res.status(200).json({
    message : "This is a protected route",
  })
})

/**
 * /api/auth/login - to access
 */
authRouter.post("/login", async (req, res)=>{
   const { email, password } =req.body
   const user = await userModel.findOne({email})

    if(!user){
      return res.status(404).json({
        message : "User not found at this email adress"
      })
    }

    const isPasswordMatched = user.password = crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordMatched){
      return res.status(401).json({
        message : "Invalid Password"
      })
    }

    const token = jwt.sign({
      id :user._id,
    },process.env.JWT_SECRET)
    
    res.cookie("jwt_token",token)
    res.status(200).json({
      message:"user logged in",
      user,
    })
})



module.exports = authRouter