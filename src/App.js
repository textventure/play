import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">textventure-play</h1>
        </header>
      </div>
    );
  }
}

if (process.env.NODE_ENV === 'development') {
  const { hot } = require('react-hot-loader');
  App = hot(module)(App);
}

export default App;
