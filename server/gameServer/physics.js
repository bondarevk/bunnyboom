const Ammo = require('ammo-node');
const THREE = require('three');

class Physics {

  constructor(tickrate) {
    this.tickrate = tickrate;
    this.gravityConstant = -9.8;

    this.rigidBodies = [];

    this.collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
    this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
    this.broadphase = new Ammo.btDbvtBroadphase();
    this.solver = new Ammo.btSequentialImpulseConstraintSolver();
    this.softBodySolver = new Ammo.btDefaultSoftBodySolver();

    this.physicsWorld = new Ammo.btSoftRigidDynamicsWorld(
      this.dispatcher,
      this.broadphase,
      this.solver,
      this.collisionConfiguration,
      this.softBodySolver
    );
    this.physicsWorld.setGravity(new Ammo.btVector3(0, this.gravityConstant, 0));
    this.physicsWorld.getWorldInfo().set_m_gravity(new Ammo.btVector3(0, this.gravityConstant, 0));
    console.log('Physics init.')
  }


  // Mesh, btShape, Mass
  createRigidBody(threeObject, physicsShape, mass) {
    // Position
    const pos = new THREE.Vector3();
    pos.copy(threeObject.position);

    // Quaternion
    const quat = new THREE.Quaternion();
    quat.copy(threeObject.quaternion);

    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));

    const motionState = new Ammo.btDefaultMotionState(transform);
    const localInertia = new Ammo.btVector3(0, 0, 0);
    physicsShape.calculateLocalInertia(mass, localInertia);

    const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia);
    const body = new Ammo.btRigidBody(rbInfo);
    threeObject.userData.physicsBody = body;

    if (mass > 0) {
      // Disable deactivation
      body.setActivationState(4);
    }

    return body;
  }

  addRigidBody(tObject, pObject) {
    this.rigidBodies.push(tObject);
    this.physicsWorld.addRigidBody(pObject);
  }

  removeRigidBody(tObject, pObject) {
    this.physicsWorld.removeRigidBody(pObject);

    const index = this.rigidBodies.indexOf(tObject);
    if (index >= 0) {
      this.rigidBodies.splice(index, 1);
    }
  }


  tick(currentTick) {
    this.physicsWorld.stepSimulation(1 / this.tickrate, 1 / this.tickrate);

    for (let rigidBody of this.rigidBodies) {
      const transform = rigidBody.userData.physicsBody.getCenterOfMassTransform();
      const origin = transform.getOrigin();
      const rotation = transform.getRotation();

      rigidBody.position.set(origin.x(), origin.y(), origin.z());
      rigidBody.quaternion.set(rotation.x(), rotation.y(), rotation.z(), rotation.w());
    }
  }

}

module.exports = Physics;