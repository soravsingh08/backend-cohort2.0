const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

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

    //to save this data we need model 
  //upar vale data se ek user ceate kreneg 
    const user = await userModel.create({
      email, password, name 
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


module.exports = authRouter