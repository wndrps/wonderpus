import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import SpotifyWebApi from 'spotify-web-api-js';

class Form extends Component {
    constructor(props) {
      super(props);
      this.spotifyApi = new SpotifyWebApi();
      // TODO:
      // change from hardcode to process.env variables sent from backend
      this.clientId = '65f25198a7e44731924a5639662a68b6';
      this.clientSecret = 'ca0c2f2976ae40388596603a0b1d92eb';
  
      this.artist = 'Polyphia';
      this.track = '40oz';
    }

    getAccessToken = async () => {
      try {
        const tokenUrl = 'https://accounts.spotify.com/api/token';
        const data = qs.stringify(
          {
            grant_type: 'client_credentials',
            client_id: this.clientId,
            client_secret: this.clientSecret,
          },
        );
        const response = await axios.post(tokenUrl, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        return response.data.access_token;
      } catch (error) {
        console.log(error);
        return error;
      }
    };

    queryTracks = async (queryString) => {
      const accessToken = await this.getAccessToken();
      this.spotifyApi.setAccessToken(accessToken);
      const allResults = await this.spotifyApi.searchTracks(queryString)
        .then((data) => {
          console.log(data);
          return data.tracks.items
        });
      console.log(allResults);
      console.log('--------ALL RESULTS--------\n', allResults);
      const topResult = allResults[0];
      console.log('--------TOP RESULT--------\n', topResult);
      const { album, artists, name } = topResult;
      console.log('--------SONG NAME--------\n', name);
      console.log('--------ALBUM--------\n', album);
      console.log('--------ARTIST(S)--------\n', artists);
    };

    async handleQuerySubmit(event) {
      event.preventDefault();
      await this.queryTracks(`track:${this.track} artist:${this.artist}`)
    }

    render() {
     return(
        <form id="search-form" onSubmit={(event) => this.handleQuerySubmit(event)}>
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