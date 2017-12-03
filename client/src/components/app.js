import React, { Component } from 'react';
import bunny from './bunny.svg';
import './app.css';
import {connect} from "react-redux";
import * as actions from '../actions';
import Game from'./game/game'

class App extends Component {

  constructor(props) {
    super(props);

    this.canvas = null;
    this.test = this.test.bind(this);
  }

  test() {

  }


  componentDidMount() {
    this.game = new Game(this.canvas);
  }

  componentWillUnmount() {
    this.game.exit();
  }

  render() {
    return (
      <div className="App">
        <div className="App-main">
          <div className="App-header">
            <img src={bunny} className="App-logo" alt="logo" />
            <span>Bunny Boom</span>
          </div>
          <div className="App-game">
            <canvas className="Game-canvas" ref={(canvas) => {this.canvas = canvas}} />
          </div>
        </div>
        <div className="App-chat">
          <button onClick={this.test} className="btn btn-default">click</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.username,
    connected: state.user.connected
  };
}

export default connect(mapStateToProps, actions)(App);