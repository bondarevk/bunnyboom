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
    while(this.scene.children.length > 0){
      this.scene.remove(this.scene.children[0]);
    }
    this.gameObjects.clear();
    this.addBasicObjects();
  }

  addGameObject(gameObject) {
    if (this.gameObjects.has(gameObject.id)) {
      return;
    }

    gameObject.Object3D = RenderUtils.createBox(gameObject.posX, gameObject.posY, gameObject.posZ,
      1, 1, 1, parseInt(gameObject.color), false, true,
      gameObject.texture, gameObject.textureX, gameObject.textureY, gameObject.opacity);

    gameObject.Object3D.scale.set(gameObject.width, gameObject.height, gameObject.depth);
    gameObject.Object3D.rotation.x = gameObject.rotationX;
    gameObject.Object3D.rotation.y = gameObject.rotationY;
    gameObject.Object3D.rotation.z = gameObject.rotationZ;

    this.scene.add(gameObject.Object3D);
    this.gameObjects.set(gameObject.id, gameObject);

    console.log(gameObject);
    console.log(`Object ${gameObject.id} added`);
  }

  removeGameObject(id) {
    if (!this.gameObjects.has(id)) {
      return;
    }

    this.scene.remove(this.gameObjects.get(id).Object3D);
    this.gameObjects.delete(id);

    console.log(`Object ${id} removed`);
  }

  updateGameObject(gameObject) {
    if (!this.gameObjects.has(gameObject.id)) {
      this.addGameObject(gameObject);
      return;
    }

    // Update
    const localObject = this.gameObjects.get(gameObject.id);
    // Position
    localObject.posX = gameObject.posX;
    localObject.posY = gameObject.posY;
    localObject.posZ = gameObject.posZ;
    localObject.Object3D.position.x = localObject.posX;
    localObject.Object3D.position.y = localObject.posY;
    localObject.Object3D.position.z = localObject.posZ;

    // Rotation
    localObject.rotationX = gameObject.rotationX;
    localObject.rotationY = gameObject.rotationY;
    localObject.rotationZ = gameObject.rotationZ;
    localObject.Object3D.rotation.x = localObject.rotationX;
    localObject.Object3D.rotation.y = localObject.rotationY;
    localObject.Object3D.rotation.z = localObject.rotationZ;

    // Size
    localObject.width = gameObject.width;
    localObject.height = gameObject.height;
    localObject.depth = gameObject.depth;
    localObject.Object3D.scale.set(localObject.width, localObject.height, localObject.depth);


    //TODO: Update all
  }




  initGraphics() {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.time = 0;
    //this.scene.fog = new THREE.Fog(0xFFFFFF, 50, 50);

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
    const light = new THREE.HemisphereLight( 0xFFFFFF, 0xFFFFFF, 0.90 );
    light.position.set( 0, 10, 0 );
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