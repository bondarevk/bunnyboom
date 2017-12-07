

class TickManager {

  constructor(physics, io, tickrate) {
    this.tickrate = tickrate;
    this.currentTick = 0;

    this.physics = physics;
    this.io = io;
    this.tickTimer = setInterval(this.serverTick.bind(this), 1000 / this.tickrate);
  }

  serverTick() {
    for (let gameObject of global.gameServer.gameObjects) {
      if (gameObject[1].needTick && typeof gameObject[1].onTick === 'function') {
        gameObject[1].onTick();
      }
    }

    this.physics.tick(this.currentTick);

    this.io.sync();
  }

}

module.exports = TickManager;