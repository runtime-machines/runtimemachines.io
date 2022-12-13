/**
 * Horizon background class.
 * @param {HTMLCanvasElement} canvas
 * @param {Object} spritePos Sprite positioning.
 * @param {Object} dimensions Canvas dimensions.
 * @param {number} gapCoefficient
 * @constructor
 */
function Horizon(canvas, spritePos, dimensions, gapCoefficient) {
    this.canvas = canvas;
    this.canvasCtx = this.canvas.getContext('2d');
    this.config = Horizon.config;
    this.dimensions = dimensions;
    this.horizonOffsets = [0, 0];
    this.spritePos = spritePos;

    // Obstacle
    this.obstacles = [];
    this.obstacleHistory = [];
    this.gapCoefficient = gapCoefficient;
  
    // Cloud
    this.clouds = [];
    this.cloudSpeed = this.config.BG_CLOUD_SPEED;
    this.cloudFrequency = this.config.CLOUD_FREQUENCY;
    
    // Pickup
    this.pickups = []
    this.pickupWaveCount = 0;
    this.pickupWave = false;
    this.pickupWaveProbability = 1;
    this.pickupHistory = [];
    this.pickupTimer = Math.random() * Pickup.MAX_TIMER;
    this.pickupAcc = 0;
    this.pickupSpeed = this.config.PICKUP_SPEED;
  
    // Horizon
    this.horizonLine = null;
  
    this.init();
};

/**
 * Horizon config.
 * @enum {number}
 */
Horizon.config = {
    PICKUP_SPEED: 0.2,
    PICKUP_FREQUENCY: .5,
    MAX_PICKUPS: 10,
    MAX_PICKUPS_IN_WAVE: 10,
    MAX_PICKUPS_DURING_WAVE: 15,
    BG_CLOUD_SPEED: 0.2,
    BUMPY_THRESHOLD: .3,
    CLOUD_FREQUENCY: .5,
    HORIZON_HEIGHT: 16,
    MAX_CLOUDS: 6
};

