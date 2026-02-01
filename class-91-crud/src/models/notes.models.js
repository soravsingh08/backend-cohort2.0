//this models folder is created for schema creation to tell how and which format data is going to be stored

const mongoose =  require("mongoose")

const noteSchema = new mongoose.Schema({
    title : String,
    description : String,
})

const noteModel = mongoose.model("notes",noteSchema)

module.exports = noteModel