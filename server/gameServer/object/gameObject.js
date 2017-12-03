const uuidv4 = require('uuid/v4');
const THREE = require('three');
const Ammo = require('ammo-node');

class GameObject{

  constructor(width=1, height=1, depth=1, mass=0) {
    this.id = uuidv4();

    this.needSync = false;
    this.needTick = false;

    this.color = 0xFFFFFF;

    this.tObject = new THREE.Object3D();
    this.tObject.position.x = 0;
    this.tObject.position.y = 0;
    this.tObject.position.z = 0;
    this.tObject.rotation.x = 0;
    this.tObject.rotation.y = 0;
    this.tObject.rotation.z = 0;

    this.width = width || 1;
    this.height = height || 1;
    this.depth = depth || 1;

    this.shape = new Ammo.btBoxShape(new Ammo.btVector3(this.width * 0.5, this.height * 0.5, this.depth * 0.5));
    this.shape.setMargin(0.5);
    this.mass = mass;
    this.pObject = global.gameServer.physics.createRigidBody(this.tObject, this.shape, this.mass);

    this.type = ['GameObject'];
  }

  setMass(mass) {
    this.mass = mass;
    this.pObject.setMassProps(this.mass, new Ammo.btVector3( 0, 0, 0 ));
    this.shape.calculateLocalInertia(this.mass, new Ammo.btVector3( 0, 0, 0 ));
  }

  setSize(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;

    this.shape = new Ammo.btBoxShape(new Ammo.btVector3(this.width * 0.5, this.height * 0.5, this.depth * 0.5));
    this.shape.setMargin(0.5);
    this.shape.calculateLocalInertia(this.mass, new Ammo.btVector3( 0, 0, 0 ));
    this.pObject.setCollisionShape(this.shape);

    this.needSync = true;
  }

  // Координаты
  setPosition(x, y, z) {
    let transform = this.pObject.getCenterOfMassTransform();
    let origin = transform.getOrigin();

    if (x === undefined) {
      x = this.tObject.position.x;
    }
    if (y === undefined) {
      y = this.tObject.position.y;
    }
    if (z === undefined) {
      z = this.tObject.position.z;
    }

    this.tObject.position.set(x, y, z, "XYZ");
    let pos = new THREE.Vector3();
    pos.copy(this.tObject.position);

    transform.setOrigin(new Ammo.btVector3( pos.x, pos.y, pos.z ));

    this.pObject.setCenterOfMassTransform(transform);

    this.needSync = true;
  }

  setRotation(x, y, z) {
    let transform = this.pObject.getCenterOfMassTransform();

    if (x === undefined) {
      x = this.tObject.rotation.x;
    }
    if (y === undefined) {
      y = this.tObject.rotation.y;
    }
    if (z === undefined) {
      z = this.tObject.rotation.z;
    }

    // TODO: FIX ROTATION!

    this.tObject.rotation.set(x, y, z, "XYZ");

    let quat = new THREE.Quaternion();
    quat.copy(this.tObject.quaternion);
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));

    this.pObject.setCenterOfMassTransform(transform);

    this.needSync = true;
  }

  onTick(tick) {
    this.needSync = true;
  }

  generatePacket() {
    return {
      id: this.id,
      posX: this.tObject.position.x,
      posY: this.tObject.position.y,
      posZ: this.tObject.position.z,
      rotationX: this.tObject.rotation.x,
      rotationY: this.tObject.rotation.y,
      rotationZ: this.tObject.rotation.z,
      width: this.width,
      height: this.height,
      depth: this.depth,
      color: this.color,
      type: this.type
    };
  }

}

module.exports = GameObject;