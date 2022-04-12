/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class Song extends Component {
    constructor(props) {
      super(props);
      // console.log(props);
      // does not actually add songId as a property of the Song component
      const { trackId } = props;
      // use this.<varName> to set the property of the song component
      this.trackId = trackId;
    }
    
    spotifyEmbedUrl = (trackId) => {
      return `https://open.spotify.com/embed/track/${trackId}?`
    }

    render() {
      // console.log(this.songId);
      return(
        <div className="app">
          <iframe style={{ 'borderRadius': '12px' }} src={this.spotifyEmbedUrl(this.trackId)} width="100%" 
          height="80" frameBorder="0" allowFullScreen="" allow="autoplay; 
          clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
      )
    }
  }
  
  export default Song;