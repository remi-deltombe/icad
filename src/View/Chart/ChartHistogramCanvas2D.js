// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.Chart = ICad.View.Chart || {};

// Start use strict
(function(){
'use strict';

/**
 * DOM Canvas 2D implementation of the ChartHistogramInterface.
 * @class
 * @extends ICad.ICad.View.DOM.Canvas2D.Canvas2D
 * @memberof ICad.View.Chart
 * @constructor
 */
ICad.View.Chart.ChartHistogramCanvas2D = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.Canvas2D.Canvas2D.apply(this, Array.from(arguments));

    /**
     * Colors used to draw the chart.
     * @type {Math.Color.Color}
     * @access public
     */
    this.color = null;

    /**
     * Data used to draw the chart
     * @type {Array<number>}
     * @access public
     */
    this.data = null;

    /**
     * Axis scale of this histogram.
     * Left : X axis minimum value.
     * Right : X axis maximum value.
     * Top : Y axis maximum value.
     * Bottom : Y axis minimum value.
     * @type {Math.Geometry.Rectangle}
     * @access public
     */
    this.axis = null;

    /**
     * Should this chart display a background?
     * @type {boolean}
     * @access public
     */
    this.background = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.Chart.ChartHistogramCanvas2D, ICad.ICad.View.DOM.Canvas2D.Canvas2D);

/**
 * Render this chart in a Canvas
 * @access public
 * @return {void}
 */
ICad.View.Chart.ChartHistogramCanvas2D.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.Chart.ChartHistogramCanvas2D' should be implemented");
};

// Stop use strict
})();
