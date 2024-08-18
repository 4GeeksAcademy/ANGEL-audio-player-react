import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume1, Repeat, Shuffle } from "lucide-react";


export function Player({songName, songUrl, onPrev, onNext}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isRepeating, setIsRepeating] = useState(false)
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

    useEffect(() => {
        if(audioRef.current){
            const updateProgressBar = () => {
                setCurrentTime(audioRef.current.currentTime)
                setDuration(audioRef.current.duration)
            }

            const handleEnded = () => {
                if(!isRepeating){
                    onNext()
                }
            }
            audioRef.current.addEventListener('timeupdate', updateProgressBar)
            audioRef.current.addEventListener('durationchange', updateProgressBar)
            audioRef.current.addEventListener('ended', handleEnded)

            return () => {
                audioRef.current.removeEventListener('timeupdate', updateProgressBar)
                audioRef.current.removeEventListener('durationchange', updateProgressBar)
                audioRef.current.removeEventListener('ended', handleEnded)
            }
        }
    },[audioRef.current, onNext, isRepeating])

    useEffect(() => {
        if(audioRef.current){
            audioRef.current.loop = isRepeating
        }
    }, [isRepeating])

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

    const handleProgresChange = (event) => {
        const newTime = event.target.value
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const handleRepeat = () => {
        setIsRepeating(!isRepeating)
    }
    const handleNext = () => {
        onNext()
    }

    return(
        <div className="player">
            <div className="song-container">
                {songName}
            </div>
            <div className="btn-container">
                <div className="btn-reproductor">
                    <button className="btn-random"><Shuffle/></button>
                    <button className="btn-prev" onClick={onPrev}><SkipBack/></button>
                    <button className="btn-player" onClick={handleClick}>
                        {isPlaying ? <Pause/> : <Play/>}
                    </button>
                    <button className="btn-next" onClick={onNext}><SkipForward/></button>
                    <button 
                    className={`btn-repeat ${isRepeating ? 'active-repeat' : ''}`}
                    onClick={handleRepeat}
                    >
                        <Repeat/>
                    </button>
                </div>
                <div>
                    <input
                    className="progress-bar-song"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleProgresChange}
                    type="range"
                    />
                </div>
            </div>
            <div className="volume-conteiner">
                <Volume1/>
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