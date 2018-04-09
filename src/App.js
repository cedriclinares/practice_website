import React, { Component } from 'react';
import Gameboard from './components/Gameboard';
import GameSelector from './components/GameSelector'

import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Snake</h1>
        </header>
        <p className="App-intro">
          To get started, click start
        </p>
        <GameSelector/>
        <Gameboard/>
      </div>
    );
  }
}

export default App;
