class Shutter {
  constructor(camera, className = 'polaroid-body-main-shutter') {
    [this.$shutter] = document.getElementsByClassName(className);
    this.$shutter.addEventListener('click', () => {
      camera.emit('click-shutter');
    });
  }
}

export default Shutter;
