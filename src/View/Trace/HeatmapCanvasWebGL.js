// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.Trace = ICad.View.Trace || {};

// Start use strict
(function(){
'use strict';

/**
 * DOM Canvas WebGL implementation of the Heatmap.
 * @class
 * @extends ICad.ICad.View.DOM.WebGL.CanvasWebGL
 * @memberof ICad.View.Trace
 * @constructor
 */
ICad.View.Trace.HeatmapCanvasWebGL = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.WebGL.CanvasWebGL.apply(this, Array.from(arguments));

    /**
     * Lower value color
     * @type {Math.Color.Color}
     * @access public
     */
    this.colorFrom = null;

    /**
     * Higher value color
     * @type {Math.Color.Color}
     * @access public
     */
    this.colorTo = null;

    /**
     * Values used to render the heatmap
     * @type {Math.Matrix<number>}
     * @access public
     */
    this.values = null;

    /**
     * Max value gradient scale.
     * @type {number}
     * @access public
     */
    this.max = null;

    /**
     * Min value gradient scale.
     * @type {number}
     * @access public
     */
    this.min = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.Trace.HeatmapCanvasWebGL, ICad.ICad.View.DOM.WebGL.CanvasWebGL);

/**
 * Draw the content of the canvas
 * @access public
 * @return {void}
 */
ICad.View.Trace.HeatmapCanvasWebGL.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.Trace.HeatmapCanvasWebGL' should be implemented");
};

/**
 * Render this view as the header preview 
 * @access public
 * @param {ICad.ICad.View.ViewInterface} header View used to render preview.
 * @return {void}
 */
ICad.View.Trace.HeatmapCanvasWebGL.prototype.renderHeader = function(header)
{
    throw("Method 'renderHeader' of the class 'ICad.View.Trace.HeatmapCanvasWebGL' should be implemented");
};

// Stop use strict
})();
