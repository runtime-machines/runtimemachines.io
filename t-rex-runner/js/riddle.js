function Riddle(){};

Riddle.ON = false;
Riddle.MAX_DISTANCE = 500;
Riddle.PICKUP_TO_COLLECT = 5;

Riddle.satisfied = function(actualDistance, noPickupCollected){
    return actualDistance >= Riddle.MAX_DISTANCE || noPickupCollected >= Riddle.PICKUP_TO_COLLECT;
}