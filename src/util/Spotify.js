const clientId = "6f599e1354084ea0ad97ba63ee0fd780";
const redirectUri = "https://laurentdelay.github.io/jammming/";
let userAccessToken = "";

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }

    const currentUrl = window.location.href;
    const accessToken = currentUrl.match(/access_token=([^&]*)/);
    const expirationTime = currentUrl.match(/expires_in=([^&]*)/);

    if (accessToken && expirationTime) {
      window.setTimeout(() => (accessToken[1] = ""), expirationTime[1] * 1000);
      window.history.pushState("Acces token", null, "/");
      return accessToken[1];
    }

    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

    window.location = accessUrl;
  },

  async search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?q=${term}&type=track,artist,album`;
    try {
      const response = await fetch(searchUrl, {
        headers: { Authorization: "Bearer " + userAccessToken },
      });

      if (response.ok) {
        const responseJson = await response.json();

        if (responseJson.tracks.items) {
          return responseJson.tracks.items.map((track) => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              URI: track.uri,
            };
          });
        }
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  async savePlaylist(playlistName, trackList) {
    if (!playlistName || !trackList) {
      return;
    }

    let userId;
    const headers = {
      Authorization: "Bearer " + userAccessToken,
      "Content-Type": "application/json",
    };

    try {
      let response = await fetch("https://api.spotify.com/v1/me", {
        headers: headers,
      });

      if (response.ok) {
        let responseJson = await response.json();

        userId = responseJson.id;
        let data = JSON.stringify({
          name: playlistName,
        });

        response = await fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            method: "POST",
            headers: headers,
            body: data,
          }
        );

        if (response.ok) {
          responseJson = await response.json();

          const playlistId = responseJson.id;

          data = JSON.stringify({
            uris: trackList,
          });

          response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
              method: "POST",
              headers: headers,
              body: data,
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getPreviewUrl(trackId) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: { Authorization: "Bearer " + userAccessToken },
        }
      );

      if (response.ok) {
        const responseJson = await response.json();

        return responseJson.preview_url;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

userAccessToken = Spotify.getAccessToken();

export default Spotify;
