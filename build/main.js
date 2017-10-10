/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(6);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Camera = __webpack_require__(2);

var _Camera2 = _interopRequireDefault(_Camera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userMedia = navigator.mediaDevices.getUserMedia({
  video: {
    // constraining video resolution bc polaroids r low res
    width: { ideal: 640 },
    height: { ideal: 480 }
  }
});

userMedia.then(function (stream) {
  new _Camera2.default(stream);
}).catch(function (err) {
  console.log(err);
  // TODO: check for type of error
  // create button to let user re-request for userMedia access
  window.alert('Please enable access to a video capturing device and reload the page.');
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Shutter = __webpack_require__(3);

var _Shutter2 = _interopRequireDefault(_Shutter);

var _Printer = __webpack_require__(4);

var _Printer2 = _interopRequireDefault(_Printer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
  function Camera(stream) {
    _classCallCheck(this, Camera);

    this.events = {
      'click-shutter': this.clickShutter
    };

    var canvas = document.querySelector('canvas');

    // we pass `this` into child components 
    // so that they can trigger events
    var _document$getElements = document.getElementsByClassName('flash');

    var _document$getElements2 = _slicedToArray(_document$getElements, 1);

    this.$flash = _document$getElements2[0];
    this.shutter = new _Shutter2.default(this);
    this.printer = new _Printer2.default(this, stream, canvas);
  }

  // really basic event listener logic
  // could separate this out into 
  // its own component if more complex behavior is needed


  _createClass(Camera, [{
    key: 'emit',
    value: function emit(e) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (e in this.events) {
        this.events[e].apply(this, args);
      }
    }
  }, {
    key: 'triggerFlash',
    value: function triggerFlash() {
      var _this = this;

      if (this.$flash) {
        this.$flash.classList.remove('reset');
        this.$flash.classList.add('trigger');
        window.setTimeout(function () {
          _this.$flash.classList.add('reset');
          _this.$flash.classList.remove('trigger');
          window.setTimeout(function () {
            _this.$flash.classList.remove('reset');
          }, 1500);
        }, 150);
      }
    }
  }, {
    key: 'clickShutter',
    value: function clickShutter() {
      // only trigger shutter if polaroid printer is ready
      if (this.printer.getState() === _Printer.STATE_READY) {
        this.triggerFlash();
        this.printer.printPolaroid();
      }
    }

    // events that this component should subscribe to should be added here.
    // these events can be triggered via `emit`

  }]);

  return Camera;
}();

exports.default = Camera;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shutter = function Shutter(camera) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'polaroid-body-main-shutter';

  _classCallCheck(this, Shutter);

  var _document$getElements = document.getElementsByClassName(className);

  var _document$getElements2 = _slicedToArray(_document$getElements, 1);

  this.$shutter = _document$getElements2[0];

  this.$shutter.addEventListener('click', function () {
    camera.emit('click-shutter');
  });
};

exports.default = Shutter;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATE_READY = exports.STATE_LOADING = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _polaroid_ = __webpack_require__(5);

var _polaroid_2 = _interopRequireDefault(_polaroid_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STATE_LOADING = 'loading';
var STATE_READY = 'ready';

var POLAROID_SIZE = 430;

var Printer = function () {
  function Printer(camera, stream, canvas) {
    var _this = this;

    var pictureClassName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'polaroid-picture';

    _classCallCheck(this, Printer);

    this.state = STATE_LOADING;
    this.video = document.createElement('video');
    this.audio = new Audio(_polaroid_2.default);

    this.video.srcObject = stream;
    this.video.play();
    this.video.addEventListener('canplay', function () {
      _this.loadDimensions();
      _this.state = STATE_READY;
    });

    this.canvas = canvas;

    var _document$getElements = document.getElementsByClassName(pictureClassName);

    var _document$getElements2 = _slicedToArray(_document$getElements, 1);

    this.$polaroid = _document$getElements2[0];
  }

  _createClass(Printer, [{
    key: 'loadDimensions',
    value: function loadDimensions() {
      var srcWidth = this.video.videoWidth;
      var srcHeight = this.video.videoHeight;


      // determines bounds for rendering video stream onto canvas
      // we want to render the absolute center of the user media stream
      var _ref = [0, 0, POLAROID_SIZE, POLAROID_SIZE];
      this.sX = _ref[0];
      this.sY = _ref[1];
      this.sWidth = _ref[2];
      this.sHeight = _ref[3];
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
  }, {
    key: 'printPolaroid',
    value: function printPolaroid() {
      var _this2 = this;

      this.canvas.getContext('2d').drawImage(this.video, this.sX, this.sY, this.sWidth, this.sHeight, 0, 0, POLAROID_SIZE, POLAROID_SIZE);
      this.audio.play();
      this.state = STATE_LOADING;

      this.printing(function () {
        window.setTimeout(function () {
          _this2.reset();
        }, 5000);
      });
    }
  }, {
    key: 'printing',
    value: function printing(cb) {
      this.$polaroid.classList.remove('reset');
      this.$polaroid.classList.remove('closed');
      if (cb) {
        cb();
      }
    }
  }, {
    key: 'reset',
    value: function reset(cb) {
      this.$polaroid.classList.add('reset');
      this.$polaroid.classList.add('closed');
      this.state = STATE_READY;
      if (cb) {
        cb();
      }
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }]);

  return Printer;
}();

exports.default = Printer;
exports.STATE_LOADING = STATE_LOADING;
exports.STATE_READY = STATE_READY;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ff897ea6c3c67c96b6001ba1fea6a438.mp3";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);