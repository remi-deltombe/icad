// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.Form = ICad.View.Form || {};
ICad.View.Form.Input = ICad.View.Form.Input || {};
ICad.View.Form.Input.TextField = ICad.View.Form.Input.TextField || {};

// Start use strict
(function(){
'use strict';

/**
 * DOM implementation of the TextField.
 * @class
 * @extends ICad.ICad.View.DOM.DOMEmitter
 * @memberof ICad.View.Form.Input.TextField
 * @constructor
 */
ICad.View.Form.Input.TextField.TextFieldDOM = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.DOMEmitter.apply(this, Array.from(arguments));

    /**
     * Text display to the user about the meaning of this filed.
     * @type {string}
     * @access public
     */
    this.title = null;

    /**
     * Name used to identify this input.
     * @type {string}
     * @access public
     */
    this.name = null;

    /**
     * Value of this input.
     * @type {string}
     * @access public
     */
    this.value = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.Form.Input.TextField.TextFieldDOM, ICad.ICad.View.DOM.DOMEmitter);

/**
 * Render this input as a text input.
 * @access public
 * @return {void}
 */
ICad.View.Form.Input.TextField.TextFieldDOM.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.Form.Input.TextField.TextFieldDOM' should be implemented");
};

/**
 * Set this input as the current edited one by the user.
 * @access public
 * @return {void}
 */
ICad.View.Form.Input.TextField.TextFieldDOM.prototype.focus = function()
{
    throw("Method 'focus' of the class 'ICad.View.Form.Input.TextField.TextFieldDOM' should be implemented");
};

// Stop use strict
})();
