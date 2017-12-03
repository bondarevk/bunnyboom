const GameObject = require('./gameObject');
const Ammo = require('ammo-node');

class Entity extends GameObject{

  constructor(width=1, height=1, depth=1, mass=1) {
    super(width, height, depth, mass);

    this.movement = {
      vX: 0.0,
      vY: 0.0,
      vZ: 0.0,
      speed: 10.0
    };

    this.type.push('Entity');
  }

  onTick() {
    super.onTick();

    this.pObject.applyCentralLocalForce(new Ammo.btVector3(this.movement.vX * 10, this.movement.vY * 10, this.movement.vZ * 10));
  }

  generatePacket() {
    let packet = super.generatePacket();



    return packet;
  }
}

module.exports = Entity;