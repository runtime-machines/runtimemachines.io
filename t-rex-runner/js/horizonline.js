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
    this.sourceXPos = [this.spritePos.x, this.spritePos.x +
        this.dimensions.WIDTH];
    this.xPos = [];


    //background layers
    this.xPosMid = [];
    this.sourceXPosMid = [this.spritePos.x, this.spritePos.x +
      this.dimensions.WIDTH];
    this.xPosBack = [];
    this.sourceXPosBack = [this.spritePos.x, this.spritePos.x +
      this.dimensions.WIDTH];

    this.yPos = 0;
    this.bumpThreshold = 0.5;
  
    this.setSourceDimensions();
    this.draw();
  };
  
  
  /**
   * Horizon line dimensions.
   * @enum {number}
   */
  HorizonLine.dimensions = {
    WIDTH: 600,
    HEIGHT: 12,
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

    drawBackGroundLayer: function(i, xPos, sourceXPos){

      var off = 100;
      var soff = 5;

      this.canvasCtx.drawImage(Runner.background[i], sourceXPos[0]+soff,
        10,
        ( this.sourceDimensions.WIDTH /2 )+off, 200,
        xPos[0], 0,
        this.dimensions.WIDTH, 150);

      this.canvasCtx.drawImage(Runner.background[i], sourceXPos[1]+soff,
        10,
        (this.sourceDimensions.WIDTH / 2) +off, 200,
        xPos[1], 0,
        this.dimensions.WIDTH, 150);
    },

    drawBackground: function() {
      //back
      this.drawBackGroundLayer(0, this.xPosBack, this.sourceXPosBack);
      //middle
      this.drawBackGroundLayer(1, this.xPosMid, this.sourceXPosMid);
      //front
      this.drawBackGroundLayer(2, this.xPos, this.sourceXPos);
    },
  
    /**
     * Draw the horizon line.
     */
    draw: function() {

      this.drawBackground();

      this.canvasCtx.drawImage(Runner.imageSprite, this.sourceXPos[0],
          this.spritePos.y,
          this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
          this.xPos[0], this.yPos+5,
          this.dimensions.WIDTH, this.dimensions.HEIGHT);
  
      this.canvasCtx.drawImage(Runner.imageSprite, this.sourceXPos[1],
          this.spritePos.y,
          this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
          this.xPos[1], this.yPos+5,
          this.dimensions.WIDTH, this.dimensions.HEIGHT);  
    },
  
    /**
     * Update the x position of an indivdual piece of the line.
     * @param {number} pos Line position.
     * @param {number} increment
     */
    updateXPos: function(deltaTime, speed, coefficient, xPos, sourceXPos, spriteXPos) {

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
        sourceXPos[line1] = this.getRandomType() + spriteXPos;
      }
    },
  
    /**
     * Update the horizon line.
     * @param {number} deltaTime
     * @param {number} speed
     */
    update: function(deltaTime, speed) {

      this.updateXPos(deltaTime, speed, 1, this.xPos, this.sourceXPos, this.spritePos.x);
      this.updateXPos(deltaTime, speed, 0.4, this.xPosMid, this.sourceXPosMid, this.spritePos.x);
      this.updateXPos(deltaTime, speed, 0.2, this.xPosBack, this.sourceXPosBack, this.spritePos.x);

      this.draw();
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