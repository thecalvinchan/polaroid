import Shutter from './Shutter';
import Printer from './Printer';

import { STATE_READY } from './Printer';

class Camera {
  constructor(stream) {
    const canvas = document.querySelector('canvas');

    [this.$flash] = document.getElementsByClassName('flash');
    // we pass `this` into child components 
    // so that they can trigger events
    this.shutter = new Shutter(this);
    this.printer = new Printer(this, stream, canvas);
  }

  // really basic event listener logic
  // could separate this out into 
  // its own component if more complex behavior is needed
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
    // only trigger shutter if polaroid printer is ready
    if (this.printer.getState() === STATE_READY ) {
      this.triggerFlash();
      this.printer.printPolaroid();
    }
  }

  // events that this component should subscribe to should be added here.
  // these events can be triggered via `emit`
  events = {
    'click-shutter': this.clickShutter,
  }
}

export default Camera;
