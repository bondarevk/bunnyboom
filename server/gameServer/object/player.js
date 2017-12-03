const Entity = require('./entity');

class Player extends Entity{

  constructor(username) {
    super();
    this.username = username;
  }

  onConnect() {

  }

  onDisconnect() {

  }

}

module.exports = Player;