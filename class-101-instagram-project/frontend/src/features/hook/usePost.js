import { useContext } from "react";
import { PostContext } from "../post/post.context";
import { getFeed,createPost } from "../post/services/post.api";

export const usePost = () => {
   const context = useContext(PostContext);

   const {loading,post,feed,setFeed,setPost,setLoading} = context;

   const handleGetFeed = async()=>{
    setLoading(true);

    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
   }

   const handleCreatePost = async(imageFile,caption)=>{
      setLoading(true)
      const data = await createPost({imageFile,caption})
      setLoading(false)
      setFeed([data.post, ...feed])
   }

   return{loading, feed, post, handleGetFeed,handleCreatePost}

   
}
