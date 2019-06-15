// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Util = ICad.Util || {};

// Start use strict
(function(){
'use strict';

/**
 * Handle seedable random generation.
 * @class
 * @memberof ICad.Util
 * @constructor
 * @param {number} seed? Seed used to generate the next random number.
 */
ICad.Util.Random = function(seed?)
{
    /**
     * Seed used to generate the next random number.
     * @type {number}
     * @access public
     */
    this.seed = null;
};

/**
 * Get the next random number.
 * @access public
 * @return {number} Generated random number.
 */
ICad.Util.Random.prototype.next = function()
{
    throw("Method 'next' of the class 'ICad.Util.Random' should be implemented");
};

// Stop use strict
})();
