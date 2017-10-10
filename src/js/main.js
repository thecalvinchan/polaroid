const userMedia = navigator.mediaDevices.getUserMedia({
  video: {
    // constraining video because low res is hip
    width: { ideal: 640 },
    height: { ideal: 480 }
  }
})

userMedia.then((stream) => {
  new Shutter(stream);
}).catch((err) => {
  console.log(err);
  window.alert('Please enable access to a video capturing device');
});

class Camera {
  constructor() {
    new Shutter();
    new Printer();
  }
}

class Shutter {
  constructor(stream, className='polaroid-body-main-shutter') {
    this.canvas = document.querySelector('canvas');
    this.stream = stream;
    this.video = document.createElement('video');

    this.video.srcObject = stream;
    this.video.play();
    // TODO: add event listener to when video starts playing

    this.shutter = document.getElementsByClassName(className)[0];
    if (!this.shutter) {
      throw new Exception();
    }

    for (let e in this.events) {
      this.shutter.addEventListener(e, this.events[e]);
    }
  }

  clickShutter = (e) => {
    const srcWidth = this.video.videoWidth;
    const srcHeight = this.video.videoHeight;
    let sX=0, sY=0, sWidth=430, sHeight=430;

    // determines bounds for rendering video stream onto canvas
    // we want to render the absolute center of the user media stream
    if (srcWidth > srcHeight) {
        sX = srcWidth/2 - srcHeight/2;
        sY = 0;
        sWidth = srcHeight;
        sHeight = srcHeight;
    } else {
        sX = 0;
        sY = srcHeight/2 - srcWidth/2;
        sWidth = srcWidth;
        sHeight = srcWidth;
    }

    this.canvas.getContext('2d').drawImage(this.video, sX, sY, sWidth, sHeight, 0, 0, 430, 430);

    document.getElementsByClassName('polaroid-picture')[0].classList.remove('closed');
  }

  events = {
    'click': this.clickShutter 
  }
}

class Printer {
  constructor(canvas) {
    this.canvas = canvas;
  }

  printPolaroid(video) {
    const srcWidth = video.videoWidth;
    const srcHeight = video.videoHeight;
    let sX=0, sY=0, sWidth=430, sHeight=430;

    // determines bounds for rendering video stream onto canvas
    // we want to render the absolute center of the user media stream
    if (srcWidth > srcHeight) {
        sX = srcWidth/2 - srcHeight/2;
        sY = 0;
        sWidth = srcHeight;
        sHeight = srcHeight;
    } else {
        sX = 0;
        sY = srcHeight/2 - srcWidth/2;
        sWidth = srcWidth;
        sHeight = srcWidth;
    }

    this.canvas.getContext('2d').drawImage(video, sX, sY, sWidth, sHeight, 0, 0, 430, 430);

    document.getElementsByClassName('polaroid-picture')[0].classList.remove('closed');
  }
}
