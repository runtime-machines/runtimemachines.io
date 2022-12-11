/**
 * Default game width.
 * @const
 */
 var DEFAULT_WIDTH = 1200; //changing this will affect game speed

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