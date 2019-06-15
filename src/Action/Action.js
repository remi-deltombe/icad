// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Action = ICad.Action || {};

// Start use strict
(function(){
'use strict';

/**
 * An action provide an common interface to any possible function.
 * Action could be linked together with their next attribute.
 * @class
 * @memberof ICad.Action
 * @constructor
 * @param {Function} callback? Function to call when this action is running.
 */
ICad.Action.Action = function(callback?)
{
    /**
     * Function to run by this action.
     * 
     * @type {Function}
     * @access public
     */
    this.callback = null;

    /**
     * Action to run after this one is executed.
     * @type {ICad.ICad.Action.Action}
     * @access public
     */
    this.next = null;
};

/**
 * Run the function of this action.
 * @access public
 * @return {void}
 */
ICad.Action.Action.prototype.run = function()
{
    throw("Method 'run' of the class 'ICad.Action.Action' should be implemented");
};

// Stop use strict
})();
