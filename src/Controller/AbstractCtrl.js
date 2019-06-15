// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Controller = ICad.Controller || {};

// Start use strict
(function(){
'use strict';

/**
 * Controller base class.
 * @class
 * @extends ICad.ICad.Event.EventEmitter
 * @memberof ICad.Controller
 * @constructor
 */
ICad.Controller.AbstractCtrl = function()
{
    // Call inherited classes constructor
    ICad.ICad.Event.EventEmitter.apply(this, Array.from(arguments));

    /**
     * View which contain all view handled by this controller.
     * @type {ICad.ICad.View.ViewInterface}
     * @access public
     */
    this.view = null;

    /**
     * Is this controller started?
     * @type {boolean}
     * @access public
     */
    this.started = null;

    /**
     * App which use this controller.
     * @type {AbstractApplication}
     * @access public
     */
    this.app = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Controller.AbstractCtrl, ICad.ICad.Event.EventEmitter);

/**
 * Start this controller.
 * @access public
 * @return {void}
 */
ICad.Controller.AbstractCtrl.prototype.start = function()
{
    throw("Method 'start' of the class 'ICad.Controller.AbstractCtrl' should be implemented");
};

/**
 * Stop this controller.
 * @access public
 * @return {void}
 */
ICad.Controller.AbstractCtrl.prototype.stop = function()
{
    throw("Method 'stop' of the class 'ICad.Controller.AbstractCtrl' should be implemented");
};

/**
 * Force this controller to be refreshed.
 * @access public
 * @return {void}
 */
ICad.Controller.AbstractCtrl.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.Controller.AbstractCtrl' should be implemented");
};

// Stop use strict
})();
