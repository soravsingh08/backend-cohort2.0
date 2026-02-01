const mongoose =require("mongoose")

function connectDB(){
    mongoose.connect("mongodb+srv://soravsingh:UKpubT7bv6QH6AqG@cluster0.8hu5jbi.mongodb.net/day-91")
    .then(()=>{
        console.log("connected to dB")
    })
}

module.exports = connectDB