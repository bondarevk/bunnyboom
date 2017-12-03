import React, { Component } from 'react';
import bunny from './bunny.svg';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-main">
          <div className="App-header">
            <img src={bunny} className="App-logo" alt="logo" />
            <span>Bunny Boom</span>
          </div>
          <div className="App-game">

          </div>
        </div>
        <div className="App-chat">

        </div>
      </div>
    );
  }
}

export default App;
