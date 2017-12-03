import $ from 'jquery'
import * as THREE from 'three';
import Stats from 'stats.js';
import Camera from './camera';
import IO from './io';
import RenderUtils from './utils/renderUtils';

class Game {

  constructor(gameElement, gameBlocker) {
    global.game = this;

    this.container = gameElement;
    this.blocker = gameBlocker;

    this.gameObjects = new Map();

    this.initGraphics();
    this.addBasicObjects();

    this.io = new IO();

    this.animate();
  }


  clearGameObjects() {
    this.scene.children.forEach((object) => {
      this.scene.remove(object);
    });
    this.addBasicObjects();
  }

  addGameObject(gameObject) {
    if (this.gameObjects.has(gameObject.id)) {
      return;
    }

    gameObject.Object3D = RenderUtils.createBox(gameObject.posX, gameObject.posY, gameObject.posZ, gameObject.width, gameObject.height, gameObject.depth, gameObject.color);
    gameObject.Object3D.rotation.x = gameObject.rotationX;
    gameObject.Object3D.rotation.y = gameObject.rotationY;
    gameObject.Object3D.rotation.z = gameObject.rotationZ;

    this.scene.add(gameObject.Object3D);
    this.gameObjects.set(gameObject.id, gameObject);
  }



  initGraphics() {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.time = 0;
      this.scene.fog = new THREE.Fog(0xFFFFFF, 0, 0);

    this.camera = new Camera(this.container.clientWidth / this.container.clientHeight, this.container, this.blocker);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0xbfd1e5);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;

    this.textureLoader = new THREE.TextureLoader();
    this.container.appendChild(this.renderer.domElement);

    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.container.appendChild(this.stats.domElement);


    $(window).on('resize', (event) => {
      this.camera.onResize(this.container.clientWidth / this.container.clientHeight);
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });
  }

  addBasicObjects() {
    const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    this.scene.add(light);
    this.scene.add(this.camera.controls.getObject());
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
  }

  render() {
    let deltaTime = this.clock.getDelta();
    this.camera.updatePos();
    //RenderUtils.updatePlayer();
    this.renderer.render(this.scene, this.camera.camera);
    this.time += deltaTime;
  }



  exit() {

  }
}

export default Game;