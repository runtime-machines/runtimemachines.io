/**
 * Obstacle.
 * @param {HTMLCanvasCtx} canvasCtx
 * @param {Obstacle.type} type
 * @param {Object} spritePos Obstacle position in sprite.
 * @param {Object} dimensions
 * @param {number} gapCoefficient Mutipler in determining the gap.
 * @param {number} speed
 */
 function Obstacle(canvasCtx, type, spriteImgPos, dimensions,
    gapCoefficient, speed) {

  this.canvasCtx = canvasCtx;
  this.spritePos = spriteImgPos;
  this.typeConfig = type;
  this.gapCoefficient = gapCoefficient;
  this.size = 1;
  this.dimensions = dimensions;
  this.remove = false;
  this.xPos = 0;
  this.yPos = 0;
  this.width = 0;
  this.collisionBoxes = [];
  this.gap = 0;
  this.speedOffset = 0;

  // For animated obstacles.
  this.currentFrame = 0;
  this.timer = 0;

  this.init(speed);
};

/**
 * Coefficient for calculating the maximum gap.
 * @const
 */
Obstacle.MAX_GAP_COEFFICIENT = 1.5;


Obstacle.prototype = {
  /**
   * Initialise the DOM for the obstacle.
   * @param {number} speed
   */
  init: function(speed) {
    this.cloneCollisionBoxes();

    this.width = this.typeConfig.width;
    this.xPos = this.dimensions.WIDTH - this.width;

    // Check if obstacle can be positioned at various heights.

    this.yPos = this.typeConfig.yPos;

    this.draw();

    this.gap = this.getGap(this.gapCoefficient, speed);
  },

  /**
   * Draw and crop based on size.
   */
  draw: function() {
    var sourceWidth = this.typeConfig.width;
    var sourceHeight = this.typeConfig.height;

    if (IS_HIDPI) {
      sourceWidth = sourceWidth * 2;
      sourceHeight = sourceHeight * 2;
    }

    // X position in sprite.
    var sourceX = this.spritePos.x;

    // Animation frames.
    if (this.currentFrame > 0) {
      sourceX += sourceWidth * this.currentFrame;
    }

    this.canvasCtx.drawImage(Runner.obstacleSprites,
      sourceX, this.spritePos.y,
      sourceWidth, sourceHeight,
      this.xPos, this.yPos,
      this.typeConfig.width, this.typeConfig.height);
  },

  /**
   * Obstacle frame update.
   * @param {number} deltaTime
   * @param {number} speed
   */
  update: function(deltaTime, speed) {
    if (!this.remove) {
      if (this.typeConfig.speedOffset) {
        speed += this.speedOffset;
      }
      this.xPos -= Math.floor((speed * FPS / 1000) * deltaTime);

      // Update frame
      if (this.typeConfig.numFrames) {
        this.timer += deltaTime;
        if (this.timer >= this.typeConfig.frameRate) {
          this.currentFrame =
              this.currentFrame == this.typeConfig.numFrames - 1 ?
              0 : this.currentFrame + 1;
          this.timer = 0;
        }
      }
      this.draw();

      if (!this.isVisible()) {
        this.remove = true;
      }
    }
  },

  /**
   * Calculate a random gap size.
   * - Minimum gap gets wider as speed increses
   * @param {number} gapCoefficient
   * @param {number} speed
   * @return {number} The gap size.
   */
  getGap: function(gapCoefficient, speed) {
    var minGap = Math.round(this.width * speed +
          this.typeConfig.minGap * gapCoefficient);
    var maxGap = Math.round(minGap * Obstacle.MAX_GAP_COEFFICIENT);
    return getRandomNum(minGap, maxGap);
  },

  /**
   * Check if obstacle is visible.
   * @return {boolean} Whether the obstacle is in the game area.
   */
  isVisible: function() {
    return this.xPos + this.width > 0;
  },

  /**
   * Make a copy of the collision boxes, since these will change based on
   * obstacle type and size.
   */
  cloneCollisionBoxes: function() {
    var collisionBoxes = this.typeConfig.collisionBoxes;

    for (var i = collisionBoxes.length - 1; i >= 0; i--) {
      this.collisionBoxes[i] = new CollisionBox(collisionBoxes[i].x,
          collisionBoxes[i].y, collisionBoxes[i].width,
          collisionBoxes[i].height);
    }
  }
};


/**
 * Obstacle definitions.
 * minGap: minimum pixel space betweeen obstacles.
 * multipleSpeed: Speed at which multiples are allowed.
 * speedOffset: speed faster / slower than the horizon.
 * minSpeed: Minimum speed which the obstacle can make an appearance.
 */
Obstacle.types = [
  {
    type: 'DOUBLE_POTION',
    width: 40,
    height: 40,
    yPos: 99,
    multipleSpeed: 4,
    minGap: 120,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(0, 7, 5, 27), //TODO: change this
      new CollisionBox(4, 0, 6, 34),
      new CollisionBox(10, 4, 7, 14)
    ]
  },
  {
    type: 'POTION',
    width: 40,
    height: 40,
    yPos: 99,
    multipleSpeed: 4,
    minGap: 120,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(0, 7, 5, 27), //TODO: change this
      new CollisionBox(4, 0, 6, 34),
      new CollisionBox(10, 4, 7, 14)
    ]
  },
  {
    type: 'PC',
    width: 40,
    height: 40,
    yPos: 100,
    multipleSpeed: 4,
    minGap: 120,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(0, 7, 5, 27), //TODO: change this
      new CollisionBox(4, 0, 6, 34),
      new CollisionBox(10, 4, 7, 14)
    ]//,
    //numFrames: 1,
    //frameRate: 1000/6//,
    //speedOffset: 1
  },
  {
    type: 'COG', //  this was petro //TODO: CHANGE THIS
    width: 80,
    height: 40,
    yPos: 95, // Variable height.
    //yPosMobile: [ 100, 50 ], // Variable height mobile.
    multipleSpeed: 7,
    minSpeed: 0, //this was 8.5
    minGap: 150,
    collisionBoxes: [
      new CollisionBox(40, 0, 10, 40),
      new CollisionBox(30, 0, 10, 40),
      new CollisionBox(15, 20, 50, 10),
      new CollisionBox(10, 30, 60, 10)
    ]//,
    //numFrames: 1,
    //frameRate: 1000/6//,
    //speedOffset: 1
  }
];