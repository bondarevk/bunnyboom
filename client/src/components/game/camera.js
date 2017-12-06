import * as THREE from 'three';
import PointerLockControls from './controls/PointerLockControls';

class Camera {

  constructor(aspect, pointerLockElement, blockerElement) {
    this.pointerLockElement = pointerLockElement;
    this.blockerElement = blockerElement;

    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.controls = new PointerLockControls(this.camera);

    this.bind = {
      x: 0,
      y: 0,
      z: 0,
      firstPerson: false,
      eId: null
    };

    this.firstPerson = false;
    this.controlsEnabled = false;

    this.initPointerLock();
  }

  pointerLockChange(event) {
    if (document.pointerLockElement === this.pointerLockElement ||
      document.mozPointerLockElement === this.pointerLockElement ||
      document.webkitPointerLockElement === this.pointerLockElement ) {

      this.controlsEnabled = true;
      this.controls.enabled = true;
      this.blockerElement.style.display = 'none';
    } else {
      this.controlsEnabled = false;
      this.controls.enabled = false;
      this.blockerElement.style.display = 'block';
    }
  }

  initPointerLock() {
    document.addEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
    document.addEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
    document.addEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
    document.addEventListener('pointerlockerror', this.pointerLockChange.bind(this), false);
    document.addEventListener('mozpointerlockerror', this.pointerLockChange.bind(this), false);
    document.addEventListener('webkitpointerlockerror', this.pointerLockChange.bind(this), false);

    this.blockerElement.addEventListener('click', (event) => {
      this.pointerLockElement.requestPointerLock = this.pointerLockElement.requestPointerLock ||
        this.pointerLockElement.mozRequestPointerLock ||
        this.pointerLockElement.webkitRequestPointerLock;

      this.pointerLockElement.requestPointerLock();
    }, false );
  }

  onResize(aspect) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }



  updatePos() {
    let cam = this.controls.getObject();
    if (this.bind.eId && global.game.gameObjects.has(this.bind.eId)) {
      let object = global.game.gameObjects.get(this.bind.eId);
      cam.position.x = object.posX;
      cam.position.y = object.posY;
      cam.position.z = object.posZ;
      if (!this.bind.firstPerson) {
        cam.translateZ(5);
        cam.translateY(4);
      }
      return;
    }
    cam.position.x = this.bind.x;
    cam.position.y = this.bind.y;
    cam.position.z = this.bind.z;
  }
}

export default Camera;