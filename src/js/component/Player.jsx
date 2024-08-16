import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";


export function Player({songUrl}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef()

    useEffect(() => {
        if(songUrl){
            audioRef.current.src = `https://playground.4geeks.com${songUrl}`
            audioRef.current.play()
            setIsPlaying(true)
        }
    },[songUrl])

    const handleClick = () => {
        if(isPlaying) {
            audioRef.current.pause()
        }else{
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    return(
        <div className="player">
            <div>
                CurrentSong...
            </div>
            <div className="btn-content">
                <div className="btn-reproductor">
                    <button className="btn-player" onClick={handleClick}>
                        {isPlaying ? <Pause/> : <Play/>}
                    </button>
                </div>
            </div>
            <div>
                Volumen
            </div>

            <audio ref={audioRef}/>
        </div>
    )
}