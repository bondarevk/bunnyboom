const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
global.io = io;

const GameServer = require('./gameServer');
const gameServer = new GameServer();

app.use(cors());

app.use(async ctx => {
  ctx.body = 'Hello World';
});

server.listen(3090);