// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.Trace = ICad.View.Trace || {};

// Start use strict
(function(){
'use strict';

/**
 * DOM Canvas WebGL implementation of the Image rendering.
 * @class
 * @extends ICad.ICad.View.DOM.WebGL.CanvasWebGL
 * @memberof ICad.View.Trace
 * @constructor
 */
ICad.View.Trace.ImageCanvasWebGL = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.WebGL.CanvasWebGL.apply(this, Array.from(arguments));

    /**
     * Pixels of this image
     * @type {Math.Matrix<ICad.Math.Color.Color>}
     * @access public
     */
    this.values = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.Trace.ImageCanvasWebGL, ICad.ICad.View.DOM.WebGL.CanvasWebGL);

/**
 * Draw the content of the canvas
 * @access public
 * @return {void}
 */
ICad.View.Trace.ImageCanvasWebGL.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.Trace.ImageCanvasWebGL' should be implemented");
};

/**
 * Render this view as the header preview 
 * @access public
 * @param {ICad.ICad.View.ViewInterface} header View used to render preview.
 * @return {void}
 */
ICad.View.Trace.ImageCanvasWebGL.prototype.renderHeader = function(header)
{
    throw("Method 'renderHeader' of the class 'ICad.View.Trace.ImageCanvasWebGL' should be implemented");
};

// Stop use strict
})();
