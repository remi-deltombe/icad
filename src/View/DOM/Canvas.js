// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.DOM = ICad.View.DOM || {};

// Start use strict
(function(){
'use strict';

/**
 * Canvas dom view.
 * @class
 * @extends ICad.ICad.View.DOM.DOMEmitter
 * @memberof ICad.View.DOM
 * @constructor
 */
ICad.View.DOM.Canvas = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.DOMEmitter.apply(this, Array.from(arguments));

    /**
     * Resolution of this canvas.
     * The rendering size will be equal to : canvas.size * resolution.
     * Useful to handle retina display. 
     * @type {number}
     * @access public
     */
    this.resolution = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.DOM.Canvas, ICad.ICad.View.DOM.DOMEmitter);

/**
 * Render this canvas as <canvas></canvas>.
 * The canvas is create only once to prevent context loosing.
 * @access public
 * @return {void}
 */
ICad.View.DOM.Canvas.prototype.render = function()
{
    throw("Method 'render' of the class 'ICad.View.DOM.Canvas' should be implemented");
};

/**
 * Render this canvas as <canvas></canvas>.
 * The canvas is create only once to prevent context loosing.
 * @access public
 * @return {void}
 */
ICad.View.DOM.Canvas.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.DOM.Canvas' should be implemented");
};

// Stop use strict
})();
