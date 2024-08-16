import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import { List } from "./List";



//create your first component
const Home = () => {
	const [listSong, setListSong] = useState([])
	const [currentSongUrl, setCurrentSongUrl] = useState(null)
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

	const handleSongClick = (url, id) => {
		setCurrentSongUrl(url)
		setSelectedSong(id)
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
							onClick={() => handleSongClick(item.url, index)}
							active={selectedSong === index}
							/>
						)
					})}
				</ul>
			</main>
			<footer className="footer">
				<Player songUrl={currentSongUrl}/>
			</footer>
		</>
	);
};

export default Home;
