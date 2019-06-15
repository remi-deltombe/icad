// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.DOM = ICad.View.DOM || {};
ICad.View.DOM.WebGL = ICad.View.DOM.WebGL || {};

// Start use strict
(function(){
'use strict';

/**
 * Canvas in  a WebGL Context.
 * @class
 * @extends ICad.ICad.View.DOM.Canvas
 * @memberof ICad.View.DOM.WebGL
 * @constructor
 */
ICad.View.DOM.WebGL.CanvasWebGL = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.Canvas.apply(this, Array.from(arguments));

    /**
     * Context used by this canvas to draw.
     * @type {WebGLRenderingContext}
     * @access public
     */
    this.context = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.DOM.WebGL.CanvasWebGL, ICad.ICad.View.DOM.Canvas);

/**
 * Draw the content of the canvas
 * @access public
 * @return {void}
 */
ICad.View.DOM.WebGL.CanvasWebGL.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.DOM.WebGL.CanvasWebGL' should be implemented");
};

// Stop use strict
})();
