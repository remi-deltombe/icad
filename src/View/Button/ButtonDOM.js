// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.Button = ICad.View.Button || {};

// Start use strict
(function(){
'use strict';

/**
 * DOM implementation of the ButtonInterface
 * @class
 * @extends ICad.ICad.View.DOM.DOMEmitter
 * @memberof ICad.View.Button
 * @constructor
 */
ICad.View.Button.ButtonDOM = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.DOMEmitter.apply(this, Array.from(arguments));

    /**
     * Text to display.
     * @type {string}
     * @access public
     */
    this.text = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.Button.ButtonDOM, ICad.ICad.View.DOM.DOMEmitter);

/**
 * Render this button as <button>{text}<button>
 * @access public
 * @return {void}
 */
ICad.View.Button.ButtonDOM.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.Button.ButtonDOM' should be implemented");
};

// Stop use strict
})();
