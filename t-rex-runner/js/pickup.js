/**
 * Pickup.
 * @param {HTMLCanvasCtx} canvasCtx
 * @param {Pickup.type} type
 * @param {Object} spritePos Pickup position in sprite.
 * @param {Object} dimensions
 * @param {number} gapCoefficient Mutipler in determining the gap.
 * @param {number} speed
 */
function Pickup(canvasCtx, type, spriteImgPos, dimensions,
    gapCoefficient, speed) {

  this.canvasCtx = canvasCtx;
  this.spritePos = spriteImgPos;
  this.typeConfig = type;
  this.gapCoefficient = gapCoefficient;
  this.dimensions = dimensions;
  this.size = 1;
  this.remove = false;
  this.xPos = 0;
  this.yPos = 0;
  this.width = 0;
  this.collisionBoxes = [];
  this.gap = 0;
  this.speedOffset = 0;

  // For animated pickups.
  this.currentFrame = 0;
  this.timer = 0;

  this.init(speed);
  }

  Pickup.prototype = {
    /**
     * Initialise the DOM for the pickup.
     * @param {number} speed
     */
    init: function(speed) {
      this.cloneCollisionBoxes();

      // Only allow sizing if we're at the right speed.
      if (this.size > 1 && this.typeConfig.multipleSpeed > speed) {
        this.size = 1;
      }
  
      this.width = this.typeConfig.width * this.size;
      this.xPos = this.dimensions.WIDTH - this.width;
  
      // Check if pickup can be positioned at various heights.
      if (Array.isArray(this.typeConfig.yPos))  {
        var yPosConfig = IS_MOBILE ? this.typeConfig.yPosMobile :
            this.typeConfig.yPos;
        this.yPos = yPosConfig[getRandomNum(0, yPosConfig.length - 1)];
      } else {
        this.yPos = this.typeConfig.yPos;
      }
  
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
      var sourceX = (sourceWidth * this.size) * (0.5 * (this.size - 1)) +
          this.spritePos.x;
  
      // Animation frames.
      if (this.currentFrame > 0) {
        sourceX += sourceWidth * this.currentFrame;
      }
  
      this.canvasCtx.drawImage(Runner.imageSprite,
        sourceX, this.spritePos.y,
        sourceWidth * this.size, sourceHeight,
        this.xPos, this.yPos,
        this.typeConfig.width * this.size, this.typeConfig.height);
    },
  
    /**
     * pickup frame update.
     * @param {number} deltaTime
     * @param {number} speed
     */
    update: function(deltaTime, speed) {
      if (!this.remove) {
        //if (this.typeConfig.speedOffset) {
        //  speed += this.speedOffset;
        //}
        this.xPos -= Math.floor((speed * FPS / 1000) * deltaTime);
  
        // Update animation frame
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
      var maxGap = Math.round(minGap * Pickup.MAX_GAP_COEFFICIENT);
      return getRandomNum(minGap, maxGap);
    },
  
    /**
     * Check if pickup is visible.
     * @return {boolean} Whether the pickup is in the game area.
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
  },

  collect: function(){
    this.remove = true;
  }
};
  
  /**
   * pickup definitions.
   * minGap: minimum pixel space betweeen pickups.
   * multipleSpeed: Speed at which multiples are allowed.
   * speedOffset: speed faster / slower than the horizon.
   * minSpeed: Minimum speed which the pickup can make an appearance.
   */
Pickup.types = [
  {
    type: 'COIN',
    width: 32,
    height: 32,
    yPos: 25,
    multipleSpeed: 4,
    minGap: 120,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(0, 0, 30, 30)
    ],
    //numFrames: 1,
    //frameRate: 1000/6,
    score: 375.4073879913347 * 5 // (the first number is 10 points)
  }
];