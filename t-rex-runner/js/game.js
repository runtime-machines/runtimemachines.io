// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
(function() {
'use strict';
/**
 * T-Rex runner.
 * @param {string} outerContainerId Outer containing element id.
 * @param {Object} opt_config
 * @constructor
 * @export
 */
function Runner(outerContainerId, opt_config) {
  // Singleton
  if (Runner.instance_) {
    return Runner.instance_;
  }
  Runner.instance_ = this;

  this.outerContainerEl = document.querySelector(outerContainerId);
  this.containerEl = null;
  this.snackbarEl = null;
  // this.detailsButton = this.outerContainerEl.querySelector('#details-button');

  this.config = opt_config || Runner.config;

  this.dimensions = Runner.defaultDimensions;

  this.canvas = null;
  this.canvasCtx = null;

  this.tRex = null;

  this.distanceMeter = null;
  this.distanceRan = 0;
  this.distanceTimer = 100;
  this.highestScore = 0;

  this.time = 0;
  this.runningTime = 0;
  this.msPerFrame = 1000 / FPS;
  this.currentSpeed = this.config.SPEED;

  this.obstacles = [];

  this.started = false;
  this.activated = false;
  this.crashed = false;
  this.paused = false;
  this.freeze = false;
  this.ended = false;

  this.resizeTimerId_ = null;

  this.playCount = 0;

  // Sound FX.
  this.audioBuffer = null;
  this.soundFx = {};

  // Global web audio context for playing sounds.
  this.audioContext = null;

  // Images.
  this.images = {};
  this.imagesLoaded = 0;

  // if (this.isDisabled()) {
  //   this.setupDisabledRunner();
  // } else {
    this.loadImages();
  // }

  this.gamepadPreviousKeyDown = false;
}
window['Runner'] = Runner;

Runner.isRiddle = true;

/**
 * Default game configuration.
 * @enum {number}
 */
Runner.config = {
  ACCELERATION: 0.001,
  BG_CLOUD_SPEED: 0.2,
  BOTTOM_PAD: 10,
  CLEAR_TIME: 3000, //time after first obstacle will spawn
  PICKUP_TIME: 2500, //time after first pickup will spwan
  CLOUD_FREQUENCY: 0.5,
  GAMEOVER_CLEAR_TIME: 750,
  GAP_COEFFICIENT: 0.6,
  GRAVITY: 0.6,
  INITIAL_JUMP_VELOCITY: 12,
  MAX_CLOUDS: 6,
  MAX_OBSTACLE_LENGTH: 3,
  MAX_OBSTACLE_DUPLICATION: 2,
  MAX_SPEED: 13,
  MIN_JUMP_HEIGHT: 35,
  // msc = 1.2 -> width = 600
  MOBILE_SPEED_COEFFICIENT: 2.4,
  RESOURCE_TEMPLATE_ID: 'audio-resources',
  SPEED: 6,
  SPEED_DROP_COEFFICIENT: 3
};


/**
 * Default dimensions.
 * @enum {string}
 */
Runner.defaultDimensions = {
  WIDTH: DEFAULT_WIDTH,
  HEIGHT: 150
};


/**
 * CSS class names.
 * @enum {string}
 */
Runner.classes = {
  CANVAS: 'runner-canvas',
  CONTAINER: 'runner-container',
  CRASHED: 'crashed',
  ICON: 'icon-offline',
  SNACKBAR: 'snackbar',
  SNACKBAR_SHOW: 'snackbar-show',
  TOUCH_CONTROLLER: 'touch-controller',
  PLAYER: "main_canvas"
};


/**
 * Sprite definition layout of the spritesheet.
 * @enum {Object}
 */
 Runner.spriteDefinition = {
  LDPI: {
      CACTUS_LARGE:{x:332,y:2},
      CACTUS_SMALL:{x:228,y:2},
      CLOUD:{x:86,y:2},
      HORIZON:{x:2,y:54},
      PTERODACTYL:{x:134,y:2},
      RESTART:{x:2,y:2},
      SKIP:{x:1054, y: 2}, //to check
      TEXT_SPRITE:{x:484,y:2},
      TREX:{x:0,y:15}, //custom file
      COIN: {x:1111, y: 4} //to check
  },
  HDPI: {
      CACTUS_LARGE:{x:652,y:2},
      CACTUS_SMALL:{x:446,y:2},
      CLOUD:{x:166,y:2},
      HORIZON:{x:2,y:104},
      PTERODACTYL:{x:260,y:2},
      RESTART:{x:2,y:2},
      SKIP:{x:2108, y: 4}, //todo
      TEXT_SPRITE:{x:954,y:2},
      TREX:{x:0,y:30}, //custom file
      COIN: {x:2222, y: 8}
  }
};


/**
 * Sound FX. Reference to the ID of the audio tag on interstitial page.
 * @enum {string}
 */
Runner.sounds = {
  BUTTON_PRESS: 'offline-sound-press',
  HIT: 'offline-sound-hit',
  SCORE: 'offline-sound-reached'
};


/**
 * Key code mapping.
 * @enum {Object}
 */
Runner.keycodes = {
  JUMP: {'38': 1, '32': 1},  // Up, spacebar
  DUCK: {'40': 1},  // Down
  RESTART: {'13': 1}  // Enter
};


/**
 * Runner event names.
 * @enum {string}
 */
Runner.events = {
  ANIM_END: 'webkitAnimationEnd',
  CLICK: 'click',
  KEYDOWN: 'keydown',
  KEYUP: 'keyup',
  MOUSEDOWN: 'mousedown',
  MOUSEUP: 'mouseup',
  RESIZE: 'resize',
  TOUCHEND: 'touchend',
  TOUCHSTART: 'touchstart',
  VISIBILITY: 'visibilitychange',
  BLUR: 'blur',
  FOCUS: 'focus',
  LOAD: 'load',
  GAMEPADCONNECTED: 'gamepadconnected'
};


Runner.prototype = {
  /**
   * Whether the easter egg has been disabled. CrOS enterprise enrolled devices.
   * @return {boolean}
   */
  isDisabled: function() {
    return loadTimeData && loadTimeData.valueExists('disabledEasterEgg');
  },

  /**
   * For disabled instances, set up a snackbar with the disabled message.
   */
  setupDisabledRunner: function() {
    this.containerEl = document.createElement('div');
    this.containerEl.className = Runner.classes.SNACKBAR;
    this.containerEl.textContent = loadTimeData.getValue('disabledEasterEgg');
    this.outerContainerEl.appendChild(this.containerEl);

    // Show notification when the activation key is pressed.
    document.addEventListener(Runner.events.KEYDOWN, function(e) {
      if (Runner.keycodes.JUMP[e.keyCode]) {
        this.containerEl.classList.add(Runner.classes.SNACKBAR_SHOW);
        document.querySelector('.icon').classList.add('icon-disabled');
      }
    }.bind(this));
  },

  /**
   * Setting individual settings for debugging.
   * @param {string} setting
   * @param {*} value
   */
  updateConfigSetting: function(setting, value) {
    if (setting in this.config && value != undefined) {
      this.config[setting] = value;

      switch (setting) {
        case 'GRAVITY':
        case 'MIN_JUMP_HEIGHT':
        case 'SPEED_DROP_COEFFICIENT':
          this.tRex.config[setting] = value;
          break;
        case 'INITIAL_JUMP_VELOCITY':
          this.tRex.setJumpVelocity(value);
          break;
        case 'SPEED':
          this.setSpeed(value);
          break;
      }
    }
  },

  /**
   * Cache the appropriate image sprite from the page and get the sprite sheet
   * definition.
   */
  loadImages: function() {
    if (IS_HIDPI) {
      Runner.imageSprite = document.getElementById('hidpi-sprites');
      this.spriteDef = Runner.spriteDefinition.HDPI;

      //load main character sprites
      Runner.imageSpriteTrex = document.getElementById('hidpi-trex');

    } else {
      Runner.imageSprite = document.getElementById('ldpi-sprites');
      this.spriteDef = Runner.spriteDefinition.LDPI;

      //load main character sprites
      Runner.imageSpriteTrex = document.getElementById('ldpi-trex');

    }

    this.init();
  },

  /**
   * Load and decode base 64 encoded sounds.
   */
  loadSounds: function() {
    if (!IS_IOS) {
      this.audioContext = new AudioContext();

      var resourceTemplate =
          document.getElementById(this.config.RESOURCE_TEMPLATE_ID).content;

      for (var sound in Runner.sounds) {
        var soundSrc =
            resourceTemplate.getElementById(Runner.sounds[sound]).src;
        soundSrc = soundSrc.substr(soundSrc.indexOf(',') + 1);
        var buffer = decodeBase64ToArrayBuffer(soundSrc);

        // Async, so no guarantee of order in array.
        this.audioContext.decodeAudioData(buffer, function(index, audioData) {
            this.soundFx[index] = audioData;
          }.bind(this, sound));
      }
    }
  },

  /**
   * Sets the game speed. Adjust the speed accordingly if on a smaller screen.
   * @param {number} opt_speed
   */
  setSpeed: function(opt_speed) {
    var speed = opt_speed || this.currentSpeed;

    // Reduce the speed on smaller mobile screens.
    if (this.dimensions.WIDTH < DEFAULT_WIDTH) {
      var mobileSpeed = speed * this.dimensions.WIDTH / DEFAULT_WIDTH *
          this.config.MOBILE_SPEED_COEFFICIENT;
      this.currentSpeed = mobileSpeed > speed ? speed : mobileSpeed;
    } else if (opt_speed) {
      this.currentSpeed = opt_speed;
    }
  },

  /**
   * Game initialiser.
   */
  init: function() {
    // Hide the static icon.
    // document.querySelector('.' + Runner.classes.ICON).style.visibility =
    //     'hidden';

    this.adjustDimensions();
    this.setSpeed();

    this.containerEl = document.createElement('div');
    this.containerEl.className = Runner.classes.CONTAINER;

    // Player canvas container.
    this.canvas = createCanvas(this.containerEl, this.dimensions.WIDTH,
        this.dimensions.HEIGHT, Runner.classes.PLAYER);

    this.canvasCtx = this.canvas.getContext('2d');
    this.canvasCtx.fillStyle = '#f7f7f7';
    this.canvasCtx.fill();
    Runner.updateCanvasScaling(this.canvas);

    // Horizon contains clouds, obstacles and the ground.
    this.horizon = new Horizon(this.canvas, this.spriteDef, this.dimensions,
        this.config.GAP_COEFFICIENT);

    // Distance meter
    this.distanceMeter = new DistanceMeter(this.canvas,
          this.spriteDef.TEXT_SPRITE, this.dimensions.WIDTH);

    // Draw t-rex
    this.tRex = new Trex(this.canvas, this.spriteDef.TREX);

    this.outerContainerEl.appendChild(this.containerEl);

    if (IS_MOBILE) {
      this.createTouchController();
    }

    this.startListening();
    this.update();

    window.addEventListener(Runner.events.RESIZE,
        this.debounceResize.bind(this));
  },

  /**
   * Create button handler
   */
  createButtonHandler: function() {
    //event listener for mouse click onto game over buttons
    var handler_builder = function (canvas, runner, type) {
      return function foo(evt) {
        var mousePos = getEventPos(canvas, evt);
        if (isInside(mousePos,GameOverPanel.restartButton)) {
            canvas.removeEventListener(type, foo, false);
            runner.restart();
        }else if (isInside(mousePos,GameOverPanel.skipButton)){
            canvas.removeEventListener(type, foo, false);
            runner.playOutro();
        } else {
        } 
      };
    };


    if (IS_MOBILE) {
      this.canvas.addEventListener(
          Runner.events.TOUCHSTART, 
          handler_builder(this.canvas, this, Runner.events.TOUCHSTART), false);
    } else {
      this.canvas.addEventListener(
        Runner.events.CLICK, 
        handler_builder(this.canvas, this, Runner.events.CLICK), false);
    }

    
  },

  /**
   * Create the touch controller. A div that covers whole screen.
   */
  createTouchController: function() {
    this.touchController = document.createElement('div');
    this.touchController.className = Runner.classes.TOUCH_CONTROLLER;
  },

  /**
   * Debounce the resize event.
   */
  debounceResize: function() {
    if (!this.resizeTimerId_) {
      this.resizeTimerId_ =
          setInterval(this.adjustDimensions.bind(this), 250);
    }
  },

  /**
   * Adjust game space dimensions on resize.
   */
  adjustDimensions: function() {
    clearInterval(this.resizeTimerId_);
    this.resizeTimerId_ = null;

    var boxStyles = window.getComputedStyle(this.outerContainerEl);
    var padding = Number(boxStyles.paddingLeft.substr(0,
        boxStyles.paddingLeft.length - 2));

    this.dimensions.WIDTH = this.outerContainerEl.offsetWidth - padding * 2;

    // Redraw the elements back onto the canvas.
    if (this.canvas) {
      this.canvas.width = this.dimensions.WIDTH;
      this.canvas.height = this.dimensions.HEIGHT;

      Runner.updateCanvasScaling(this.canvas);

      this.distanceMeter.calcXPos(this.dimensions.WIDTH);
      this.clearCanvas();
      this.horizon.update(0, 0, true);
      this.tRex.update(0);

      // Outer container and distance meter.
      if (this.activated || this.crashed || this.paused) {
        this.containerEl.style.width = this.dimensions.WIDTH + 'px';
        this.containerEl.style.height = this.dimensions.HEIGHT + 'px';
        this.distanceMeter.update(0, Math.ceil(this.distanceRan));
        this.stop();
      } else {
        this.tRex.draw(0, 0);
      }

      // Game over panel.
      if (this.crashed && this.gameOverPanel) {
        this.gameOverPanel.updateDimensions(this.dimensions.WIDTH);
        this.gameOverPanel.draw();
      }
    }
  },

  /**
   * Play the game intro.
   * Canvas container width expands out to the full width.
   */
  playIntro: function() {
    if (!this.started && !this.crashed) {
      this.playingIntro = true;
      this.tRex.playingIntro = true;

      // CSS animation definition.
      var keyframes = '@-webkit-keyframes intro { ' +
            'from { width:' + Trex.config.WIDTH + 'px }' +
            'to { width: ' + this.dimensions.WIDTH + 'px }' +
          '}';
      document.styleSheets[0].insertRule(keyframes, 0);

      this.containerEl.addEventListener(Runner.events.ANIM_END,
          this.startGame.bind(this));

      this.containerEl.style.webkitAnimation = 'intro .4s ease-out 1 both';
      this.containerEl.style.width = this.dimensions.WIDTH + 'px';

      if (this.touchController) {
        this.outerContainerEl.appendChild(this.touchController);
      }
      this.activated = true;
      this.started = true;
    } else if (this.crashed) {
      this.restart();
    }
  },

  /**
   * Play the game outro.
   * to be defined ....
   */
  playOutro: function() {
    this.playingOutro = true;

    //this.tRex.playingIntro = true;
    /*
        TODO
    play outro animation
    */

    this.ended = true;
  },


  /**
   * Update the game status to started.
   */
  startGame: function() {
    this.runningTime = 0;
    this.playingIntro = false;
    this.playingOutro = false;
    this.tRex.playingIntro = false;
    this.containerEl.style.webkitAnimation = '';
    this.playCount++;

    // Handle tabbing off the page. Pause the current game.
    document.addEventListener(Runner.events.VISIBILITY,
          this.onVisibilityChange.bind(this));

    window.addEventListener(Runner.events.BLUR,
          this.onVisibilityChange.bind(this));

    window.addEventListener(Runner.events.FOCUS,
          this.onVisibilityChange.bind(this));
  },

  clearCanvas: function() {
    this.canvasCtx.clearRect(0, 0, this.dimensions.WIDTH,
        this.dimensions.HEIGHT);
  },

  /**
   * Update the game frame.
   */
  update: function() {
    this.drawPending = false;

    var now = getTimeStamp();
    var deltaTime = now - (this.time || now);
    this.time = now;

    this.clearCanvas();

    if (this.activated) {

      if (this.tRex.jumping) {
        this.tRex.updateJump(deltaTime);
      }

      this.runningTime += deltaTime;
      var hasObstacles = this.runningTime > this.config.CLEAR_TIME;
      var hasPickups = this.runningTime > this.config.PICKUP_TIME;

      // First jump triggers the intro.
      if (this.tRex.jumpCount == 1 && !this.playingIntro) {
        this.playIntro();
      }

      // The horizon doesn't move until the intro is over.
      if (this.playingIntro) {
        this.horizon.update(0, this.currentSpeed, hasObstacles, hasPickups);
      } else {
        deltaTime = !this.started ? 0 : deltaTime;
        this.horizon.update(deltaTime, this.currentSpeed, hasObstacles, hasPickups);
      }

      // Check for collisions.
      ///remove context to remove collision debug show blablabla its too late to programming
      var collision = hasObstacles &&
          checkForCollision(this.horizon.obstacles[0], this.tRex, this.canvasCtx);

      //check for pickups
      var pickedup = hasPickups &&
      checkForCollision(this.horizon.pickups[0], this.tRex, this.canvasCtx);
      
      if(pickedup){
        //score todo
      }

      if (!collision) {
        this.distanceRan += this.currentSpeed * deltaTime / this.msPerFrame;

        if (this.currentSpeed < this.config.MAX_SPEED) {
          this.currentSpeed += this.config.ACCELERATION;
        }
      } else {
        this.gameOver();
      }

      var playAcheivementSound = this.distanceMeter.update(deltaTime,
          Math.ceil(this.distanceRan));

      if (playAcheivementSound) {
        this.playSound(this.soundFx.SCORE);
      }

     if (this.distanceMeter.getActualDistance(Math.ceil(this.distanceRan)) >= this.distanceTimer && Runner.isRiddle){
        this.riddleOver();
      }
    } else
    {
      //draw static background
      this.horizon = new Horizon(this.canvas, this.spriteDef, this.dimensions,
        this.config.GAP_COEFFICIENT);
    }

    if (!this.crashed) {
      this.tRex.update(deltaTime);
      this.raq();
    }
  },

  /**
   * Event handler.
   */
  handleEvent: function(e) {
    return (function(evtType, events) {
      switch (evtType) {
        case events.KEYDOWN:
        case events.TOUCHSTART:
        case events.MOUSEDOWN:
        case events.GAMEPADCONNECTED:
          this.onKeyDown(e);
          break;
        case events.KEYUP:
        case events.TOUCHEND:
        case events.MOUSEUP:
          this.onKeyUp(e);
          break;
      }
    }.bind(this))(e.type, Runner.events);
  },

  /**
   * Bind relevant key / mouse / touch listeners.
   */
  startListening: function() {
    // Keys.
    document.addEventListener(Runner.events.KEYDOWN, this);
    document.addEventListener(Runner.events.KEYUP, this);

    if (IS_MOBILE) {
      // Mobile only touch devices.
      this.touchController.addEventListener(Runner.events.TOUCHSTART, this);
      this.touchController.addEventListener(Runner.events.TOUCHEND, this);
      this.containerEl.addEventListener(Runner.events.TOUCHSTART, this);
    } else {
      // Mouse.
      document.addEventListener(Runner.events.MOUSEDOWN, this);
      document.addEventListener(Runner.events.MOUSEUP, this);
    }
    window.addEventListener(Runner.events.GAMEPADCONNECTED, this);
    window.setInterval(this.pollGamepads.bind(this), 10);
  },

  /**
   * Convert Gamepad input events to keydown/up events (spacebar)
  */
  pollGamepads: function() {
    var gamepads = navigator.getGamepads();
    var keydown = false;
    for(var i = 0; i < gamepads.length; i++) {
      if (gamepads[i] != undefined) {
        if (gamepads[i].buttons.filter(function(e){return e.pressed == true}).length > 0) {
          keydown = true;
        }
      }
    }
    if (keydown != this.gamepadPreviousKeyDown) {
      this.gamepadPreviousKeyDown = keydown;

      var event = new Event(keydown ? 'keydown' : 'keyup');
      event.keyCode = 32;//keys(Runner.keycodes.JUMP)[0];
      event.which = event.keyCode;
      event.altKey = false;
      event.ctrlKey = true;
      event.shiftKey = false;
      event.metaKey = false;
      document.dispatchEvent(event);
    }
  },

  /**
   * Remove all listeners.
   */
  stopListening: function() {
    document.removeEventListener(Runner.events.KEYDOWN, this);
    document.removeEventListener(Runner.events.KEYUP, this);

    if (IS_MOBILE) {
      this.touchController.removeEventListener(Runner.events.TOUCHSTART, this);
      this.touchController.removeEventListener(Runner.events.TOUCHEND, this);
      this.containerEl.removeEventListener(Runner.events.TOUCHSTART, this);
    } else {
      document.removeEventListener(Runner.events.MOUSEDOWN, this);
      document.removeEventListener(Runner.events.MOUSEUP, this);
    }
  },

  /**
   * Process keydown.
   * @param {Event} e
   */
  onKeyDown: function(e) {
    // Prevent native page scrolling whilst tapping on mobile.
    if (IS_MOBILE) {
      e.preventDefault();
    }

    // if (e.target != this.detailsButton) {
      //KEYCODE JUMP
      if (!this.crashed && (Runner.keycodes.JUMP[e.keyCode] ||
           e.type == Runner.events.TOUCHSTART || e.type == Runner.events.GAMEPADCONNECTED)) {
        if (!this.activated) {
          this.loadSounds();
          this.activated = true;
          // errorPageController.trackEasterEgg();
        }

        if (!this.tRex.jumping && !this.tRex.ducking) {
          this.playSound(this.soundFx.BUTTON_PRESS);
          this.tRex.startJump(this.currentSpeed);
        }
      }

      if (this.crashed && e.type == Runner.events.TOUCHSTART &&
          e.currentTarget == this.containerEl) {
            if(Runner.isRiddle){
              // let button handler to handle it
            } else {
              this.restart();
            }
      }
    // }

    //KEYCODE DUCK
    /*
    if (this.activated && !this.crashed && Runner.keycodes.DUCK[e.keyCode]) {
      e.preventDefault();
      if (this.tRex.jumping) {
        // Speed drop, activated only when jump key is not pressed.
        this.tRex.setSpeedDrop();
      } else if (!this.tRex.jumping && !this.tRex.ducking) {
        // Duck.
        this.tRex.setDuck(true);
      }
    }
    */
  },


  /**
   * Process key up.
   * @param {Event} e
   */
  onKeyUp: function(e) {
    var keyCode = String(e.keyCode);
    var isjumpKey = Runner.keycodes.JUMP[keyCode] ||
       e.type == Runner.events.TOUCHEND ||
       e.type == Runner.events.MOUSEDOWN;

    if (this.isRunning() && isjumpKey) {
      this.tRex.endJump();
    } else if (Runner.keycodes.DUCK[keyCode]) {
      this.tRex.speedDrop = false;
      this.tRex.setDuck(false);
    } else if (this.crashed) { //todo
      // Check that enough time has elapsed before allowing jump key to restart.
      var deltaTime = getTimeStamp() - this.time;

      if (Runner.keycodes.RESTART[keyCode] || this.isLeftClickOnCanvas(e) ||
          (deltaTime >= this.config.GAMEOVER_CLEAR_TIME &&
          Runner.keycodes.JUMP[keyCode])) {
          if(Runner.isRiddle){
            // let button handler to handle it
          } else {
            this.restart();
          }
        
      }
    } else if (this.paused && isjumpKey) {
      // Reset the jump state
      this.tRex.reset();
      this.play();
    }
  },

  /**
   * Returns whether the event was a left click on canvas.
   * On Windows right click is registered as a click.
   * @param {Event} e
   * @return {boolean}
   */
  isLeftClickOnCanvas: function(e) {
    return e.button != null && e.button < 2 &&
        e.type == Runner.events.MOUSEUP && e.target == this.canvas;
  },

  /**
   * RequestAnimationFrame wrapper.
   */
  raq: function() {
    if (!this.drawPending) {
      this.drawPending = true;
      this.raqId = requestAnimationFrame(this.update.bind(this));
    }
  },

  /**
   * Whether the game is running.
   * @return {boolean}
   */
  isRunning: function() {
    return !!this.raqId;
  },

  /**
   * Game over state.
   */
  gameOver: function() {
    this.playSound(this.soundFx.HIT);
    vibrate(200);

    this.stop();
    this.crashed = true;
    this.distanceMeter.acheivement = false;


    this.clearCanvas();
    this.horizon.update(0, 0, true);
    this.tRex.update(0, Trex.status.CRASHED);

    // Game over panel.
    if (!this.gameOverPanel) {
      this.gameOverPanel = new GameOverPanel(this.canvas,
          this.spriteDef.TEXT_SPRITE, this.spriteDef.RESTART, this.spriteDef.SKIP,
          this.dimensions);
    } else {
      this.gameOverPanel.draw();
    }

    if(Runner.isRiddle){
      this.createButtonHandler();
    }

    // Update the high score.
    if (this.distanceRan > this.highestScore) {
      this.highestScore = Math.ceil(this.distanceRan);
      this.distanceMeter.setHighScore(this.highestScore);
    }

    // Reset the time clock.
    this.time = getTimeStamp();
  },

  /**
   * Riddle Over state.
   */
  riddleOver: function() {
    //play sound for ending riddle
    this.playSound(this.soundFx.SCORE);
    vibrate(200);

    this.stop();
    this.crashed = true;
    this.freeze = true;
    this.gameOverPanel = false;
    this.distanceMeter.acheivement = false;

    //todo sprite for winning
    this.clearCanvas();
    this.horizon.update(0, 0, true);
    this.tRex.update(0, Trex.status.WAITING);

    // Update the high score.
    if (this.distanceRan > this.highestScore) {
      this.highestScore = Math.ceil(this.distanceRan);
      this.distanceMeter.setHighScore(this.highestScore);
    }

    // Reset the time clock.
    this.time = getTimeStamp();
    this.playOutro();
  },

  stop: function() {
    this.activated = false;
    this.paused = true;
    cancelAnimationFrame(this.raqId);
    this.raqId = 0;
  },

  play: function() {
    if (!this.crashed) {
      this.activated = true;
      this.paused = false;
      this.tRex.update(0, Trex.status.RUNNING);
      this.time = getTimeStamp();
      this.update();
    }
  },

  restart: function() {
    if (!this.raqId && !this.freeze) {
      this.playCount++;
      this.runningTime = 0;
      this.activated = true;
      this.crashed = false;
      this.distanceRan = 0;
      this.setSpeed(this.config.SPEED);

      this.time = getTimeStamp();
      this.containerEl.classList.remove(Runner.classes.CRASHED);
      this.clearCanvas();
      this.distanceMeter.reset(this.highestScore);
      this.horizon.reset();
      this.tRex.reset();
      this.playSound(this.soundFx.BUTTON_PRESS);

      this.update();
    }
  },

  /**
   * Pause the game if the tab is not in focus.
   */
  onVisibilityChange: function(e) {
    if (document.hidden || document.webkitHidden || e.type == 'blur') {
      this.stop();
    } else if (!this.crashed) {
      this.tRex.reset();
      this.play();
    }
  },

  /**
   * Play a sound.
   * @param {SoundBuffer} soundBuffer
   */
  playSound: function(soundBuffer) {
    if (soundBuffer) {
      var sourceNode = this.audioContext.createBufferSource();
      sourceNode.buffer = soundBuffer;
      sourceNode.connect(this.audioContext.destination);
      sourceNode.start(0);
    }
  }
};


/**
 * Updates the canvas size taking into
 * account the backing store pixel ratio and
 * the device pixel ratio.
 *
 * See article by Paul Lewis:
 * http://www.html5rocks.com/en/tutorials/canvas/hidpi/
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} opt_width
 * @param {number} opt_height
 * @return {boolean} Whether the canvas was scaled.
 */
Runner.updateCanvasScaling = function(canvas, opt_width, opt_height) {
  var context = canvas.getContext('2d');

  // Query the various pixel ratios
  var devicePixelRatio = Math.floor(window.devicePixelRatio) || 1;
  var backingStoreRatio = Math.floor(context.webkitBackingStorePixelRatio) || 1;
  var ratio = devicePixelRatio / backingStoreRatio;

  // Upscale the canvas if the two ratios don't match
  if (devicePixelRatio !== backingStoreRatio) {
    var oldWidth = opt_width || canvas.width;
    var oldHeight = opt_height || canvas.height;

    canvas.width = oldWidth * ratio;
    canvas.height = oldHeight * ratio;

    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';

    // Scale the context to counter the fact that we've manually scaled
    // our canvas element.
    context.scale(ratio, ratio);
    return true;
  } else if (devicePixelRatio == 1) {
    // Reset the canvas width / height. Fixes scaling bug when the page is
    // zoomed and the devicePixelRatio changes accordingly.
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
  }
  return false;
};})();

//start the game
new Runner('.interstitial-wrapper');


