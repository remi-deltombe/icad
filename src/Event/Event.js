// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Event = ICad.Event || {};

// Start use strict
(function(){
'use strict';

/**
 * Event is give by an  eventEmitter to its registered callback when a event notification append.
 * Event contain the data related to the event.
 * It provide control on the triggered event too.
 * @class
 * @memberof ICad.Event
 * @constructor
 */
ICad.Event.Event = function()
{
    /**
     * Data related to this event.
     * @type {any}
     * @access public
     */
    this.data = null;

    /**
     * EventEmitter which trigger the event.
     * @type {ICad.ICad.Event.EventEmitter}
     * @access public
     */
    this.emitter = null;
};

// Stop use strict
})();
