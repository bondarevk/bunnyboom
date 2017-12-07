import io from 'socket.io-client';
import Input from './input';

class InputHandler {

  constructor(socket) {
    this.socket = socket;
    this.inputTimer = null;
    this.input = [];

    this.inputManager = new Input(global.game.container);
  }

  start(tickrate, input = []) {
    this.input = input;
    this.inputManager.setupKeys(this.input);
    this.stop();
    this.inputTimer = setInterval(this.inputLoop.bind(this), 1000 / tickrate);
  }

  stop() {
    if (this.inputTimer) {
      clearInterval(this.inputTimer);
      this.inputTimer = null;
    }
  }

  inputLoop() {
      const input = this.inputManager.getInput();
      input.cameraDirection = global.game.camera.controls.getDirection();

      this.socket.emit('clientInput', input);
  }

}

class IO {

  constructor() {
    const port = 3090;
    this.socket = io.connect(window.location.protocol + '//' + window.location.hostname + ':' + port);
    this.inputHandler = new InputHandler(this.socket);

    this.initEvents();
  }

  initEvents() {
    this.socket.on('connect', () => {
      this.socket.emit('play', {username: 'test'});
    });

    this.socket.on('disconnect', () => {
      this.inputHandler.stop();
      global.game.clearGameObjects();
    });

    this.socket.on('clientInit', (packet) => {
      global.game.clearGameObjects();

      for (const gameObject of packet.gameObjects) {
        global.game.addGameObject(gameObject);
      }

      console.log(packet);
      this.inputHandler.start(packet.tickrate, packet.input)
    });

    this.socket.on('bindCamera', (packet) => {
      global.game.camera.bind = {
        x: packet.x,
        y: packet.y,
        z: packet.z,
        firstPerson: packet.firstPerson,
        eId: packet.eId
      }
    });

    this.socket.on('sync', (packet) => {
      const packets = packet.packets;
      for (const packetItem of packets) {
        switch (packetItem.name) {
          case 'addObject':
            global.game.addGameObject(packetItem.data);
            break;
          case 'removeObject':
            global.game.removeGameObject(packetItem.data);
            break;
          default:
            break;
        }
      }

      for (const object of packet.gameObjects) {
        global.game.updateGameObject(object);
      }

    });
  }



}

export default IO;