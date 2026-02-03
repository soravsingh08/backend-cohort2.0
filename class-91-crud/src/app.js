const express = require("express");
const app = express();
const noteModel = require("./models/notes.models.js");

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description,age } = req.body;
  const note = await noteModel.create({
    title,
    description,
    age,
  });
  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

 //find :  jitne v note rheneg unko read krke return kr lega 
  app.get("/notes", async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
      message : "Note fetched successfully",
      notes
    })
  })


module.exports = app;
