import Shutter from './Shutter';
import Printer from './Printer';

class Camera {
  constructor(stream) {
    const canvas = document.querySelector('canvas');

    [this.$flash] = document.getElementsByClassName('flash');
    this.shutter = new Shutter(this);
    this.printer = new Printer(this, stream, canvas);
  }

  // really basic event listener logic
  emit(e, args = []) {
    if (e in this.events) {
      this.events[e].apply(this, args);
    }
  }

  triggerFlash() {
    if (this.$flash) {
      this.$flash.classList.remove('reset');
      this.$flash.classList.add('trigger');
      window.setTimeout(() => {
        this.$flash.classList.add('reset');
        this.$flash.classList.remove('trigger');
        window.setTimeout(() => {
          this.$flash.classList.remove('reset');
        }, 1500);
      }, 150);
    }
  }

  clickShutter() {
    this.triggerFlash();
    this.printer.printPolaroid();
  }

  events = {
    'click-shutter': this.clickShutter,
  }
}

export default Camera;
