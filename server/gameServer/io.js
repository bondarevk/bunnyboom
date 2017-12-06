const Player = require('./object/player');

class IO {

  constructor(tickrate) {
    this.io = global.io;
    this.tickrate = tickrate;
    this.packets = [];

    io.on('connection', (socket) => {
      this.onConnect(socket);
      this.initEvents(socket);
      socket.on('disconnect', () => {
        this.onDisconnect(socket);
      })
    })
  }

  onConnect(socket) {
    console.log('Socket connected.')
  }

  onDisconnect(socket) {
    if (socket.player) {
      socket.player.onDisconnect();
    } else {
      return;
    }

    if (global.gameServer.players.has(socket.player.username)) {
      global.gameServer.players.delete(socket.player.username);
    }
  }

  initEvents(socket) {
    socket.on('play', (packet) => {
      if (!packet.username) return;
      if (socket.player) return;

      if (global.gameServer.players.has(packet.username)) {
        socket.emit('usernameExists', {username: packet.username});
        return;
      }

      const player = new Player(packet.username);
      socket.player = player;
      global.gameServer.players.set(packet.username, player);
      player.onConnect();

      console.log('Player joined.');

      this.clientInit(socket);
      this.bindCamera(socket, {
        x: 0,
        y: 10,
        z: 0,
        firstPerson: false,
        eId: null
      })
    });
  }

  bindCamera(socket, camera) {
    socket.emit('bindCamera', camera);
  }

  addObject(gameObject) {
    this.packets.push({
      name: 'addObject',
      data: gameObject.generatePacket()
    })
  }

  removeObjectById(id) {
    this.packets.push({
      name: 'removeObject',
      data: id
    })
  }

  clientInit(socket) {
    const packet = {};

    packet.gameObjects = [];
    for (const gameObject of global.gameServer.gameObjects) {
      packet.gameObjects.push(gameObject[1].generatePacket());
    }

    packet.input = [87, 83, 65, 68, 16];
    packet.tickrate = this.tickrate;

    socket.emit('clientInit', packet);
  }


  sync() {
    const packet = {
      packets: [],
      gameObjects: []
    };

    for (const packetItem of this.packets) {
      packet.packets.push({name: packetItem.name, data: packetItem.data});
    }
    this.packets = [];

    for (const gameObject of global.gameServer.gameObjects) {
      if (gameObject[1].needSync || gameObject[1].mass > 0) {
        packet.gameObjects.push(gameObject[1].generatePacket());
        gameObject[1].needSync = false;
      }
    }

    this.io.emit('sync', packet);
  }

}

module.exports = IO;