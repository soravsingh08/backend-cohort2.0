import React from 'react'
import FaceExpression from '../../../components/FaceExpression'
import Player from './components/Player'
import { useSong } from "../../auth/hooks/useSong";

const Home = () => {
    const { handleGetSong } = useSong();

    const onDetectClick = (mood) => {
        if (mood) {
            console.log("Fetching song for detected mood:", mood);
            // Ye seedha song.api.js se backend pe request bhejega
            handleGetSong({ mood: mood }); 
        }
    };

    return (
        <>
            {/* Jab FaceExpression mein handleClick chalega, ye onDetectClick trigger hoga */}
            <FaceExpression onClick={onDetectClick} />
            <Player />
        </>
    );
};
export default Home