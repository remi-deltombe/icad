// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Math = ICad.Math || {};
ICad.Math.Physic = ICad.Math.Physic || {};

// Start use strict
(function(){
'use strict';

/**
 * Linear inertia computation helper.
 * 
 * @class
 * @memberof ICad.Math.Physic
 * @constructor
 */
ICad.Math.Physic.Inertia = function()
{
    /**
     * Starting time used to compute values.
     * @type {number}
     * @access public
     */
    this.start = null;

    /**
     * Duration  time used to compute values.
     * @type {number}
     * @access public
     */
    this.duration = null;

    /**
     * Value which should be returned at the end of the inertia.
     * @type {number}
     * @access public
     */
    this.value = null;
};

/**
 * Compute a transitional value of this inertia.
 * If will return a value between 0 and this inertia value, depending of time.
 * The growing rate is linear.
 * @access public
 * @param {number} time Time used to compute the value.
 * @return {number} Computed value.,If time is before start, it return value,If time is after start, it return 0
 */
ICad.Math.Physic.Inertia.prototype.atTime = function(time)
{
    throw("Method 'atTime' of the class 'ICad.Math.Physic.Inertia' should be implemented");
};

// Stop use strict
})();
