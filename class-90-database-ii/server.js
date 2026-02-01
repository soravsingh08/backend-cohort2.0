//server start and connect to database

const app = require("./src/app.js")
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://soravsingh:UKpubT7bv6QH6AqG@cluster0.8hu5jbi.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to database")
    })
}

connectToDb()



app.listen(3000,()=>{
    console.log("server is running on port 3000")
})  