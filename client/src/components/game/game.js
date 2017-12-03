import * as PIXI from 'pixi.js'
import $ from 'jquery'

const sprites = [];


class Game {

  constructor(canvas) {
    this.renderer = new PIXI.Application(canvas.clientWidth, canvas.clientHeight, {
      view: canvas,
      backgroundColor: 0xE0B3B9
    }, false);
    this.stage = this.renderer.stage;
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

    $(window).on('resize', () => {
      canvas.width = null;
      canvas.height = null;
      this.renderer.renderer.resize(canvas.clientWidth, canvas.clientHeight)
    });

    for (let sprite of sprites) {
      PIXI.loader.add(sprite.name, sprite.url)
    }

    PIXI.loader.load(() => {
      console.log('Canvas ready!');
    });
  }

  exit() {

  }
}

export default Game;