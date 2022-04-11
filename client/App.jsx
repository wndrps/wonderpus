import React, { Component } from 'react';
import Home from './pages/Home';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="app">
        <h1>App</h1>
        <Home />
      </div>
    )
  }
}

export default App;