const express = require("express")

const notes = [
    
]
const app = express() // server create ho gya

app.use(express.json()) //middlewarey


app.get("/",(req,res)=>{
    res.send("heloo world")
})

//api
app.post("/notes", (req,res)=>{
    notes.push(req.body)
     res.send("notes created")
    console.log(notes)
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

//delete
app.delete("/notes/:index",(req,res)=>{
   delete notes[ req.params.index]
   res.send("note deleted successfully")
})

// Patch use krke descripion uodae krna 
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("Note updated successfully")
})


module.exports = app