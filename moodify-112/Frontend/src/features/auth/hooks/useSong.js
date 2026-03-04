import { getSong } from "../../home/service/song.api";
import {useContext} from "react";
import {SongContext} from "../../home/song.context";

export const useSong=()=>{
    
    const context = useContext(SongContext)
    

    const {loading, setLoading, song, setSong} = context

    async function handleGetSong({mood}){
        setLoading(true)
        try {
            const data  = await getSong({mood})
            console.log("Backend Response Data:", data)
            setSong(data.song)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        
    }

    return {
        loading,
        song,
        handleGetSong
    }
}