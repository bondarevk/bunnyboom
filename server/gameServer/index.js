const TickManager = require('./tickManager');
const IO = require('./io');
const Physics = require('./physics');
const GameObject = require('./object/gameObject');

class GameServer {

  constructor() {
    global.gameServer = this;

    this.gameObjects = new Map();
    this.players = new Map();

    this.io = new IO();
    this.physics = new Physics();

    this.tickManager = new TickManager(this.physics, this.io);

    // Test
    const cube = new GameObject(10, 10, 10);
    this.addObject(cube);
    setTimeout(() => {
      this.removeObject(cube);
    }, 5000)
  }

  addObject(gameObject) {
    if (!this.gameObjects.has(gameObject.id)) {
      this.physics.addRigidBody(gameObject.tObject, gameObject.pObject);
      this.gameObjects.set(gameObject.id, gameObject);
      this.io.addObject(gameObject);

      console.log(`Object ${gameObject.id} added`);
      return true;
    }
    return false;
  }

  removeObject(gameObject) {
    if (this.gameObjects.has(gameObject.id)) {
      if (typeof gameObject.onDespawn === 'function') {
        gameObject.onDespawn();
      }

      this.physics.removeRigidBody(gameObject.tObject, gameObject.pObject);
      this.io.removeObjectById(gameObject.id);
      this.gameObjects.delete(gameObject.id);

      console.log(`Object ${gameObject.id} removed`);
      return true;
    }
    return false;
  }

  removeObjectById(id) {
    if (this.gameObjects.has(id)) {
      if (typeof this.gameObjects[id].onDespawn === 'function') {
        this.gameObjects[id].onDespawn();
      }
      this.physics.removeRigidBody(this.gameObjects[id].tObject, this.gameObjects[id].pObject);
      this.io.removeObjectById(id);
      this.gameObjects.delete(id);

      console.log(`Object ${id} removed`);
      return true;
    }
    return false;
  }

}

module.exports = GameServer;