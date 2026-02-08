// //server ko create karna

// const express = require("express")
// const authRouter = require("./routes/auth.routes")
// const app = express()
// app.use(express.json())
// app.use("/api/auth",authRouter)

// module.exports = app

const express = require("express")
const authRouter = require("./routes/auth.routes")

const app = express()
app.use(express.json())
app.use("/api/auth",authRouter)
module.exports = app
