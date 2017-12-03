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
    this.addObject(new GameObject(10, 10, 10));
  }

  addObject(gameObject) {
    if (!this.gameObjects.has(gameObject.id)) {
      this.physics.addRigidBody(gameObject.tObject, gameObject.pObject);
      this.gameObjects.set(gameObject.id, gameObject);
      this.io.addObject(gameObject);
      return true;
    }
    return false;
  }

  removeObject(gameObject) {
    if (this.gameObjects.has(gameObject.id)) {
      this.physics.removeRigidBody(gameObject.tObject, gameObject.pObject);
      this.gameObjects.delete(gameObject.id);
      this.io.removeObject(gameObject);
      return true;
    }
    return false;
  }

  removeObjectById(id) {
    if (this.gameObjects.has(id)) {
      this.physics.removeRigidBody(this.gameObjects[id].tObject, this.gameObjects[id].pObject);
      this.gameObjects.delete(id);

      return true;
    }
    return false;
  }

}

module.exports = GameServer;