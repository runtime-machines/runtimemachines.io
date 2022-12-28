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
  this.yDir = 1;
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
Obstacle.LAST_OBSTACLE_INDEX = 3;


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

    this.yPos = this.typeConfig.yPos - Runner.config.BOTTOM_PAD;

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

      if(this.typeConfig.yOff){

        var increment = (this.typeConfig.ySpeed * FPS / 1000) * deltaTime;
        //TODO IMPLEMET USING SIN FUNCTION
        if(this.yPos <= this.typeConfig.yPos - this.typeConfig.yOff){
          //go down
          this.yDir = -1;
        } else if(this.yPos >= this.typeConfig.yPos + this.typeConfig.yOff){
          //go up
          this.yDir = 1;
        }
        
        this.yPos -= increment * this.yDir;
      }

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
    yPos: 104,
    multipleSpeed: 4,
    minGap: 100,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(0, 5, 13, 32),
      new CollisionBox(19, 0, 12, 38)
    ]
  },
  {
    type: 'POTION',
    width: 32,
    height: 40,
    yPos: 104,
    multipleSpeed: 4,
    minGap: 100,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(0, 40, 30, -20),
      new CollisionBox(11, 4, 7, 14)
    ]
  },
  {
    type: 'PC',
    width: 38.5,
    height: 40,
    yPos: 105,
    multipleSpeed: 4,
    minGap: 100,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(0, 0, 37, 38)
    ],
    numFrames: 5,
    frameRate: 1000/8//,
    //speedOffset: 1
  },
  {
    type: 'COG',
    width: 78,
    height: 40,
    yPos: 105,
    multipleSpeed: 7,
    minSpeed: 0,
    minGap: 150,
    yOff: 7,
    ySpeed: 0.3,
    collisionBoxes: [
      new CollisionBox(0, 7, 5, 17),
      new CollisionBox(8, 0, 68, 10)
    ]
  }
];