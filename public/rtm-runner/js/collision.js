/**
 * Check for a collision.
 * @param {!Obstacle} obstacle
 * @param {!RtmGuy} rtmGuy RTM-Guy object.
 * @param {HTMLCanvasContext} opt_canvasCtx Optional canvas context for drawing
 *    collision boxes.
 * @return {Array<CollisionBox>}
 */
 function checkForCollision(obstacle, rtmGuy, opt_canvasCtx) {
    var obstacleBoxXPos = Runner.defaultDimensions.WIDTH + obstacle.xPos;
  
    // Adjustments are made to the bounding box as there is a 1 pixel white
    // border around the RTM-Guy and obstacles.
    var rtmGuyBox = new CollisionBox(
        rtmGuy.xPos + 1,
        rtmGuy.yPos + 1,
        rtmGuy.config.WIDTH - 2,
        rtmGuy.config.HEIGHT - 2);
  
    var obstacleBox = new CollisionBox(
        obstacle.xPos + 1,
        obstacle.yPos + 1,
        obstacle.typeConfig.width * obstacle.size - 2,
        obstacle.typeConfig.height - 2);
  
    // Debug outer box
    if (opt_canvasCtx) {
      drawCollisionBoxes(opt_canvasCtx, rtmGuyBox, obstacleBox);
    }
  
    // Simple outer bounds check.
    if (boxCompare(rtmGuyBox, obstacleBox)) {
      var collisionBoxes = obstacle.collisionBoxes;
      var rtmGuyCollisionBoxes = rtmGuy.ducking ?
          RtmGuy.collisionBoxes.DUCKING : RtmGuy.collisionBoxes.RUNNING;
  
      // Detailed axis aligned box check.
      for (var t = 0; t < rtmGuyCollisionBoxes.length; t++) {
        for (var i = 0; i < collisionBoxes.length; i++) {
          // Adjust the box to actual positions.
          var adjRtmGuyBox =
              createAdjustedCollisionBox(rtmGuyCollisionBoxes[t], rtmGuyBox);
          var adjObstacleBox =
              createAdjustedCollisionBox(collisionBoxes[i], obstacleBox);
          var crashed = boxCompare(adjRtmGuyBox, adjObstacleBox);
  
          // Draw boxes for debug.
          if (opt_canvasCtx) {
            drawCollisionBoxes(opt_canvasCtx, adjRtmGuyBox, adjObstacleBox);
          }
  
          if (crashed) {
            var score = obstacle.typeConfig.score ? obstacle.typeConfig.score : 0;
            return [adjRtmGuyBox, adjObstacleBox, obstacle, score];
          }
        }
      }
    }
    return false;
  };
  
  
  /**
   * Adjust the collision box.
   * @param {!CollisionBox} box The original box.
   * @param {!CollisionBox} adjustment Adjustment box.
   * @return {CollisionBox} The adjusted collision box object.
   */
  function createAdjustedCollisionBox(box, adjustment) {
    return new CollisionBox(
        box.x + adjustment.x,
        box.y + adjustment.y,
        box.width,
        box.height);
  };
  
  
  /**
   * Draw the collision boxes for debug.
   */
  function drawCollisionBoxes(canvasCtx, rtmGuyBox, obstacleBox) {
    canvasCtx.save();
    canvasCtx.strokeStyle = COLLISION_BOX_RTM_GUY_COLOR;
    canvasCtx.strokeRect(rtmGuyBox.x, rtmGuyBox.y, rtmGuyBox.width, rtmGuyBox.height);
  
    canvasCtx.strokeStyle = COLLISION_BOX_OBSTACLE_COLOR;
    canvasCtx.strokeRect(obstacleBox.x, obstacleBox.y,
        obstacleBox.width, obstacleBox.height);
    canvasCtx.restore();
  };
  
  
  /**
   * Compare two collision boxes for a collision.
   * @param {CollisionBox} rtmGuyBox
   * @param {CollisionBox} obstacleBox
   * @return {boolean} Whether the boxes intersected.
   */
  function boxCompare(rtmGuyBox, obstacleBox) {
    var crashed = false;
    var rtmGuyBoxX = rtmGuyBox.x;
    var rtmGuyBoxY = rtmGuyBox.y;
  
    var obstacleBoxX = obstacleBox.x;
    var obstacleBoxY = obstacleBox.y;
  
    // Axis-Aligned Bounding Box method.
    if (rtmGuyBox.x < obstacleBoxX + obstacleBox.width &&
        rtmGuyBox.x + rtmGuyBox.width > obstacleBoxX &&
        rtmGuyBox.y < obstacleBox.y + obstacleBox.height &&
        rtmGuyBox.height + rtmGuyBox.y > obstacleBox.y) {
      crashed = true;
    }
  
    return crashed;
  };

/**
 * Collision box object.
 * @param {number} x X position.
 * @param {number} y Y Position.
 * @param {number} w Width.
 * @param {number} h Height.
 */
 function CollisionBox(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  };