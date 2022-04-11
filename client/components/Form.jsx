import React, { Component } from 'react';
import axios from 'axios';
const SpotifyWebApi = require('spotify-web-api-js');

class Form extends Component {
    constructor(props) {
      super(props);
      
    }

    async handleQuerySubmit() {
      const token = await axios();
      const spotifyApi = new SpotifyWebApi({
        clientId: '65f25198a7e44731924a5639662a68b6', // Alex's app client ID
        clientSecret: 'ca0c2f2976ae40388596603a0b1d92eb', // Alex's app client secret
      });
      console.log('Submit was pressed.')
      spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
        function(data) {
          console.log('Artist albums', data.body);
        },
        function(err) {
          console.error(err);
        }
      );
    }

    render() {
     return(
        <form id="search-form" onSubmit={this.handleQuerySubmit()}>
          <p>
            Type an artist, album, or song to start your search.
          </p>
          <label>
            <input id="query" type="text" />
          </label>
          <input type="submit" value="Search" />
        </form>
      )
    }
  }
  
  export default Form;