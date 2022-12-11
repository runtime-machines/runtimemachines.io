/**
 * Game over panel.
 * @param {!HTMLCanvasElement} canvas
 * @param {Object} textImgPos
 * @param {Object} restartImgPos
 * @param {!Object} dimensions Canvas dimensions.
 * @constructor
 */
 function GameOverPanel(canvas, textImgPos, restartImgPos, skipImgPos, dimensions) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.canvasDimensions = dimensions;
    this.textImgPos = textImgPos;
    this.restartImgPos = restartImgPos;
    this.skipImgPos = skipImgPos;
    this.draw();
  };
  
  
  /**
   * Dimensions used in the panel.
   * @enum {number}
   */
  GameOverPanel.dimensions = {
    TEXT_X: 0,
    TEXT_Y: 13,
    TEXT_WIDTH: 191,
    TEXT_HEIGHT: 11,
    RESTART_WIDTH: 36,
    RESTART_HEIGHT: 32,
    SKIP_WIDTH: 36,
    SKIP_HEIGHT: 32
  };

  /*
  *
  * restart button on the screen
  * 
  * x
  * y
  * width
  * height
  * 
  */
  GameOverPanel.restartButton = {}

  /*
  *
  * skip button on the screen
  * 
  * x
  * y
  * width
  * height
  * 
  */
  GameOverPanel.skipButton = {}
  
  GameOverPanel.prototype = {
    /**
     * Update the panel dimensions.
     * @param {number} width New canvas width.
     * @param {number} opt_height Optional new canvas height.
     */
    updateDimensions: function(width, opt_height) {
      this.canvasDimensions.WIDTH = width;
      if (opt_height) {
        this.canvasDimensions.HEIGHT = opt_height;
      }
    },
  
    /**
     * Draw the panel.
     */
    draw: function() {
      var dimensions = GameOverPanel.dimensions;
  
      var centerX = this.canvasDimensions.WIDTH / 2;

      var button_off = 0;
      if(Runner.isRiddle)
      {
        button_off = 40;
      }
  
      // Game over text.
      var textSourceX = dimensions.TEXT_X;
      var textSourceY = dimensions.TEXT_Y;
      var textSourceWidth = dimensions.TEXT_WIDTH;
      var textSourceHeight = dimensions.TEXT_HEIGHT;
  
      var textTargetX = Math.round(centerX - (dimensions.TEXT_WIDTH / 2));
      var textTargetY = Math.round((this.canvasDimensions.HEIGHT - 25) / 3);
      var textTargetWidth = dimensions.TEXT_WIDTH;
      var textTargetHeight = dimensions.TEXT_HEIGHT;
  
      var restartSourceWidth = dimensions.RESTART_WIDTH;
      var restartSourceHeight = dimensions.RESTART_HEIGHT;
      var restartTargetX = centerX - (dimensions.RESTART_WIDTH / 2) - button_off;
      var restartTargetY = this.canvasDimensions.HEIGHT / 2;

      var skipSourceWidth = dimensions.SKIP_WIDTH;
      var skipSourceHeight = dimensions.SKIP_HEIGHT;
      var skipTargetX = centerX - (dimensions.SKIP_WIDTH / 2) + button_off;
      var skipTargetY = this.canvasDimensions.HEIGHT / 2;
  
      if (IS_HIDPI) {
        textSourceY *= 2;
        textSourceX *= 2;
        textSourceWidth *= 2;
        textSourceHeight *= 2;
        restartSourceWidth *= 2;
        restartSourceHeight *= 2;
        skipSourceWidth *= 2;
        skipSourceHeight *= 2;
      }
  
      textSourceX += this.textImgPos.x;
      textSourceY += this.textImgPos.y;
  
      // Game over text from sprite.
      this.canvasCtx.drawImage(Runner.imageSprite,
          textSourceX, textSourceY, textSourceWidth, textSourceHeight,
          textTargetX, textTargetY, textTargetWidth, textTargetHeight);
  
      // Restart button.
      this.canvasCtx.drawImage(Runner.imageSprite,
          this.restartImgPos.x, this.restartImgPos.y,
          restartSourceWidth, restartSourceHeight,
          restartTargetX, restartTargetY, dimensions.RESTART_WIDTH,
          dimensions.RESTART_HEIGHT);

      GameOverPanel.restartButton = {x: restartTargetX, y: restartTargetY,  width: dimensions.RESTART_WIDTH, height: dimensions.RESTART_HEIGHT};

      // skip button.
      if(Runner.isRiddle){
        this.canvasCtx.drawImage(Runner.imageSprite,
          this.skipImgPos.x, this.skipImgPos.y,
          restartSourceWidth, skipSourceHeight,
          skipTargetX, skipTargetY, dimensions.SKIP_WIDTH,
          dimensions.SKIP_HEIGHT);
          GameOverPanel.skipButton = {x: skipTargetX, y: skipTargetY, width: dimensions.SKIP_WIDTH, height: dimensions.SKIP_HEIGHT};
      }
    }
  };