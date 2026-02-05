//server creation

const express = require("express")
const noteModel = require("./models/note.model")
const app = express()
const cors = require("cors")
const path = require("path") //jis folder main ho vaha tak ka path 

app.use(express.json())
app.use(cors())
app.use(express.static("./public")) //public karta haiscript aur html k link ko.kyunki wild ard to reject kr deta na


//post/api/notes
//create new note and sace data in mongodb
//req.body ={title ,descripion}

app.post('/api/notes',async(req,res)=>{
const{title,description}= req.body

const note = await noteModel.create({
    title,description
})
res.status(201).json({
    message :"note created successfully",
    note: note
})
})

/**
 * - GET /api/notes
 * - Fetch all the notes from the mongodb and send them in the response
 */

app.get("/api/notes", async(req,res)=>{
    const notes = await noteModel.find() //find always return arry of obj
    res.status(200).json({
        message : "Notes fetched successfully",
        notes
    })
})


/**
 * - DELETE /api/notes/:id
 * - Delete note with the id from req.params  
  */

app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted successfully"
    })
})



/**
 * -PATCH /api/notes/:id
 * update the description of the note by id
 * -req.body = {description}
 */
   
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {title,description} =req.body
 

    await noteModel.findByIdAndUpdate(id,{
        title:title,
        description: description
    })

    res.status(200).json({
        message:"Note updated successfuly"
    })
    console.log(req.body);

})

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
    
})
module.exports = app