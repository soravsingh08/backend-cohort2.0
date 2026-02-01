const express = require("express")
const app = express() //server instance cerate karna 
app.get('/', (req,res)=>{
    res.send("helooooo")
})

app.get("/about", (req,res)=>{
    res.send("this is about page")
})
app.listen(3000)

