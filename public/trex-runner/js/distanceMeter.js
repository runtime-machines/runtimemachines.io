
/**
 * Handles displaying the distance meter.
 * @param {!HTMLCanvasElement} canvas
 * @param {Object} spritePos Image position in sprite.
 * @param {number} canvasWidth
 * @constructor
 */
 function DistanceMeter(canvas, spritePos, canvasWidth) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.image = Runner.imageSprite;
    this.spritePos = spritePos;
    this.x = 0;
    this.y = 5;
  
    this.currentDistance = 0;
    this.maxScore = 0;
    this.highScore = 0;
    this.container = null;
  
    this.digits = [];
    this.acheivement = false;
    this.defaultString = '';
    this.flashTimer = 0;
    this.flashIterations = 0;
  
    this.config = DistanceMeter.config;
    this.maxScoreUnits = this.config.MAX_DISTANCE_UNITS;
    this.init(canvasWidth);
  };
  
  
  /**
   * @enum {number}
   */
  DistanceMeter.dimensions = {
    WIDTH: 10,
    HEIGHT: 13,
    DEST_WIDTH: 11,
    TEXT_WIDTH: 334,
    TEXT_HEIGHT: 20,
    DEST_TEXT_WIDTH: 151,
    DEST_TEXT_HEIGHT: 9,
  };
  
  
  /**
   * Y positioning of the digits in the sprite sheet.
   * X position is always 0.
   * @type {Array<number>}
   */
  DistanceMeter.yPos = [0, 13, 27, 40, 53, 67, 80, 93, 107, 120];

  DistanceMeter.ObstacleTextPos = [ 479, 40 ];
  
  
  /**
   * Distance meter config.
   * @enum {number}
   */
  DistanceMeter.config = {
    // Number of digits.
    MAX_DISTANCE_UNITS: 5,
  
    // Distance that causes achievement animation.
    ACHIEVEMENT_DISTANCE: 100,
  
    // Used for conversion from pixel distance to a scaled unit.
    COEFFICIENT: 0.025,
  
    // Flash duration in milliseconds.
    FLASH_DURATION: 1000 / 4,
  
    // Flash iterations for achievement animation.
    FLASH_ITERATIONS: 3
  };
  
  
  DistanceMeter.prototype = {
    /**
     * Initialise the distance meter to '00000'.
     * @param {number} width Canvas width in px.
     */
    init: function(width) {
      var maxDistanceStr = '';
  
      this.calcXPos(width);
      this.maxScore = this.maxScoreUnits;
      for (var i = 0; i < this.maxScoreUnits; i++) {
        this.draw(i, 0);
        this.defaultString += '0';
        maxDistanceStr += '9';
      }
  
      this.maxScore = parseInt(maxDistanceStr);
    },
  
    /**
     * Calculate the xPos in the canvas.
     * @param {number} canvasWidth
     */
    calcXPos: function(canvasWidth) {
      this.x = canvasWidth - (DistanceMeter.dimensions.DEST_WIDTH *
          (this.maxScoreUnits + 1));
    },

    drawObstaclesText: function(){
      // Obstacle text.
      var textSourceX = DistanceMeter.ObstacleTextPos[0];
      var textSourceY = DistanceMeter.ObstacleTextPos[1];

      var textSourceWidth = DistanceMeter.dimensions.TEXT_WIDTH;
      var textSourceHeight = DistanceMeter.dimensions.TEXT_HEIGHT;

      var textTargetWidth = DistanceMeter.dimensions.DEST_TEXT_WIDTH;
      var textTargetHeight = DistanceMeter.dimensions.DEST_TEXT_HEIGHT;

      var textTargetX = 10;
      var textTargetY = 11.5;

      if (IS_HIDPI) {
        textSourceY *= 2;
        textSourceX *= 2;
      } else { //FIXME:
        textSourceX = DistanceMeter.ObstacleTextPos[0];
        textSourceY = DistanceMeter.ObstacleTextPos[1]-1.5;
        textSourceWidth = DistanceMeter.dimensions.TEXT_WIDTH-5;
        textSourceHeight = DistanceMeter.dimensions.TEXT_HEIGHT-7;
        textTargetWidth = DistanceMeter.dimensions.DEST_TEXT_WIDTH*2;
        textTargetHeight = DistanceMeter.dimensions.DEST_TEXT_HEIGHT+5;
        textTargetY = 9.5;
      }

      this.canvasCtx.drawImage(Runner.imageSprite,
        textSourceX, textSourceY, textSourceWidth, textSourceHeight,
        textTargetX, textTargetY, textTargetWidth, textTargetHeight);
    },
  
    /**
     * Draw a digit to canvas.
     * @param {number} digitPos Position of the digit.
     * @param {number} value Digit value 0-9.
     * @param {boolean} opt_highScore Whether drawing the high score.
     * @param {boolean} opt_obstacleLeft Whether drawing how many obstacles are left.
     */
    draw: function(digitPos, value, opt_highScore, opt_obstacleLeft) {
      var offset = -1
      var sourceWidth = DistanceMeter.dimensions.WIDTH + offset;
      var sourceHeight = DistanceMeter.dimensions.HEIGHT;
      var sourceX = DistanceMeter.dimensions.WIDTH * value;
      var sourceY = 0;
  
      var targetX = digitPos * DistanceMeter.dimensions.DEST_WIDTH;
      var targetY = this.y;
      var targetWidth = DistanceMeter.dimensions.WIDTH;
      var targetHeight = DistanceMeter.dimensions.HEIGHT;
  
      // For high DPI we 2x source values.
      if (IS_HIDPI) {
        sourceWidth *= 2;
        sourceHeight *= 2;
        sourceX *= 2;
      }
  
      sourceX += this.spritePos.x;
      sourceY += this.spritePos.y;
  
      this.canvasCtx.save();
  
      if (opt_highScore) {
        // Left of the current score.
        var highScoreX = this.x - (this.maxScoreUnits * 2) *
            DistanceMeter.dimensions.WIDTH;
        this.canvasCtx.translate(highScoreX, this.y);
      } else if(opt_obstacleLeft){
        //draw obstacle text and how many are left
        this.drawObstaclesText();
        var obstaclesLeftX = 10 + 11 + DistanceMeter.dimensions.DEST_TEXT_WIDTH;
        this.canvasCtx.translate(obstaclesLeftX, this.y);
      } else {
        this.canvasCtx.translate(this.x, this.y);
      }
  
      this.canvasCtx.drawImage(this.image, sourceX, sourceY,
          sourceWidth, sourceHeight,
          targetX, targetY,
          targetWidth, targetHeight
        );
  
      this.canvasCtx.restore();
    },
  
    /**
     * Covert pixel distance to a 'real' distance.
     * @param {number} distance Pixel distance ran.
     * @return {number} The 'real' distance ran.
     */
    getActualDistance: function(distance) {
      return distance ? Math.round(distance * this.config.COEFFICIENT) : 0;
    },
  
    /**
     * Update the distance meter.
     * @param {number} distance
     * @param {number} deltaTime
     * @param {number} obstaclesLeft, optional
     * @return {boolean} Whether the acheivement sound fx should be played.
     */
    update: function(deltaTime, distance, obstalcesLeft) {
      var paint = true;
      var playSound = false;
  
      if (!this.acheivement) {
        distance = this.getActualDistance(distance);
  
        // Score has gone beyond the initial digit count.
        if (distance > this.maxScore && this.maxScoreUnits ==
          this.config.MAX_DISTANCE_UNITS) {
          this.maxScoreUnits++;
          this.maxScore = parseInt(this.maxScore + '9');
        } else {
          this.distance = 0;
        }
  
        if (distance > 0) {
          // Acheivement unlocked
          if (distance % this.config.ACHIEVEMENT_DISTANCE == 0) {
            // Flash score and play sound.
            this.acheivement = true;
            this.flashTimer = 0;
            playSound = true;
          }
  
          // Create a string representation of the distance with leading 0.
          var distanceStr = (this.defaultString +
              distance).substr(-this.maxScoreUnits);
          this.digits = distanceStr.split('');
        } else {
          this.digits = this.defaultString.split('');
        }
      } else {
        // Control flashing of the score on reaching acheivement.
        if (this.flashIterations <= this.config.FLASH_ITERATIONS) {
          this.flashTimer += deltaTime;
  
          if (this.flashTimer < this.config.FLASH_DURATION) {
            paint = false;
          } else if (this.flashTimer >
              this.config.FLASH_DURATION * 2) {
            this.flashTimer = 0;
            this.flashIterations++;
          }
        } else {
          this.acheivement = false;
          this.flashIterations = 0;
          this.flashTimer = 0;
        }
      }

      if(!Riddle.ON){ //if riddle is ON don't show distance ran
  
      // Draw the digits if not flashing.
      if (paint) {
        for (var i = this.digits.length - 1; i >= 0; i--) {
          this.draw(i, parseInt(this.digits[i]));
        }
      }
  
      this.drawHighScore();
      
      }
      if(obstalcesLeft){
        this.drawObstaclesLeft(obstalcesLeft);
      }
  
      return playSound;
    },

    /**
     * 
     * @param {number} n, how many obstacle are left [0-9]
     */
    drawObstaclesLeft: function(n)
    {
      this.canvasCtx.save();
      this.draw(0, parseInt(n, 10), false, true);
      this.canvasCtx.restore();
    },
  
    /**
     * Draw the high score.
     */
    drawHighScore: function() {
      this.canvasCtx.save();
      this.canvasCtx.globalAlpha = .8;
      for (var i = this.highScore.length - 1; i >= 0; i--) {
        this.draw(i, parseInt(this.highScore[i], 10), true);
      }
      this.canvasCtx.restore();
    },
  
    /**
     * Set the highscore as a array string.
     * Position of char in the sprite: H - 10, I - 11.
     * @param {number} distance Distance ran in pixels.
     */
    setHighScore: function(distance) {
      distance = this.getActualDistance(distance);
      var highScoreStr = (this.defaultString +
          distance).substr(-this.maxScoreUnits);
  
      this.highScore = ['10', '11', ''].concat(highScoreStr.split(''));
    },
  
    /**
     * Reset the distance meter back to '00000'.
     */
    reset: function() {
      this.update(0);
      this.acheivement = false;
    }
  };