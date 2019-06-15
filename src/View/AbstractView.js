// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};

// Start use strict
(function(){
'use strict';

/**
 * View base class.
 * Views interacts with the user.
 * They display informations to screen an catch the user actions.
 * 
 * A view can be embedded inside an other view.
 * Its rendering will be done inside this parent view.
 * @class
 * @extends ICad.ICad.Event.EventEmitter
 * @memberof ICad.View
 * @constructor
 */
ICad.View.AbstractView = function()
{
    // Call inherited classes constructor
    ICad.ICad.Event.EventEmitter.apply(this, Array.from(arguments));

    /**
     * Classes are used to apply predefined visual style to a view.
     * All classes are imploded by a space character.
     * @type {string}
     * @access public
     */
    this.classes = null;

    /**
     * Views contained by this view
     * @type {Array<ViewInterface>}
     * @access public
     */
    this.children = null;

    /**
     * View which contains this view
     * @type {ICad.ICad.View.ViewInterface}
     * @access public
     */
    this.parent = null;

    /**
     * Position of this view on the screen.
     * @type {Math.Geometry.Rectangle}
     * @access public
     */
    this.position = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.AbstractView, ICad.ICad.Event.EventEmitter);

/**
 * Refresh the render of this view.
 * All children of this view are refreshing too.
 * Trigger the event "render.before".
 * Trigger the event "render.after".
 * @access public
 * @return {void}
 */
ICad.View.AbstractView.prototype.render = function()
{
    throw("Method 'render' of the class 'ICad.View.AbstractView' should be implemented");
};

/**
 * Refresh the render of this view without destroying existing elements, they will only be updated.
 * All children of this view are refreshing too.
 * Trigger the event "render.before".
 * Trigger the event "render.after".
 * @access public
 * @return {void}
 */
ICad.View.AbstractView.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.AbstractView' should be implemented");
};

/**
 * Remove this view from the screen. 
 * @access public
 * @return {void}
 */
ICad.View.AbstractView.prototype.clear = function()
{
    throw("Method 'clear' of the class 'ICad.View.AbstractView' should be implemented");
};

/**
 * Specify that this view should be rendered soon as possible.
 * @access public
 * @return {void}
 */
ICad.View.AbstractView.prototype.invalidate = function()
{
    throw("Method 'invalidate' of the class 'ICad.View.AbstractView' should be implemented");
};

/**
 * Add a child to this view.
 * Remove the child of the old parent, if needed.
 * @access public
 * @param {viewInterface} child Child to add
 * @return {void}
 */
ICad.View.AbstractView.prototype.addChild = function(child)
{
    throw("Method 'addChild' of the class 'ICad.View.AbstractView' should be implemented");
};

/**
 * Remove a child from this view.
 * @access public
 * @param {viewInterface} child Child to remove
 * @return {void}
 */
ICad.View.AbstractView.prototype.removeChild = function(child)
{
    throw("Method 'removeChild' of the class 'ICad.View.AbstractView' should be implemented");
};

/**
 * Remove all the children contained by this view.
 * @access public
 * @return {void}
 */
ICad.View.AbstractView.prototype.removeChildren = function()
{
    throw("Method 'removeChildren' of the class 'ICad.View.AbstractView' should be implemented");
};

/**
 * Does this view have all these classes?
 * @access public
 * @param {string} classes Classes to tests, imploded with a space.
 * @return {boolean} Does this view have all these classes?
 */
ICad.View.AbstractView.prototype.hasClasses = function(classes)
{
    throw("Method 'hasClasses' of the class 'ICad.View.AbstractView' should be implemented");
};

/**
 * Add some classes to this view.
 * @access public
 * @param {string} classes Classes to add, imploded with a space.
 * @return {void}
 */
ICad.View.AbstractView.prototype.addClasses = function(classes)
{
    throw("Method 'addClasses' of the class 'ICad.View.AbstractView' should be implemented");
};

/**
 * Remove some classes to this view.
 * @access public
 * @param {string} classes Classes to remove, imploded with a space.
 * @return {void}
 */
ICad.View.AbstractView.prototype.removeClasses = function(classes)
{
    throw("Method 'removeClasses' of the class 'ICad.View.AbstractView' should be implemented");
};

/**
 * Toggle some classes to this view.
 * @access public
 * @param {string} classes Classes to toggle, imploded with a space.
 * @return {void}
 */
ICad.View.AbstractView.prototype.toggleClasses = function(classes)
{
    throw("Method 'toggleClasses' of the class 'ICad.View.AbstractView' should be implemented");
};

// Stop use strict
})();
