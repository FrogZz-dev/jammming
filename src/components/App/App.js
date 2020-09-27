import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      playingPreviewId: '',
      audioPlayer: new Audio('')
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.previewTrack = this.previewTrack.bind(this);
    this.syncLists = this.syncLists.bind(this);
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

  syncLists() {
    return  this.state.searchResults.filter( track => !this.state.playlistTracks.includes(track))
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackList = this.state.playlistTracks.map(track => track.URI);
    Spotify.savePlaylist(this.state.playlistName, trackList);

    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  async search(term) {
    if (term) {
      this.setState({
        searchResults: await Spotify.search(term)
      });
    }
  }

  async previewTrack(action, trackId) {
    if (action === 'play') {
      if (trackId !== this.state.playingPreviewId) {
        const previewUrl = await Spotify.getPreviewUrl(trackId);
        if (previewUrl) {
          this.setState({
            playingPreviewId: trackId
          });
          this.state.audioPlayer.src = previewUrl;
        } else {
          this.setState({
            playingPreviewId: ''
          });
          this.state.audioPlayer.src = '';
        }
      }
      if ( this.state.audioPlayer.src !== window.location.href ) {
        this.state.audioPlayer.play();
      } else {
        alert('No preview available');
      }

    } else {
      this.state.audioPlayer.pause();
    }
  }

  componentDidMount() {
    this.state.audioPlayer.volume = 0.3;
    this.state.audioPlayer.onended = () => this.setState({ playingPreviewId: '' })

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App" >
          <SearchBar onSearch={this.search} />
          <div className="App-playlist" >
            <SearchResults
              searchResults={this.syncLists()}
              onAdd={this.addTrack}
              currentPreview={this.state.playingPreviewId}
              onPreviewToggle={this.previewTrack} />
            <Playlist
              name={this.state.playlistName}
              onNameUpdate={this.updatePlaylistName}
              playlist={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
              currentPreview={this.state.playingPreviewId}
              onPreviewToggle={this.previewTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;