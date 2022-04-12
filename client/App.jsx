import React, { Component } from 'react';
import Home from './pages/Home';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="app" style={{maxWidth: '50%', margin: '0 auto'}}>
        <h2 style={{display: 'flex', justifyContent: 'center'}}>Welcome to your dashboard!</h2>
        <Home />
      </div>
    )
  }
}

export default App;