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
    // For future devs: need to make a Spotify App on developer.spotify.com to get clientId and clientSecret
    this.clientId = '';
    this.clientSecret = '';

    this.state = {
      savedSongs: [],
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
    const accessToken = await this.getAccessToken();
    console.log(accessToken);
    this.spotifyApi.setAccessToken(accessToken);
    const allResults = await this.spotifyApi.searchTracks(queryString)
      .then((data) => {
        console.log(data);
        return data.tracks.items
      });
    // console.log(allResults);
    console.log('--------ALL RESULTS--------\n', allResults);
    const topResult = allResults[0];
    console.log('--------TOP RESULT--------\n', topResult);
    const { album, artists, name } = topResult;
    console.log('--------SONG NAME--------\n', name);
    console.log('--------ALBUM--------\n', album);
    console.log('--------ARTIST(S)--------\n', artists);
    return topResult;
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
    console.log('TRACK:', track);
    console.log('ARTIST:', artist);
    if (artist === '' || track === '') {
      const message = 'You must input an artist and track';
      alert(message);
      return;
    }
    // send a request to the backend team to add this song to our playlist
    const dataObj = await this.queryTracks(`track:${track} artist:${artist}`);
    // console.log(dataObj),
    // console.log(typeof dataObj.preview_url),
    await axios.post('/api/addSong', 
      {
        track: track,
        trackId: dataObj.id,
        artist: artist,
        previewLink: dataObj.preview_url,
        dataObj: dataObj,
      }
    )
    return await this.queryTracks(`track:${track} artist:${artist}`);
  }

  render() {
    return(
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <form id="search-form" onSubmit={(event) => this.handleQuerySubmit(event)}>
        <label>
          <input id="query" type="text" placeholder='Artist'/>
        </label>
        <label>
          <input id="query" type="text" placeholder='Song'/>
        </label>
        <input type="submit" value="Add Top Result" />
        <SearchedSongDisplay key="searchedSong" />
      </form>
      </div>
    )
  }
}

export default Form;