// app.js ka kaam hota hai server ko create karna
//aur server ko config karna yaad rkhna ye bhadwe
//isko export b krna pdega na

const express = require("express");
const app = express();

// middleware : jab tak ye middle ware nahi use krega tab tak 
// express ka server req,body ka data nahi padh sakta undefiend aayega
app.use(express.json());

const notes = [];

//post api : create data
app.post("/notes", (req, res) => {
  notes.push(req.body)
  
  res.status(201).json({
    message : "Note created sucessfully"
  })
 
});

//get api : to show data on client side 
app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes:notes
    })
})


//delete : "notes/:index"
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]

    res.status(204).json({
        message : "note deleted successfully"
    })
})

//patch : to update small parts like only descripton 
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description =req.body.description

    res.status(200).json({
        message : "note update successfully "
    })
})

module.exports = app;
