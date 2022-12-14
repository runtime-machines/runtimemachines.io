function Riddle(){};

Riddle.ON = true;
Riddle.MAX_DISTANCE = 500;
Riddle.PICKUP_TO_COLLECT = 5;
Riddle.USE_PICKUPS = false;
Riddle.MIN_DEATHS = 2;
Riddle.MAX_OBSTACLES = 8;
Riddle.SHOW_OBSTACLES_LEFT = true;

Riddle.satisfied = function(actualDistance, noPickupCollected){
    return actualDistance >= Riddle.MAX_DISTANCE || noPickupCollected >= Riddle.PICKUP_TO_COLLECT;
}