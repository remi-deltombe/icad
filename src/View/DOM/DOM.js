// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.DOM = ICad.View.DOM || {};

// Start use strict
(function(){
'use strict';

/**
 * View which is displayed in the DOM.
 * @class
 * @extends ICad.ICad.View.AbstractView
 * @memberof ICad.View.DOM
 * @constructor
 */
ICad.View.DOM.DOM = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.AbstractView.apply(this, Array.from(arguments));

    /**
     * HTML dom element of this view.
     * @type {Element}
     * @access public
     */
    this.dom = null;

    /**
     * Template used to create this view's dom content.
     * @type {string}
     * @access public
     */
    this.template = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.DOM.DOM, ICad.ICad.View.AbstractView);

/**
 * Render as a dom with its template.
 * It will add its dom to the nearest parent of type DOM.
 * @access public
 * @return {void}
 */
ICad.View.DOM.DOM.prototype.render = function()
{
    throw("Method 'render' of the class 'ICad.View.DOM.DOM' should be implemented");
};

/**
 * Render as a dom with its template.
 * It will add its dom to the nearest parent of type DOM.
 * @access public
 * @return {void}
 */
ICad.View.DOM.DOM.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.DOM.DOM' should be implemented");
};

// Stop use strict
})();
