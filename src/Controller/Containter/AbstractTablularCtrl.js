// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Controller = ICad.Controller || {};
ICad.Controller.Containter = ICad.Controller.Containter || {};

// Start use strict
(function(){
'use strict';

/**
 * Tabular controller handle a menu of item.
 * These item are all associated to a controller or an Action . 
 * When a item is activated (as example, by clicking on a button), its controller is started and displayed.
 * If it's associated to action, the action is ran instead.
 * @class
 * @extends ICad.ICad.Controller.AbstractCompositeCtrl
 * @memberof ICad.Controller.Containter
 * @constructor
 */
ICad.Controller.Containter.AbstractTablularCtrl = function()
{
    // Call inherited classes constructor
    ICad.ICad.Controller.AbstractCompositeCtrl.apply(this, Array.from(arguments));

    /**
     * Current active controller.
     * @type {ICad.ICad.Controller.AbstractCtrl}
     * @access public
     */
    this.active = null;

    /**
     * Menu of item used to select the active controller.
     * @type {ICad.View.AbstractView}
     * @access public
     */
    this.tabs = null;

    /**
     * Content where the active controller is displayed.
     * @type {ICad.View.AbstractView}
     * @access public
     */
    this.content = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Controller.Containter.AbstractTablularCtrl, ICad.ICad.Controller.AbstractCompositeCtrl);

/**
 * Add an item linked to an Action.
 * @access public
 * @param {ICad.ICad.Action.Action} action Action to bind on the item
 * @param {ICad.ICad.View.AbstractView} title? View used to start the action.
 * @return {void}
 */
ICad.Controller.Containter.AbstractTablularCtrl.prototype.addAction = function(action, title?)
{
    throw("Method 'addAction' of the class 'ICad.Controller.Containter.AbstractTablularCtrl' should be implemented");
};

/**
 * Add an item linked to an Action.
 * @access public
 * @param {ICad.ICad.Controller.AbstractCtrl} controller Controller to bind on the item
 * @param {ICad.ICad.View.AbstractView} title? View used to start the action.Action to bind on the item
 * @return {void}
 */
ICad.Controller.Containter.AbstractTablularCtrl.prototype.addController = function(controller, title?)
{
    throw("Method 'addController' of the class 'ICad.Controller.Containter.AbstractTablularCtrl' should be implemented");
};

// Stop use strict
})();
