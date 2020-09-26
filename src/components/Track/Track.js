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

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
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

  render() {
    return (
      <div className="Track" >
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