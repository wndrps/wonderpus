import axios from 'axios';
import React, { Component } from 'react';
import Song from './Song'

class SongContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // default value is '3v3VFa7Dt32gNR27jfw7DG' (40oz by Polyphia)
        savedSongs: [],
      }
    }

    async componentDidMount() {
      const savedSongs = await axios.get('/api/getSavedSongs');
      const { data } = savedSongs; 
      // console.log('data in didMount', data);
      return await this.setState({ savedSongs: data });
    }

    // async componentDidUpdate(prevProps, prevState) {
    //   try {
    //     if (this.state.savedSongs !== prevState.savedSongs) {
    //       await this.setState({})
    //     } else {
    //       return prevState;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     return error;
    //   }
    // }
  
    render() {
      let SongComponentArray = [];
      // console.log(this.state);
      for (let i = 0; i < this.state.savedSongs.length; i++) {
        // console.log(this.state.savedSongs[i]);
        SongComponentArray.push(
          <Song 
            key={this.state.savedSongs[i]}
            trackId={this.state.savedSongs[i]}
          />
        )
      }
      <Song key="song0" songId={this.state.savedSongs[0]} />
      return(
        <div className="app">
          <br/>
          {SongComponentArray}
        </div>
      )
    }
  }
  
  export default SongContainer;

  