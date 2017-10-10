import Camera from './Camera';

const userMedia = navigator.mediaDevices.getUserMedia({
  video: {
    // constraining video because low res is hip
    width: { ideal: 640 },
    height: { ideal: 480 },
  },
});

userMedia.then((stream) => {
  new Camera(stream);
}).catch((err) => {
  console.log(err);
  window.alert('Please enable access to a video capturing device and reload the page.');
});
