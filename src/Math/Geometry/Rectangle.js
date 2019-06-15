// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Math = ICad.Math || {};
ICad.Math.Geometry = ICad.Math.Geometry || {};

// Start use strict
(function(){
'use strict';

/**
 * Rectangle class
 * @class
 * @memberof ICad.Math.Geometry
 * @constructor
 */
ICad.Math.Geometry.Rectangle = function()
{
    /**
     * Left side position of this rectangle.
     * @type {number}
     * @access public
     */
    this.left = null;

    /**
     * Right side position of this rectangle.
     * @type {number}
     * @access public
     */
    this.right = null;

    /**
     * Top side position of this rectangle.
     * @type {number}
     * @access public
     */
    this.top = null;

    /**
     * Bottom side position of this rectangle.
     * @type {number}
     * @access public
     */
    this.bottom = null;

    /**
     * Width of this rectangle
     * @type {number}
     * @access public
     */
    this.width = null;

    /**
     * Height of this rectangle
     * @type {number}
     * @access public
     */
    this.height = null;

    /**
     * Area of this rectangle
     * @type {number}
     * @access public
     */
    this.area = null;

    /**
     * Center of this rectangle
     * @type {ICad.ICad.Math.Geometry.Point}
     * @access public
     */
    this.center = null;

    /**
     * Diagonale length of this rectangle
     * @type {number}
     * @access public
     */
    this.diagonal = null;

    /**
     * X position of this rectangle
     * @type {number}
     * @access public
     */
    this.x = null;

    /**
     * Y position of this rectangle
     * @type {number}
     * @access public
     */
    this.y = null;

    /**
     * Top left corner of this rectangle.
     * @type {ICad.ICad.Math.Geometry.Point}
     * @access public
     */
    this.topLeft = null;

    /**
     * Top right corner of this rectangle.
     * @type {ICad.ICad.Math.Geometry.Point}
     * @access public
     */
    this.bottomRight = null;
};

// Stop use strict
})();
