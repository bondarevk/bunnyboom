const Entity = require('./entity');

class Player extends Entity{

  constructor(socket, username) {
    super();
    this.socket = socket;
    this.username = username;
    this.needTick = true;

    this.input = {
      keyboard: new Map(),
      mouse: {
        isDown: false,
        button: 1
      },
      cameraDirection: {
        pitch: 0,
        yaw: 0
      }
    };


    this.debugCamera = true;
    this.debugX = 0;
    this.debugY = 10;
    this.debugZ = 0;
  }

  onConnect() {

  }

  onDisconnect() {

  }

  onTick() {
    super.onTick();





    if (this.debugCamera) {

      if (this.input.keyboard.get(87)) {
        this.debugZ -= 0.2;
      }
      if (this.input.keyboard.get(83)) {
        this.debugZ += 0.2;
      }

      if (this.input.keyboard.get(65)) {
        this.debugX -= 0.2;
      }
      if (this.input.keyboard.get(68)) {
        this.debugX += 0.2;
      }

      if (this.input.keyboard.get(16)) {
        this.debugY -= 0.2;
      }
      if (this.input.keyboard.get(32)) {
        this.debugY += 0.2;
      }


      global.gameServer.io.bindCamera(this.socket, {
        x: this.debugX,
        y: this.debugY,
        z: this.debugZ,
        firstPerson: false,
        eId: null
      });
    }
  }

}

module.exports = Player;