Horizon.prototype = {
/**
 * Initialise the horizon. Just add the line and a cloud. No obstacles.
 */
init: function() {
    this.addCloud();
    this.horizonLine = new HorizonLine(this.canvas, this.spritePos.HORIZON);
},

/**
 * @param {number} deltaTime
 * @param {number} currentSpeed
 * @param {boolean} updateObstacles Used as an override to prevent
 *     the obstacles from being updated / added. This happens in the
 *     ease in section.
 */
update: function(deltaTime, currentSpeed, updateObstacles, updatePickups) {
    this.runningTime += deltaTime;
    this.horizonLine.update(deltaTime, currentSpeed);
    this.updateClouds(deltaTime, currentSpeed);

    if (updateObstacles) {
        this.updateObstacles(deltaTime, currentSpeed);
    }

    if (updatePickups) {
        this.updatePickups(deltaTime, currentSpeed);
    }
},

/**
 * Update the cloud positions.
 * @param {number} deltaTime
 * @param {number} currentSpeed
 */
updateClouds: function(deltaTime, speed) {
    var cloudSpeed = this.cloudSpeed / 1000 * deltaTime * speed;
    var numClouds = this.clouds.length;

    if (numClouds) {
    for (var i = numClouds - 1; i >= 0; i--) {
        this.clouds[i].update(cloudSpeed);
    }

    var lastCloud = this.clouds[numClouds - 1];

    // Check for adding a new cloud.
    if (numClouds < this.config.MAX_CLOUDS &&
        (this.dimensions.WIDTH - lastCloud.xPos) > lastCloud.cloudGap &&
        this.cloudFrequency > Math.random()) {
        this.addCloud();
    }

    // Remove expired clouds.
    this.clouds = this.clouds.filter(function(obj) {
        return !obj.remove;
    });
    }
},

/**
 * Update the obstacle positions.
 * @param {number} deltaTime
 * @param {number} currentSpeed
 */
updateObstacles: function(deltaTime, currentSpeed) {
    // Obstacles, move to Horizon layer.
    var updatedObstacles = this.obstacles.slice(0);

    for (var i = 0; i < this.obstacles.length; i++) {
    var obstacle = this.obstacles[i];
    obstacle.update(deltaTime, currentSpeed);

    // Clean up existing obstacles.
    if (obstacle.remove) {
        updatedObstacles.shift();
    }
    }
    this.obstacles = updatedObstacles;

    if (this.obstacles.length > 0) {
        var lastObstacle = this.obstacles[this.obstacles.length - 1];

        if (lastObstacle && lastObstacle.isVisible() 
                && (lastObstacle.xPos + lastObstacle.width + lastObstacle.gap) < this.dimensions.WIDTH
                && !lastObstacle.followingObstacleCreated) {
            this.addNewObstacle(currentSpeed);
            lastObstacle.followingObstacleCreated = true;
        }
    } else {
    // Create new obstacles.
    this.addNewObstacle(currentSpeed);
    }
},

/**
 * Add a new obstacle.
 * @param {number} currentSpeed
 */
 addNewObstacle: function(currentSpeed) {
    var obstacleTypeIndex = 0;
    if(!Runner.config.DUCKING){
        //exclude last one that is pterdactyl
        obstacleTypeIndex = getRandomNum(0, Obstacle.types.length - 2);
    } else {
        obstacleTypeIndex = getRandomNum(0, Obstacle.types.length - 1);
    }
    var obstacleType = Obstacle.types[obstacleTypeIndex];

    // Check for multiples of the same type of obstacle.
    // Also check obstacle is available at current speed.
    if (this.duplicateObstacleCheck(obstacleType.type) ||
        currentSpeed < obstacleType.minSpeed) {
    this.addNewObstacle(currentSpeed);
    } else {
    var obstacleSpritePos = this.spritePos[obstacleType.type];

    this.obstacles.push(new Obstacle(this.canvasCtx, obstacleType,
        obstacleSpritePos, this.dimensions,
        this.gapCoefficient, currentSpeed));

    this.obstacleHistory.unshift(obstacleType.type);

    if (this.obstacleHistory.length > 1) {
        this.obstacleHistory.splice(Runner.config.MAX_OBSTACLE_DUPLICATION);
    }
    }
},

/**
 * Returns whether the previous two obstacles are the same as the next one.
 * Maximum duplication is set in config value MAX_OBSTACLE_DUPLICATION.
 * @return {boolean}
 */
duplicateObstacleCheck: function(nextObstacleType) {
    var duplicateCount = 0;

    for (var i = 0; i < this.obstacleHistory.length; i++) {
    duplicateCount = this.obstacleHistory[i] == nextObstacleType ?
        duplicateCount + 1 : 0;
    }
    return duplicateCount >= Runner.config.MAX_OBSTACLE_DUPLICATION;
},

/**
 * Update the pickup positions.
 * @param {number} deltaTime
 * @param {number} currentSpeed
 */
updatePickups: function(deltaTime, currentSpeed) {
    // pickups, move to Horizon layer.
    var updatedPickups = this.pickups.slice(0);
    //updates all pickups
    for (var i = 0; i < this.pickups.length; i++) {
        var pickup = this.pickups[i];
        pickup.update(deltaTime, currentSpeed);

        // Clean up existing pickup.
        if (pickup.remove) {
            updatedPickups.shift();
        }
    }

    this.pickups = updatedPickups;

    if(!this.pickupWave){
        //todo make it respect time not frame.
        this.pickupWave = ( Math.floor(Math.random()*1000) == 1)
    }
    
    if(!this.pickupWave){
        this.pickups = updatedPickups;
        this.pickupAcc += deltaTime;
        if(this.pickupAcc > this.pickupTimer){
            var lastpickup = this.pickups[this.pickups.length - 1];
            if( !lastpickup 
                || (this.pickups.length < Horizon.config.MAX_PICKUPS 
                        && (lastpickup.xPos + lastpickup.width + lastpickup.typeConfig.minGap) < this.dimensions.WIDTH) ){
                this.pickupAcc = 0;
                this.pickupTimer = Math.random() * Pickup.MAX_TIMER;
                this.addNewPickup(currentSpeed);
            }
        }
    } else {
        if(this.pickupWaveCount >= this.config.MAX_PICKUPS_IN_WAVE || this.pickups > Horizon.config.MAX_PICKUPS_DURING_WAVE){
            this.pickupWave = false;
            this.pickupWaveCount = 0;
            this.pickupAcc = 0;
            this.pickupTimer = Pickup.MAX_TIMER;
        } else {
            var lastpickup = this.pickups[this.pickups.length - 1];
            if( !lastpickup 
                || (lastpickup.xPos + lastpickup.width + lastpickup.typeConfig.minGap) < this.dimensions.WIDTH ){
                this.pickupWaveCount += 1;
                this.addNewPickup(currentSpeed);
            }
        }
    }
},

/**
 * Add a new pickup.
 * @param {number} currentSpeed
 */
addNewPickup: function(currentSpeed) {
    var pickupTypeIndex = getRandomNum(0, Pickup.types.length - 1);
    var pickupType = Pickup.types[pickupTypeIndex];

    // Check for multiples of the same type of pickup.
    // Also check pickup is available at current speed.
    if (currentSpeed < pickupType.minSpeed) {
        this.addNewPickup(currentSpeed);
    } else {
        var pickupSpritePos = this.spritePos[pickupType.type];

        this.pickups.push(new Pickup(this.canvasCtx, pickupType,
            pickupSpritePos, this.dimensions,
            this.pickupGapCoefficient, currentSpeed));

        this.pickupHistory.unshift(pickupType.type);

        if (this.pickupHistory.length > 1) {
            this.pickupHistory.splice(Runner.config.MAX_OBSTACLE_DUPLICATION);
        }
    }
},

hasPickups: function(){
    return this.pickups.length > 0;
},

/**
 * Reset the horizon layer.
 * Remove existing obstacles and reposition the horizon line.
 */
reset: function() {
    this.obstacles = [];
    this.pickups = [];
    this.horizonLine.reset();
},

/**
 * Update the canvas width and scaling.
 * @param {number} width Canvas width.
 * @param {number} height Canvas height.
 */
resize: function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
},

/**
 * Add a new cloud to the horizon.
 */
addCloud: function() {
    this.clouds.push(new Cloud(this.canvas, this.spritePos.CLOUD,
        this.dimensions.WIDTH));
}
};