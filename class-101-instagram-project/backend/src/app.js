const express = require("express")
const cookieParser =require("cookie-parser")
const app = express()
const cors = require("cors")

//middleware - ye request ko process karne se pehle run hota hai
app.use(express.json());
app.use(cookieParser()) 
app.use(cors( {
    origin:"http://localhost:5173",
    credentials:true
}   ))

/* Require Routes - ye routes ko import karega*/ 
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")

/* Use Routes - ye routes server pe chalana start karega*/ 
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)


module.exports = app;