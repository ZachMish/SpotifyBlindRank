export async function getAccessToken(){
    const client_id = "c4b4f78b86ac445981a3069b5e4db17c";
    const client_secret = "f0913cec41a849f48949124e323a0686";

    const auth = "Basic " + btoa(client_id + ":" + client_secret);

    const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": auth
    },
    body: new URLSearchParams({
        grant_type: "client_credentials"
    })
    });
    const data = await response.json();
    return data.access_token;
}
export async function searchArtist(artistName){
    const token = await getAccessToken();
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=5`,
        {
            headers: {
              Authorization: `Bearer ${token}`, // Set the authorization header with the access token
            },
        }
    );
        const data = await response.json();
        return data.artists.items;
}
export async function getArtistSongs(artistId) {
    const token = await getAccessToken();
    const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }
    );
    const data = await response.json();
    return data.tracks;
}