import audioSample from '../assets/polaroid_600.mp3';

const STATE_LOADING = 'loading';
const STATE_READY = 'ready';

const POLAROID_SIZE = 430;

class Printer {
  constructor(camera, stream, canvas, pictureClassName = 'polaroid-picture') {
    this.state = STATE_LOADING;
    this.video = document.createElement('video');
    this.audio = new Audio(audioSample);

    this.video.srcObject = stream;
    this.video.play();
    this.video.addEventListener('canplay', () => {
      this.loadDimensions();
      this.state = STATE_READY;
    });

    this.canvas = canvas;
    [this.$polaroid] = document.getElementsByClassName(pictureClassName);
  }

  loadDimensions() {
    const srcWidth = this.video.videoWidth;
    const srcHeight = this.video.videoHeight;
    [this.sX, this.sY, this.sWidth, this.sHeight] = [0, 0, POLAROID_SIZE, POLAROID_SIZE];

    // determines bounds for rendering video stream onto canvas
    // we want to render the absolute center of the user media stream
    if (srcWidth > srcHeight) {
      // camera captures media in landscape aspect ratio 
      this.sX = srcWidth / 2 - srcHeight / 2;
      this.sY = 0;
      this.sWidth = srcHeight;
      this.sHeight = srcHeight;
    } else {
      // camera captures media in portrait aspect ratio 
      this.sX = 0;
      this.sY = srcHeight / 2 - srcWidth / 2;
      this.sWidth = srcWidth;
      this.sHeight = srcWidth;
    }
  }

  printPolaroid() {
    this.canvas.getContext('2d').drawImage(this.video, this.sX, this.sY, this.sWidth, this.sHeight, 0, 0, POLAROID_SIZE, POLAROID_SIZE);
    this.audio.play();
    this.state = STATE_LOADING;

    this.printing(() => {
      window.setTimeout(() => {
        this.reset();
      }, 5000);
    });
  }

  printing(cb) {
    this.$polaroid.classList.remove('reset');
    this.$polaroid.classList.remove('closed');
    if (cb) {
      cb();
    }
  }

  reset(cb) {
    this.$polaroid.classList.add('reset');
    this.$polaroid.classList.add('closed');
    this.state = STATE_READY;
    if (cb) {
      cb();
    }
  }

  getState() {
    return this.state;
  }
}

export default Printer;
export { STATE_LOADING, STATE_READY }
