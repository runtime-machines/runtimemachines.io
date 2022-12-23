/**
 * Horizon Line.
 * Consists of two connecting lines. Randomly assigns a flat / bumpy horizon.
 * @param {HTMLCanvasElement} canvas
 * @param {Object} spritePos Horizon position in sprite.
 * @constructor
 */
 function HorizonLine(canvas, spritePos) {
    this.spritePos = spritePos;
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.sourceDimensions = {};
    this.dimensions = HorizonLine.dimensions;
    this.xPos = [];


    //background layers
    this.xPosMid = [];
    this.xPosBack = [];
    this.yPos = 0;
    this.bumpThreshold = 1;
  
    this.setSourceDimensions();
  };
  
  
  /**
   * Horizon line dimensions.
   * @enum {number}
   */
  HorizonLine.dimensions = {
    WIDTH: 600,
    HEIGHT: 12,
    BG_HEIGHT: 300,
    YPOS: 127
  };
  
  
  HorizonLine.prototype = {
    /**
     * Set the source dimensions of the horizon line.
     */
    setSourceDimensions: function() {
  
      for (var dimension in HorizonLine.dimensions) {
        if (IS_HIDPI) {
          if (dimension != 'YPOS') {
            this.sourceDimensions[dimension] =
                HorizonLine.dimensions[dimension] * 2;
          }
        } else {
          this.sourceDimensions[dimension] =
              HorizonLine.dimensions[dimension];
        }
        this.dimensions[dimension] = HorizonLine.dimensions[dimension];
      }
  
      this.xPos = [0, HorizonLine.dimensions.WIDTH];
      this.xPosMid = [0, HorizonLine.dimensions.WIDTH];
      this.xPosBack = [0, HorizonLine.dimensions.WIDTH];
      this.yPos = HorizonLine.dimensions.YPOS;
    },
  
    /**
     * Return the crop x position of a type.
     */
    getRandomType: function() {
      return Math.random() > this.bumpThreshold ? this.dimensions.WIDTH : 0;
    },

    drawBG: function(i, xPos, sourceXPos){
      var yoff = 6 - Runner.config.BOTTOM_PAD;
      this.canvasCtx.drawImage(Runner.background[i], 0,
        0,
        this.sourceDimensions.WIDTH, this.sourceDimensions.BG_HEIGHT,
        xPos[0], 0+yoff,
        this.dimensions.WIDTH, this.dimensions.BG_HEIGHT);

      this.canvasCtx.drawImage(Runner.background[i], 0,
        0,
        this.sourceDimensions.WIDTH, this.sourceDimensions.BG_HEIGHT,
        xPos[1], 0+yoff,
        this.dimensions.WIDTH, this.dimensions.BG_HEIGHT);
    },

    drawBGBack: function(){
      this.drawBG(0, this.xPosBack);
    },

    drawBGMid: function(){
      this.drawBG(1, this.xPosMid);
    },

    drawBGFront: function(){
      this.drawBG(2, this.xPos);
    },
  
    /**
     * Draw the horizon line.
     */
    drawLine: function() {
      var yoff = 15 - Runner.config.BOTTOM_PAD;
      this.canvasCtx.drawImage(Runner.imageSprite, this.spritePos.x,
          this.spritePos.y,
          this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
          this.xPos[0], this.yPos+yoff,
          this.dimensions.WIDTH, this.dimensions.HEIGHT);
  
      this.canvasCtx.drawImage(Runner.imageSprite, this.spritePos.x,
          this.spritePos.y,
          this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
          this.xPos[1], this.yPos+yoff,
          this.dimensions.WIDTH, this.dimensions.HEIGHT);  
    },
  
    /**
     * Update the x position of an indivdual piece of the line.
     * @param {number} pos Line position.
     * @param {number} increment
     */
    updateXPos: function(deltaTime, speed, coefficient, xPos) {

      var increment = Math.floor(speed * (FPS / 1000) * deltaTime * coefficient);
      var pos;

      if (xPos[0] <= 0) {
        pos = 0;
      } else {
        pos = 1;
      }

      var line1 = pos;
      var line2 = pos == 0 ? 1 : 0;
  
      xPos[line1] -= increment;
      xPos[line2] = xPos[line1] + this.dimensions.WIDTH;
  
      if (xPos[line1] <= -this.dimensions.WIDTH) {
        xPos[line1] += this.dimensions.WIDTH * 2;
        xPos[line2] = xPos[line1] - this.dimensions.WIDTH;
      }
    },
  
    /**
     * Update the horizon line.
     * @param {number} deltaTime
     * @param {number} speed
     */
    update: function(deltaTime, speed) {
      this.updateXPos(deltaTime, speed, 1, this.xPos);
      this.updateXPos(deltaTime, speed, 1, this.xPosMid);
      this.updateXPos(deltaTime, speed, 0.9, this.xPosBack);
    },
  
    /**
     * Reset horizon to the starting position.
     */
    reset: function() {
      this.xPos[0] = 0;
      this.xPos[1] = HorizonLine.dimensions.WIDTH;
      this.xPosMid[0] = 0;
      this.xPosMid[1] = HorizonLine.dimensions.WIDTH;
      this.xPosBack[0] = 0;
      this.xPosBack[1] = HorizonLine.dimensions.WIDTH;
    }
  };