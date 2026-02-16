const express = require("express")
const cookieParser =require("cookie-parser")
const app = express()
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")

app.use(express.json());
app.use(cookieParser()) //middleware
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
module.exports = app;