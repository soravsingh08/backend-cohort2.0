import { createContext,useState } from "react";

export const PostContext = createContext();

export const PostContextProvider =({children})=>{
    const [loading,setLoading] = useState(false);
    const [post,setPost] = useState([]);
    const [feed,setFeed] = useState([]);

  
    return (
        <PostContext.Provider value={{loading,post,feed,setFeed,setPost,setLoading}}>
            {children}
        </PostContext.Provider>
    )
}