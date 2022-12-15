function WinPanel(canvas, textImgPos, confettiPos, dimensions) {
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.canvasDimensions = dimensions;
    this.textImgPos = textImgPos;
    this.confettiPos = confettiPos;

    this.timer = 0;
    this.currentFrame = 0;

    this.draw();
  };
  
  
  /**
   * Dimensions used in the panel.
   * @enum {number}
   */
WinPanel.dimensions = {
    TEXT_X: 0,
    TEXT_Y: 0,
    TEXT_WIDTH: 191,
    TEXT_HEIGHT: 11,
  };

  WinPanel.config = {
      type: "CONFETTI",
      width: 289/2,
      height: 87/2,
      frameRate: 1000/6,
      numFrames: 4,
  },

  WinPanel.prototype = {
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

    update: function(deltaTime){

      //draw win text
      this.draw();

      //update win animation
      this.timer += deltaTime;
      if (this.timer >= WinPanel.config.frameRate) {
        this.currentFrame =
            this.currentFrame == WinPanel.config.numFrames - 1 ?
            0 : this.currentFrame + 1;
        this.timer = 0;
      }

      //draw confetti
      var sourceWidth = WinPanel.config.width;
      var sourceHeight = WinPanel.config.height;
      var sourceX = this.confettiPos.x;
      var targetX = 0;
      var targetY = -10;

      if (IS_HIDPI) {
        sourceWidth = sourceWidth * 2;
        sourceHeight = sourceHeight * 2;
      }

      // Animation frames.
      if (this.currentFrame > 0) {
        sourceX += sourceWidth * this.currentFrame;
      }

      this.canvasCtx.drawImage(Runner.imageSprite,
        sourceX, this.confettiPos.y,
        sourceWidth, sourceHeight,
        targetX, targetY,
        Runner.defaultDimensions.WIDTH,
        Runner.defaultDimensions.HEIGHT );
    },
  
    /**
     * Draw the panel.
     */
    draw: function() {
      var dimensions = WinPanel.dimensions;

      var centerX = this.canvasDimensions.WIDTH / 2;

      // Win text
      var textSourceX = dimensions.TEXT_X;
      var textSourceY = dimensions.TEXT_Y;
      var textSourceWidth = dimensions.TEXT_WIDTH;
      var textSourceHeight = dimensions.TEXT_HEIGHT;
      var textTargetX = Math.round(centerX - (dimensions.TEXT_WIDTH / 2));
      var textTargetY = Math.round((this.canvasDimensions.HEIGHT) / 2);
      var textTargetWidth = dimensions.TEXT_WIDTH;
      var textTargetHeight = dimensions.TEXT_HEIGHT;
  
      if (IS_HIDPI) {
        textSourceY *= 2;
        textSourceX *= 2;
        textSourceWidth *= 2;
        textSourceHeight *= 2;
      }
  
      textSourceX += this.textImgPos.x;
      textSourceY += this.textImgPos.y;
  
      // Game over text from sprite.
      this.canvasCtx.drawImage(Runner.imageSprite,
          textSourceX, textSourceY, textSourceWidth, textSourceHeight,
          textTargetX, textTargetY, textTargetWidth, textTargetHeight);
    }
  };