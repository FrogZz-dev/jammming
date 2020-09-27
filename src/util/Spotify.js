const clientId = '6f599e1354084ea0ad97ba63ee0fd780';
const redirectUri = 'http://localhost:3000/';
let userAccessToken = '';

const Spotify = {
    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }

        const currentUrl = window.location.href;
        const accessToken = currentUrl.match(/access_token=([^&]*)/);
        const expirationTime = currentUrl.match(/expires_in=([^&]*)/);

        if (accessToken && expirationTime) {
            window.setTimeout(() => accessToken[1] = '', expirationTime[1] * 1000);
            window.history.pushState('Acces token', null, '/');
            return accessToken[1];
        }

        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

        window.location = accessUrl;

    },

    async search(term) {
        const searchUrl = `https://api.spotify.com/v1/search?q=${term}&type=track`;
        try {
            const response = await fetch(searchUrl, {
                headers: { 'Authorization': 'Bearer ' + userAccessToken }
            })

            if (response.ok) {
                const responseJson = await response.json();


                if (responseJson.tracks.items) {
                    return responseJson.tracks.items.map(track => {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            URI: track.uri
                        }

                    })
                }
                return [];
            }

        } catch (error) { console.log(error) };
    },

    async savePlaylist(playlistName, trackList) {
        if (!playlistName || !trackList) {
            return;
        }

        let userId;
        const headers = {
            'Authorization': 'Bearer ' + userAccessToken
        }

        try {
            let response = await fetch('https://api.spotify.com/v1/me', { headers: headers });

            if (response.ok) {
                let responseJson = await response.json();

                userId = responseJson.id;
                const data = JSON.stringify({
                    name: playlistName
                });

                response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + userAccessToken,
                        'Content-Type': 'application/json'
                    },
                    body: data
                });

                if (response.ok) {
                    responseJson = await response.json();

                    const playlistId = responseJson.id;
                    console.log(playlistId);

                }
            }
        } catch (error) { console.log(error) }
    }
};

userAccessToken = Spotify.getAccessToken();

export default Spotify;