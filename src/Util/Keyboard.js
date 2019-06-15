// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Util = ICad.Util || {};

// Start use strict
(function(){
'use strict';

/**
 * Helper which which handle the interaction of the user with its keyboard.
 * Trigger the event "keyup" when a key is pushed.
 * Trigger the event "keydown" when a key is released.
 * @class
 * @extends ICad.ICad.Event.EventEmitter
 * @memberof ICad.Util
 * @constructor
 * @param {Application.AbstractApplication} app App which is concern by the interaction.
 */
ICad.Util.Keyboard = function(app)
{
    // Call inherited classes constructor
    ICad.ICad.Event.EventEmitter.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Util.Keyboard, ICad.ICad.Event.EventEmitter);

/**
 * Is a key down on the keyboard?
 * @access public
 * @param {string} key Key to test.
 * @return {boolean} Is a key down on the keyboard?
 */
ICad.Util.Keyboard.prototype.isDown = function(key)
{
    throw("Method 'isDown' of the class 'ICad.Util.Keyboard' should be implemented");
};

// Stop use strict
})();
