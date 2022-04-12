/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class SearchedSongDisplay extends Component {
  constructor(props) {
    super(props);
    const { songId } = props;
    this.songId = songId;
  }
  

  render() {
    return(
      <div id='searchedSongDisplay'>
        {/* <h2>Searched Song Display</h2> */}
        {/* <iframe style={{ 'border-radius': '12px' }} src={this.spotifyEmbedUrl(this.songId)} width="100%" 
          height="80" frameBorder="0" allowFullScreen="" allow="autoplay; 
          clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe> */}
      </div>
    );
  }
}

export default SearchedSongDisplay;