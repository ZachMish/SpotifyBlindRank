import React, { useEffect, useState } from "react";

//Spotify player magic

function SpotifyPlayer({ accessToken }) {
const [player, setPlayer] = useState(null);
const [loading, setLoading] = useState(true);
const [currentTrack, setCurrentTrack] = useState(null);

useEffect(() => {
    if (!accessToken) return;

    // Initialize the Spotify Web Playback SDK
    const initPlayer = () => {
    const playerInstance = new window.Spotify.Player({
        name: "My Spotify Player",
        getOAuthToken: (cb) => {
          cb(accessToken); // Pass the access token for authorization
        },
        volume: 0.5, // Set the initial volume
    });

    playerInstance.addListener("ready", ({ device_id }) => {
        console.log("The Web Playback SDK is ready with device ID", device_id);
        setLoading(false); // Player is ready
    });

    playerInstance.addListener("player_state_changed", (state) => {
        if (state) {
        setCurrentTrack(state.track_window.current_track);
        }
    });

    playerInstance.addListener("not_ready", ({ device_id }) => {
        console.log("The Web Playback SDK is not ready with device ID", device_id);
    });

      // Connect to the player
    playerInstance.connect().then((success) => {
        if (success) {
        console.log("Player connected!");
        }
    });

    setPlayer(playerInstance);
    };

    initPlayer();

    return () => {
    if (player) {
        player.disconnect();
    }
    };
}, [accessToken]);

  // Control Functions (Play, Pause, Next, Previous, Volume)
const playTrack = (uri) => {
    player.play({
      uris: [uri], // Play the track URI
    });
};

const pauseTrack = () => {
    player.pause();
};

const skipNext = () => {
    player.skipToNext();
};

const skipPrevious = () => {
    player.skipToPrevious();
};

const setVolume = (volume) => {
    player.setVolume(volume);
};

return (
    <div>
    <h2>Spotify Player</h2>
    {loading ? (
        <p>Loading player...</p>
    ) : (
        <div>
        <div>
            <h3>Now Playing: {currentTrack ? currentTrack.name : "None"}</h3>
            {currentTrack && <img src={currentTrack.album.images[0].url} alt={currentTrack.name} width="100" />}
        </div>
        <div>
            <button onClick={pauseTrack}>Pause</button>
            <button onClick={skipPrevious}>Previous</button>
            <button onClick={skipNext}>Next</button>
            <button onClick={() => setVolume(0.2)}>Volume Low</button>
            <button onClick={() => setVolume(1)}>Volume High</button>
        </div>
        </div>
    )}
    </div>
);
}

export default SpotifyPlayer;