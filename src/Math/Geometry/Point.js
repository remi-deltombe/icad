// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Math = ICad.Math || {};
ICad.Math.Geometry = ICad.Math.Geometry || {};

// Start use strict
(function(){
'use strict';

/**
 * Point class
 * @class
 * @memberof ICad.Math.Geometry
 * @constructor
 */
ICad.Math.Geometry.Point = function()
{
    /**
     * X position of this point.
     * @type {number}
     * @access public
     */
    this.x = null;

    /**
     * Y position of this point.
     * @type {number}
     * @access public
     */
    this.y = null;
};

/**
 * Compute the distance between this point and another one.
 * @access public
 * @param {ICad.ICad.Math.Geometry.Point} from Point used to compute the distance.
 * @return {number} Distance between this point and the other one.
 */
ICad.Math.Geometry.Point.prototype.distance = function(from)
{
    throw("Method 'distance' of the class 'ICad.Math.Geometry.Point' should be implemented");
};

// Stop use strict
})();
