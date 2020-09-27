import React, { Component } from 'react';
import './Track.css';

function renderAction(isRemoval) {
  if (isRemoval) {
    return '-';
  }
  return '+';

}

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: true
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.pausePreview = this.pausePreview.bind(this);
    this.isPlayingPreview = this.isPlayingPreview.bind(this);
  }

  renderAction(isRemoval) {
    if (isRemoval) {
      return '-';
    }
    return '+';
  }

  addTrack() {
    this.props.onAdd(this.props.trackInfo);
  }

  removeTrack() {
    this.props.onRemove(this.props.trackInfo);
  }

  isPlayingPreview() {
    return (this.props.currentPreview === this.props.trackInfo.id) && this.state.isPlaying
  }

  playPreview() {
    this.setState({
      isPlaying: true
    });

    this.props.onPreviewToggle('play', this.props.trackInfo.id);
  }

  pausePreview() {
    this.setState({
      isPlaying: false
    });
    this.props.onPreviewToggle('pause');
  }

  render() {
    return (
      <div className="Track" >
        {!this.isPlayingPreview() && <a className="Track-play" onClick={this.playPreview}></a>}
        {this.isPlayingPreview() && <a className="Track-pause" onClick={this.pausePreview}></a>}
        <div className="Track-information">
          <h3>{this.props.trackInfo.name}</h3>
          <p>{this.props.trackInfo.artist} | {this.props.trackInfo.album}</p>
        </div>
        <a className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{renderAction(this.props.isRemoval)}</a>
      </div>
    );
  }
}

export default Track;