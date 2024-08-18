import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";


export function Player({songUrl, onPrev, onNext}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const audioRef = useRef()

    useEffect(() => {
        if(songUrl){
            audioRef.current.src = `https://playground.4geeks.com${songUrl}`
            audioRef.current.play()
            setIsPlaying(true)
        }
    },[songUrl])

    useEffect(() => {
        if(audioRef.current){
            audioRef.current.volume = volume
        }
    }, [volume])

    const handleClick = () => {
        if(isPlaying) {
            audioRef.current.pause()
        }else{
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleVolumeChange = (event) => {
        setVolume(event.target.value)
    }

    return(
        <div className="player">
            <div>
                CurrentSong...
            </div>
            <div className="btn-content">
                <div className="btn-reproductor">
                    <button className="btn-prev" onClick={onPrev}><SkipBack/></button>
                    <button className="btn-player" onClick={handleClick}>
                        {isPlaying ? <Pause/> : <Play/>}
                    </button>
                    <button className="btn-next" onClick={onNext}><SkipForward/></button>
                </div>
                <div>
                    <input
                    type="range"
                    />
                </div>
            </div>
            <div>
                <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                />                    
            </div>

            <audio ref={audioRef}/>
        </div>
    )
}