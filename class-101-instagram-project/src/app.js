const express = require("express")
const cookieParser =require("cookie-parser")
const app = express()
const authRouter = require("./routes/auth.routes")

app.use(express.json());
app.use(cookieParser()) //middleware
app.use("/api/auth",authRouter)
module.exports =app;