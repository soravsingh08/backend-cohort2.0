const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true, "Follower is required"]
    },

    folowee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Folowee is required"]
    }
}, 
   {
        timestamps:true
    }

)