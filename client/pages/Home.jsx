import React, { Component } from 'react';
import Form from '../components/Form';
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   return(
      <div className="homepage">
        <h2>Home</h2>
        <Form />
        {/* <div>song container</div>
        <div>searched song display</div> */}
      </div>
    )
  }
}

export default Home;
