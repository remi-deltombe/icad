// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.DOM = ICad.View.DOM || {};
ICad.View.DOM.Canvas2D = ICad.View.DOM.Canvas2D || {};

// Start use strict
(function(){
'use strict';

/**
 * Canvas in  a 2D Context.
 * @class
 * @extends ICad.ICad.View.DOM.Canvas
 * @memberof ICad.View.DOM.Canvas2D
 * @constructor
 */
ICad.View.DOM.Canvas2D.Canvas2D = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.Canvas.apply(this, Array.from(arguments));

    /**
     * Context used by this canvas to draw.
     * @type {CanvasRenderingContext2D}
     * @access public
     */
    this.context = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.DOM.Canvas2D.Canvas2D, ICad.ICad.View.DOM.Canvas);

/**
 * Draw the content of the canvas
 * @access public
 * @return {void}
 */
ICad.View.DOM.Canvas2D.Canvas2D.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.DOM.Canvas2D.Canvas2D' should be implemented");
};

// Stop use strict
})();
