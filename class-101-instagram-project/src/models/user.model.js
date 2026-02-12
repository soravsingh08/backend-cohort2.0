const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"User name already exist "],
        required:[true,"user name is required"],
    },
    email:{
        type:String,
        unique:[true,"Email already exist"],
        required:[true,"Emaul is required"]
    },

    password:{
        type:String,
        required:[true,"Password is required"]
    },

    bio: String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/ovkwncvvt/default%20user%20img%20-%20Brave%20Search.html"
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel