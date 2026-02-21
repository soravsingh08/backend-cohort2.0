const mongoose = require("mongoose")

const userSchema =  new mongoose.Schema({
    name:String,
    email :{
        type:String,
        unique: [true,"Email already exist"]
    },
    password:String,
})
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const userModel = mongoose.model("user",userSchema); //user: collection ka naam jis se data store hoga, user schema structure
module.exports = userModel