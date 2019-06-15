// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Math = ICad.Math || {};
ICad.Math.Color = ICad.Math.Color || {};

// Start use strict
(function(){
'use strict';

/**
 * Color in a RGB space.
 * @class
 * @memberof ICad.Math.Color
 * @constructor
 * @param {number} r? Red channel value.
 * @param {number} g? Green channel value.
 * @param {number} b? Blue channel value.
 */
ICad.Math.Color.Color = function(r?, g?, b?)
{
    /**
     * Red channel value.
     * @type {number}
     * @access public
     */
    this.r = null;

    /**
     * Green  channel value.
     * @type {number}
     * @access public
     */
    this.g = null;

    /**
     * Blue channel value.
     * @type {number}
     * @access public
     */
    this.b = null;
};

/**
 * Serialize this color to a string.
 * @access public
 * @return {string} Serialized color with a format '#RRGGBB'
 */
ICad.Math.Color.Color.prototype.toString = function()
{
    throw("Method 'toString' of the class 'ICad.Math.Color.Color' should be implemented");
};

/**
 * Fill this color based on a string.
 * @access public
 * @param {string} value String to parse. It handle format '#RRGGBB'
 * @return {void}
 */
ICad.Math.Color.Color.prototype.fromString = function(value)
{
    throw("Method 'fromString' of the class 'ICad.Math.Color.Color' should be implemented");
};

/**
 * Is these two color equal?
 * @access public
 * @param {ICad.ICad.Math.Color.Color} color Color to test.
 * @return {boolean} Is these two color equal?
 */
ICad.Math.Color.Color.prototype.equal = function(color)
{
    throw("Method 'equal' of the class 'ICad.Math.Color.Color' should be implemented");
};

// Stop use strict
})();
