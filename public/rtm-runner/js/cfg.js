/**
 * Default game width.
 * @const
 */
 var DEFAULT_WIDTH = 600; //changing this will affect game speed

 /**
  * Frames per second.
  * @const
  */
 var FPS = 60;
 
 /** @const */
 var IS_HIDPI = window.devicePixelRatio > 1;
 
 /** @const */
 var IS_IOS = window.navigator.userAgent.indexOf('CriOS') > -1 ||
     window.navigator.userAgent == 'UIWebViewForStaticFileContent';
 
 /** @const */
 var IS_MOBILE = window.navigator.userAgent.indexOf('Mobi') > -1 || IS_IOS;
 
 /** @const */
 var IS_TOUCH_ENABLED = 'ontouchstart' in window;

 /** @const */
 var STYLE_RUNNER = 'height: 150px; max-width: 600px; opacity: 1; overflow: hidden; position: absolute; top: 0; z-index: 2;'+
 'border-style: outset; border-width: 5px; border-color: rgba(151, 136, 246, 1); border-radius: 3px; padding: 0px;'

 /** @const */
 var COLLISION_BOX_RTM_GUY_COLOR = '#f00'
 
 /** @const */
 var COLLISION_BOX_OBSTACLE_COLOR = '#0f0' 

 /** @const */
var CANVAS_FILL = '#f7f7f7'

/** Button handler function for game over and riddle win panel */
var handler_builder = function (canvas, runner, type) {
    return function foo(evt) {
        var mousePos = getEventPos(canvas, evt);
        
        if (isInside(mousePos, GameOverPanel.restartButton)) {
            canvas.removeEventListener(type, foo, false);
            runner.restart();
        } else if (isInside(mousePos, GameOverPanel.skipButton)) {
            canvas.removeEventListener(type, foo, false);
            runner.fadeOut();
        } else {
        }
    };
};