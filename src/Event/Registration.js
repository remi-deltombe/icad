// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Event = ICad.Event || {};

// Start use strict
(function(){
'use strict';

/**
 * A Registration is a action to do when a specific event is trigger on an object.
 * @class
 * @memberof ICad.Event
 * @constructor
 */
ICad.Event.Registration = function()
{
    /**
     * Function to call when the event is triggered.
     * @type {Function}
     * @access public
     */
    this.callback = null;
};

// Stop use strict
})();
