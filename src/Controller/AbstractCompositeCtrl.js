// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Controller = ICad.Controller || {};

// Start use strict
(function(){
'use strict';

/**
 * Controller which can contain other controller base class.
 * @class
 * @extends ICad.ICad.Controller.AbstractCtrl
 * @memberof ICad.Controller
 * @constructor
 */
ICad.Controller.AbstractCompositeCtrl = function()
{
    // Call inherited classes constructor
    ICad.ICad.Controller.AbstractCtrl.apply(this, Array.from(arguments));

    /**
     * Controller contained by this controller.
     * @type {Array<AbstractCtrl>}
     * @access public
     */
    this.controllers = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Controller.AbstractCompositeCtrl, ICad.ICad.Controller.AbstractCtrl);

/**
 * Add a controller to this controller.
 * @access public
 * @param {ICad.ICad.Controller.AbstractCtrl} controller Controller to add
 * @return {void}
 */
ICad.Controller.AbstractCompositeCtrl.prototype.addController = function(controller)
{
    throw("Method 'addController' of the class 'ICad.Controller.AbstractCompositeCtrl' should be implemented");
};

/**
 * Find all controllers contained in this controller which inherit a specified class.
 * @access public
 * @param {any} controllerClass Class of the controllers to find.
 * @return {Array<AbstractCtrl>} Found controllers
 */
ICad.Controller.AbstractCompositeCtrl.prototype.findControllers = function(controllerClass)
{
    throw("Method 'findControllers' of the class 'ICad.Controller.AbstractCompositeCtrl' should be implemented");
};

/**
 * Remove a controller from this controller.
 * @access public
 * @param {ICad.ICad.Controller.AbstractCtrl} controller Controller to remove.
 * @return {void}
 */
ICad.Controller.AbstractCompositeCtrl.prototype.removeController = function(controller)
{
    throw("Method 'removeController' of the class 'ICad.Controller.AbstractCompositeCtrl' should be implemented");
};

/**
 * Remove all controllers from this controller.
 * @access public
 * @return {void}
 */
ICad.Controller.AbstractCompositeCtrl.prototype.removeControllers = function()
{
    throw("Method 'removeControllers' of the class 'ICad.Controller.AbstractCompositeCtrl' should be implemented");
};

// Stop use strict
})();
