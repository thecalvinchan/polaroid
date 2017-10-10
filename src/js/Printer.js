import audioSample from '../assets/polaroid_600.mp3';

class Printer {
  constructor(camera, stream, canvas, pictureClassName = 'polaroid-picture') {
    this.video = document.createElement('video');
    this.audio = new Audio(audioSample);

    this.video.srcObject = stream;
    this.video.play();
    // TODO: add event listener to when video starts playing

    this.canvas = canvas;
    [this.$polaroid] = document.getElementsByClassName(pictureClassName);
  }

  printPolaroid() {
    const srcWidth = this.video.videoWidth;
    const srcHeight = this.video.videoHeight;
    let [sX, sY, sWidth, sHeight] = [0, 0, 430, 430];

    // determines bounds for rendering video stream onto canvas
    // we want to render the absolute center of the user media stream
    if (srcWidth > srcHeight) {
      sX = srcWidth / 2 - srcHeight / 2;
      sY = 0;
      sWidth = srcHeight;
      sHeight = srcHeight;
    } else {
      sX = 0;
      sY = srcHeight / 2 - srcWidth / 2;
      sWidth = srcWidth;
      sHeight = srcWidth;
    }

    this.canvas.getContext('2d').drawImage(this.video, sX, sY, sWidth, sHeight, 0, 0, 430, 430);
    this.audio.play();

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
    if (cb) {
      cb();
    }
  }
}

export default Printer;
