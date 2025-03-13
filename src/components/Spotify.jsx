import React, {useState, useEffect} from "react";
import {searchArtist, getArtistSongs, getAccessToken} from "./api";
import SpotifyPlayer from "./SpotifyPlayer";

function Spotify(){
    const [artist, setArtist] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [selectedArtist, setSelectedArtist] = useState(null);

    const inputChange = (a) =>{
        setArtist(a.target.value);
    };

    
    useEffect(() => {
        const fetchAccessToken = async () => {
            const token = await getAccessToken();
            setAccessToken(token);
        };
    fetchAccessToken();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if(artist.length > 0){
                setLoading(true);
                const results = await searchArtist(artist);
                setResults(results);
                setLoading(false);
            } else{
                setResults([]);
            }
        };
        fetchData();
        }, [artist]);

        const playRandomSong = async (songs, accessToken) => {
            if(songs.length === 0){
                alert("No songs available");
            return;
        }

        const randomSong = songs[Math.floor(Math.random()*songs.length)];
        const songUri = randomSong.uri;

        if(songUri){
            try{
            await fetch("https://api.spotify.com/v1/me/player/play", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uris: [songUri] }),
            });
        }catch(error){
            console.error("Error playing song", error);
        }
    }else{
        alert("No preview available");
    }
        };

        const handleArtistClick = async (artist) => {
            setSelectedArtist(artist);
            setLoading(true);
            const songs = await getArtistSongs(artist.id);
            setSongs(songs);
            setLoading(false);

        if(songs.length > 0){
            let token = accessToken;
            if(!token){
                token = await getAccessToken();
                setAccessToken(token);
            }
            playRandomSong(songs, token);
        }else{
            alert("No songs available");
        }
    };

    return(
        //<div style={{width: "50%", textAlign: "right"}}>
        <div>
            <input
                type = "text"
                value = {artist}
                onChange = {inputChange}
                placeholder = "Enter name"
                style={{
                    fontSize: "17px",
                    padding: "17px",
                    width: "400px",
                    borderRadius: "15px",
                    border: "4px solid purple",
                    fontFamily: "Poppins, sans serif",
                    // background: "rgb(32, 32, 40)"
                    
                }}
            />
            {loading && <p>Loading...</p>}
            {artist && !loading && results.length > 0 && (
                <div>
                    <h3>Results:</h3>
                        <div style = {{display: "flex", flexDirection: "column", gap: "2px"}}>
                        {results.map((artist, index) => (
                                <div key={index} style={{
                                    border: "2px solid purple",
                                    padding: "5px",
                                    background:"rgb(32, 32, 40)",
                                    borderRadius: "15px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    width: "550px",
                                    //alignItems: "center",
                                    //display: "flex",
                                }}
                                onClick={() => handleArtistClick(artist)}
                                >
                                <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
                                <p style={{
                                    fontSize:"30px", 
                                    fontFamily: "Poppins, sans serif",
                                    //margin: 0,           //Makes artist text centered
                                    //textAlign: "center",
                                    //width: "100%"
                                    }}>{artist.name}</p>
                                </div>
                        ))}
                </div>
        </div>
        )}
        {artist && !loading && results.length === 0 &&(
            <p>No artists found</p>
        )}
        </div>
    );
}

export default Spotify;