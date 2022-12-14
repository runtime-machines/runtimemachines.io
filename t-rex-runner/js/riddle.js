function Riddle(){};

Riddle.ON = true;
Riddle.MAX_DISTANCE = 500;
Riddle.PICKUP_TO_COLLECT = 5;
Riddle.USE_PICKUPS = false;

Riddle.satisfied = function(actualDistance, noPickupCollected){
    return actualDistance >= Riddle.MAX_DISTANCE || noPickupCollected >= Riddle.PICKUP_TO_COLLECT;
}