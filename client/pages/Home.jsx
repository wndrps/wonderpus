import React, { Component } from 'react';
import Form from '../components/Form';
import SongContainer from '../components/SongContainer';
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   return(
      <div className="homepage">
        <h2>Home</h2>
        <Form />
        <SongContainer />
        {/* <div>song container</div>
        <div>searched song display</div> */}
      </div>
    )
  }
}

export default Home;
