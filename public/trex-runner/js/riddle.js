function Riddle() {}

Riddle.ON = true;
Riddle.MAX_DISTANCE = 500;
Riddle.PICKUP_TO_COLLECT = 5;
Riddle.USE_PICKUPS = false;
Riddle.MIN_DEATHS = 2;
Riddle.MAX_OBSTACLES = 1;
Riddle.SHOW_OBSTACLES_LEFT = true;
Riddle.RESET_OBSTACLES_LEFT_UPON_DEATH = false;
Riddle.DEBUG_COLLIDER = false;

/**
 *
 * @param {Runner} runner
 * @returns {boolean}
 */
Riddle.satisfied = function (runner) {
	return runner.horizon.no_obstacles == Riddle.MAX_OBSTACLES;
};
