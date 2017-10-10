import Camera from './Camera';

const userMedia = navigator.mediaDevices.getUserMedia({
  video: {
    // constraining video resolution bc polaroids r low res
    width: { ideal: 640 },
    height: { ideal: 480 },
  },
});

userMedia.then((stream) => {
  new Camera(stream);
}).catch((err) => {
  console.log(err);
  // TODO: check for type of error
  // create button to let user re-request for userMedia access
  window.alert('Please enable access to a video capturing device and reload the page.');
});
