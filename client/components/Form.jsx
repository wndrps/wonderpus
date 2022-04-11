import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import SpotifyWebApi from 'spotify-web-api-js';
import SearchedSongDisplay from './SearchedSongDisplay';


// makes a request to /api/addSong
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
      this.state = {
        savedSongs: ['3v3VFa7Dt32gNR27jfw7DG'],
      }
    }

    /**
     * Uses the official Spotify API to get an access token.
     * Need to register a Spotify app.
     * Need the Spotify app client ID and secret.
     */
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

    /**
     * @param {String} queryString 
     * @returns {Object}
     * Uses the the spotify-web-api-node NPM library.
     * spotifyWebApi makes a request to the Spotify API...
     * to search for songs based on the query string.
     */
    queryTracks = async (queryString) => {
      // const accessToken = await this.getAccessToken();
      const accessToken = 'BQAI3jhzC1LQgoUhCn6bXVXuapV0N2i-pc83Kj-2lU5kW8yHEOiXGdpGNvVSorHChPAfShiN6SoW7i_cgVQ';
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
      return topResult.id;
    };

    /**
     * @param {SyntheticEvent} event 
     * Executes this.queryTracks upon form submission.
     */
    async handleQuerySubmit(event) {
      /**
       * https://reactjs.org/docs/handling-events.html
       * .preventDefault() is a method on the SyntheticEvent React object
       * .preventDefault() prevents the form from being submitted
       * in this case, prevents it prevents the page from being refreshed on fom submission
       * allows developer to see what is in the browser console
       * comment out event.preventDefault() in production
       */
      event.preventDefault();
      // console.log(event);
      // console.log(event.target[0].value);
      // console.log(event.target[1].value);
      const artist = event.target[0].value;
      const track = event.target[1].value;
      if (artist === '' || track === '') {
        const message = 'You must input an artist and track';
        alert(message);
        return message;
      }
      // send a request to the backend team to add this song to our playlist
      return await this.queryTracks(`track:${track} artist:${artist}`);
    }

    render() {
      return(
        <form id="search-form" onSubmit={(event) => this.handleQuerySubmit(event)}>
          <p>
            Type an artist, album, or song to start your search.
          </p>
          <label>
            <input id="query" type="text" placeholder='Artist'/>
          </label>
          <label>
            <input id="query" type="text" placeholder='Song'/>
          </label>
          <input type="submit" value="Search" />
          <SearchedSongDisplay key="searchedSong" />
        </form>
      )
    }
  }

  export default Form;