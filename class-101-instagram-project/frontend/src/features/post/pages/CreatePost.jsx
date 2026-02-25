import React from 'react'
import Nav from '../../shared/components/Nav'
import "../../post/style/createpost.scss"
import { useState,useRef } from 'react'
import { usePost } from "../../hook/usePost";
import { useNavigate } from 'react-router';


const CreatePost = () => {

  const [caption,setCaption] = useState("")
  const postImageRef = useRef()

  const navigate = useNavigate()

  const {handleCreatePost,loading} = usePost()

async function handleSubmit(e){
    e.preventDefault()
   
    const file = postImageRef.current.files[0]

    await handleCreatePost(file,caption)

    navigate("/")

  }

  if(loading){
    return(
  <main>
  <h1>Loading...</h1>
    </main>
    )
  
   
  }



  return (
    <div className='create-post-page'>
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit} >
            <label className='post-image-label' htmlFor="postImage">Select Image</label>
            <input ref={postImageRef} type="file" name="postImage" id="postImage" />
          <label htmlFor="caption" type="text">Caption</label>
            <input value={caption} onChange={(e)=>setCaption(e.target.value)} type="text" name="caption" id="caption" />
            <button className='button primary-button' type="submit">Post</button>
        </form>
      </div>
      
    </div>
  )
}

export default CreatePost