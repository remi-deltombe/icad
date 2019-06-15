// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Event = ICad.Event || {};

// Start use strict
(function(){
'use strict';

/**
 * EventEmitter give to its inheritors the capability to be listened by other objects.
 * These objects will be notify depending of what they listen and what the EventEmitter  do.
 * 
 * A notification is called an Event.
 * 
 * The registration is  based on an event name  and a function named callback.
 * The event name depend of the EventEmitter.  Each inheritor can implements its own event name.
 * The callback is given  by the listener object. It  will be call during the notification by the EventEmitter.
 * During the notification, the callback can receive data depending of the triggered event. 
 * @class
 * @memberof ICad.Event
 * @constructor
 */
ICad.Event.EventEmitter = function()
{
    /**
     * Registred callbacks on this object.
     * Structure : 
     * {
     *   eventName: 
     *   [
     *     callback,
     *     callback,
     *     ...
     *   ],
     *    ...
     * }
     * @type {Map<string, Array<Registration>>}
     * @access public
     */
    this.registrations = null;
};

/**
 * Register a function to an event.
 * When called, this function will receive an Event object as parameter.
 * Prototype : function(Event.Event) : void
 * @access public
 * @param {string} eventName Name of the event to listen.
 * @param {Function} callback Function to call when the event is triggered.
 * @return {ICad.ICad.Event.Registration} Registration create for this event listening.
 */
ICad.Event.EventEmitter.prototype.on = function(eventName, callback)
{
    throw("Method 'on' of the class 'ICad.Event.EventEmitter' should be implemented");
};

/**
 * Unregister a function from  an event.
 * @access public
 * @param {ICad.ICad.Event.Registration} registration Registration to remove from the event.
 * @return {void}
 */
ICad.Event.EventEmitter.prototype.off = function(registration)
{
    throw("Method 'off' of the class 'ICad.Event.EventEmitter' should be implemented");
};

/**
 * Dispatch  an event.
 * All functions registered to this event will be called
 * @access public
 * @param {string} eventName Event's name to dispatch.
 * @param {Object} args? Data used to build the Event object.,These data will be available for all the called registered functions.
 * @return {ICad.ICad.Event.Event} Event triggered by this emitter.
 */
ICad.Event.EventEmitter.prototype.trigger = function(eventName, args?)
{
    throw("Method 'trigger' of the class 'ICad.Event.EventEmitter' should be implemented");
};

// Stop use strict
})();
