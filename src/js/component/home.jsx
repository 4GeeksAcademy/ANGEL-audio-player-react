import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import { List } from "./List";



//create your first component
const Home = () => {
	const [listSong, setListSong] = useState([])
	const [currentSongUrl, setCurrentSongUrl] = useState(null)
	const [currentSongName, setCurrentSongName] = useState(null)
	const [selectedSong, setSelectedSong] = useState(null)

	const fetchSongs = async () => {
		const res = await fetch(`https://playground.4geeks.com/sound/all`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json'
			}
		})
		if(res.ok){
			const data = await res.json()
			if(data.songs){
				setListSong(data.songs)
			}
		}
	}

	useEffect(() => {
		fetchSongs()
	}, [])

	const handleSongClick = (url, id, name) => {
		setCurrentSongUrl(url)
		setSelectedSong(id)
		setCurrentSongName(name)
	}

	const handlePrev = () => {
		if(selectedSong > 0){
			const newSong = selectedSong - 1
			setSelectedSong(newSong)
			setCurrentSongUrl(listSong[newSong].url)
			setCurrentSongName(listSong[newSong].name)
		}else{
			const newSong = listSong.length - 1
			setSelectedSong(newSong)
			setCurrentSongUrl(listSong[newSong].url)
			setCurrentSongName(listSong[newSong].name)
		}
	}

	const handleNext = () => {
		if(selectedSong < listSong.length-1){
			const newSong = selectedSong + 1
			setSelectedSong(newSong)
			setCurrentSongUrl(listSong[newSong].url)
			setCurrentSongName(listSong[newSong].name)
		}else {
			const newSong = 1;
			setSelectedSong(newSong)
			setCurrentSongUrl(listSong[newSong].url)
			setCurrentSongName(listSong[newSong].name)
		}
	}

	return (
		<>
			<main className="main">
				<ul>
					{listSong.map((item, index) => {
						return(
							<List 
							key={index} 
							text={item.name} 
							num={item.id}
							onClick={() => handleSongClick(item.url, index, item.name)}
							active={selectedSong === index}
							/>
						)
					})}
				</ul>
			</main>
			<footer className="footer">
				<Player 
				songName={currentSongName}
				songUrl={currentSongUrl}
				onPrev={handlePrev}
				onNext={handleNext}
				/>
			</footer>
		</>
	);
};

export default Home;
