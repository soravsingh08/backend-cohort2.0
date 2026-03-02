const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function authUser(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }
  //old method without redis
    // const isTokenBlacklisted = await blacklistModel.findOne({
    //     token
    // })

     const isTokenBlacklisted = await redis.get(token)

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "  Invalid Token"
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports ={ authUser};