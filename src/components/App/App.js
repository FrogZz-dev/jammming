import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [{
        name: 'Stronger',
        artist: 'Britney Spears',
        album: 'Oops!... I Did It Again',
        id: 4
      },
      {
        name: 'So Emotional',
        artist: 'Whitney Houston',
        album: 'Whitney',
        id: 5
      },
      {
        name: "It's Not Right But It's Okay",
        artist: 'Whitney Houston',
        album: 'My Love Is Your Love',
        id: 6
      }]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    this.state.playlistTracks.push(track);
    this.setState({ playlistTracks: this.state.playlistTracks })
  }

  removeTrack(track) {
    const trackIndex = this.state.playlistTracks.findIndex(savedTrack => savedTrack.id === track.id);

    this.state.playlistTracks.splice(trackIndex, 1);
    this.setState({ playlistTracks: this.state.playlistTracks })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() { 
    Spotify.savePlaylist('testName', ['1']);
  }

  async search(term) {
    if (term) {
      this.setState({
        searchResults: await Spotify.search(term)
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App" >
          <SearchBar onSearch={this.search} />
          <div className="App-playlist" >
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist name={this.state.playlistName} onNameUpdate={this.updatePlaylistName} playlist={this.state.playlistTracks} onRemove={this.removeTrack} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;