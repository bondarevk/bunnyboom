import $ from 'jquery';

class Input {
  constructor(element) {
    this.input = {
      keyborad: new Map(),
      mouse: {
        isDown: false,
        button: 1
      }
    };

    console.log(element);

    $(window).on('keydown', (event) => {
      if (this.input.keyborad.has(event.keyCode)) {
        this.input.keyborad.set(event.keyCode, true)
      }
    });
    $(window).on('keyup', (event) => {
      if (this.input.keyborad.has(event.keyCode)) {
        this.input.keyborad.set(event.keyCode, false)
      }
    });

    $(element).on('mousedown', (event) => {
      if (element === event.target) {
        this.onMouseDown(event);
      }
    });

    $(element).on('contextmenu', () => {
      return false;
    });

    $(element).on('mouseup', (event) => {
      if (this.input.mouse.isDown === true) {
        this.onMouseUp(event);
      }
    })
  }

  onMouseDown(event) {
    this.input.mouse.isDown = true;

    if ('which' in event) {
      if (event.which === 3) {
        this.input.mouse.button = 2;
      } else {
        this.input.mouse.button = 1;
      }
    }
    else if ('button' in event) {
      this.input.mouse.button = event.button === 2;
    }
  }

  onMouseUp(event) {
    this.input.mouse.isDown = false;
  }

  setupKeys(keys) {
    this.input.keyborad.clear();
    keys.forEach((key, index, array) => {
      this.input.keyborad.set(key, false);
    });
  }

  getInput() {
    return {
      keyboard: [...this.input.keyborad],
      mouse: this.input.mouse
    };
  }


}

export default Input;