const TickManager = require('./tickManager');
const IO = require('./io');
const Physics = require('./physics');
const GameObject = require('./object/gameObject');
const GameMap = require('./map/map');
const GameTextures = require('./map/textures');

class GameServer {

  constructor() {
    global.gameServer = this;

    this.tickrate = 32;
    this.gameObjects = new Map();
    this.players = new Map();

    this.io = new IO();
    this.physics = new Physics(this.tickrate);

    this.tickManager = new TickManager(this.physics, this.io, this.tickrate);



    for (const object of GameMap.objects) {
      const obj = new GameObject(object.width, object.height, object.depth, object.mass);

      const texture = GameTextures[object.texture];
      obj.texture = texture ? texture : null;
      obj.textureX = object.textureX;
      obj.textureY = object.textureY;
      obj.color = object.color;
      obj.opacity = object.opacity;

      obj.setPosition(object.x, object.y, object.z);
      obj.setRotation(object.rotationX, object.rotationY, object.rotationZ);

      this.addObject(obj);
    }
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