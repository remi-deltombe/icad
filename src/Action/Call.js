// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Action = ICad.Action || {};

// Start use strict
(function(){
'use strict';

/**
 * Call action provide an easy way to build an action related to an object method.
 * @class
 * @extends ICad.ICad.Action.Action
 * @memberof ICad.Action
 * @constructor
 * @param {any} object Object which contain the method to call.
 * @param {string} method Name of the method to call.
 * @param {any} args? Arguments to pass to the methods when it is calling.
 */
ICad.Action.Call = function(object, method, args?)
{
    // Call inherited classes constructor
    ICad.ICad.Action.Action.apply(this, Array.from(arguments));

    /**
     * Object which contain the method to call.
     * @type {any}
     * @access public
     */
    this.object = null;

    /**
     * Name of the method to call.
     * @type {string}
     * @access public
     */
    this.method = null;

    /**
     * Arguments to pass to the methods when it is calling.
     * @type {Array<any>}
     * @access public
     */
    this.args = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Action.Call, ICad.ICad.Action.Action);

// Stop use strict
})();
