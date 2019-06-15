// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Util = ICad.Util || {};

// Start use strict
(function(){
'use strict';

/**
 * Helper which generate unique values.
 * @class
 * @memberof ICad.Util
 * @constructor
 */
ICad.Util.Unicity = function()
{
};

/**
 * Generate an universal unique identifier v4.
 * https://fr.wikipedia.org/wiki/Universal_Unique_Identifier
 * @access public
 * @return {string} Generated uuid
 */
ICad.Util.Unicity.prototype.uuid = function()
{
    throw("Method 'uuid' of the class 'ICad.Util.Unicity' should be implemented");
};

// Stop use strict
})();
