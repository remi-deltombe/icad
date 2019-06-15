// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.Trace = ICad.View.Trace || {};

// Start use strict
(function(){
'use strict';

/**
 * DOM Canvas WebGL implementation of the multi lines rendering.
 * @class
 * @extends ICad.ICad.View.DOM.Canvas2D.Canvas2D
 * @memberof ICad.View.Trace
 * @constructor
 */
ICad.View.Trace.LineCanvas2D = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.Canvas2D.Canvas2D.apply(this, Array.from(arguments));

    /**
     * Color of the lines
     * @type {Math.Color.Color}
     * @access public
     */
    this.color = null;

    /**
     * Values used to render the lines
     * @type {Math.Matrix<number>}
     * @access public
     */
    this.values = null;

    /**
     * Min value horizontale  scale.
     * @type {number}
     * @access public
     */
    this.min = null;

    /**
     * Max value horizontale  scale.
     * @type {number}
     * @access public
     */
    this.max = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.Trace.LineCanvas2D, ICad.ICad.View.DOM.Canvas2D.Canvas2D);

/**
 * Draw the content of the canvas
 * @access public
 * @return {void}
 */
ICad.View.Trace.LineCanvas2D.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.Trace.LineCanvas2D' should be implemented");
};

/**
 * Render this view as the header preview 
 * @access public
 * @param {ICad.ICad.View.ViewInterface} header View used to render preview.
 * @return {void}
 */
ICad.View.Trace.LineCanvas2D.prototype.renderHeader = function(header)
{
    throw("Method 'renderHeader' of the class 'ICad.View.Trace.LineCanvas2D' should be implemented");
};

// Stop use strict
})();
