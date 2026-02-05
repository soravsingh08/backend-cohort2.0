import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
 
  console.log("Hello integration")


function fetchNotes(){
  axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
      });
}

  useEffect(() => {
    fetchNotes()
  }, []);


  function handleSubmit(e){
    e.preventDefault()
  const {title,description} = e.target.elements
  console.log(title.value,description.value)

  axios.post("http://localhost:3000/api/notes",{
    title:title.value,
    description : description.value
  })
  .then(res=>{

    console.log(res.data)
    fetchNotes()
  })
  }

  function handleDeleteNote(noteId){
    axios.delete("http://localhost:3000/api/notes/" +noteId)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
 
  }

  function handleUpdateNote(noteId){
    const newTitle = prompt("Enter new title")
        const newDescription = prompt("Enter new Description")
    axios.patch("http://localhost:3000/api/notes/" +noteId,{
      title:newTitle,
      description:newDescription
    })
    .then(res=>{
      console.log(res.data)
      fetchNotes();
      
    })
  }



  return (
    <>
    <form className="note-create-form" onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Enter Title" />
      <input name="description" type="text" placeholder="Enter Description" />
      <button>Create Note</button>
     
    </form>
    <div className="notes">
      {notes.map((note) => (
        <div className="note" key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button onClick={()=>{handleDeleteNote(note._id)}} className="delete-btn">Delete</button>
           <button onClick={()=>{handleUpdateNote(note._id)}} className="edit-btn">Edit</button>
        </div>
      ))}
    </div>
        </>
  );
}

export default App;
