/**
 * Get random number.
 * @param {number} min
 * @param {number} max
 * @param {number}
 */
 function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  /**
   * Vibrate on mobile devices.
   * @param {number} duration Duration of the vibration in milliseconds.
   */
  function vibrate(duration) {
    if (IS_MOBILE && window.navigator.vibrate) {
      window.navigator.vibrate(duration);
    }
  }
  
  
  /**
   * Create canvas element.
   * @param {HTMLElement} container Element to append canvas to.
   * @param {number} width
   * @param {number} height
   * @param {string} opt_classname
   * @return {HTMLCanvasElement}
   */
  function createCanvas(container, width, height, opt_classname) {
    var canvas = document.createElement('canvas');
    canvas.className = opt_classname ? Runner.classes.CANVAS + ' ' +
        opt_classname : Runner.classes.CANVAS;
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);
  
    return canvas;
  }
  
  
  /**
   * Decodes the base 64 audio to ArrayBuffer used by Web Audio.
   * @param {string} base64String
   */
  function decodeBase64ToArrayBuffer(base64String) {
    var len = (base64String.length / 4) * 3;
    var str = atob(base64String);
    var arrayBuffer = new ArrayBuffer(len);
    var bytes = new Uint8Array(arrayBuffer);
  
    for (var i = 0; i < len; i++) {
      bytes[i] = str.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
  
  /**
   * Return the current timestamp.
   * @return {number}
   */
  function getTimeStamp() {
    return IS_IOS ? new Date().getTime() : performance.now();
  }


function getEventPos(canvas, e){
  if(e.type == 'touchstart'){
    var rect = canvas.getBoundingClientRect();
    var touch = e.touches[0];
    return { x: touch.pageX - rect.left, y: touch.pageY - rect.top } ;
} else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
    var rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top};
}

}

//Function to check whether a point is inside a rectangle
/*
*
*   pos = mouse position {x:, y:}
*
*    var rect =
*        x:250,
*        y:350,
*        width:200,
*        height:100
*
*/
function isInside(pos, rect){
  return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}