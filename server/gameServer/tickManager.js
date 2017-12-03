

class TickManager {

  constructor(physics, io) {
    this.tickrate = 32;
    this.currentTick = 0;

    this.physics = physics;
    this.io = io;
    this.tickTimer = setInterval(this.serverTick.bind(this), 1000 / this.tickrate);
  }

  serverTick() {
    for (let gameObject of global.gameServer.gameObjects) {
      if (gameObject[1].needTick && typeof gameObject[1].onTick === 'function') {
        gameObject.onTick();
      }
    }

    this.physics.tick(this.currentTick);

    this.io.sync();
  }

}

module.exports = TickManager;