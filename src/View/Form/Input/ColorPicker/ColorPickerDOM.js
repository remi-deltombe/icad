// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.Form = ICad.View.Form || {};
ICad.View.Form.Input = ICad.View.Form.Input || {};
ICad.View.Form.Input.ColorPicker = ICad.View.Form.Input.ColorPicker || {};

// Start use strict
(function(){
'use strict';

/**
 * DOM implementation of the ColorPickerInterface.
 * @class
 * @extends ICad.ICad.View.DOM.DOMEmitter
 * @memberof ICad.View.Form.Input.ColorPicker
 * @constructor
 */
ICad.View.Form.Input.ColorPicker.ColorPickerDOM = function()
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
     * @type {Math.Color.Color}
     * @access public
     */
    this.value = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.Form.Input.ColorPicker.ColorPickerDOM, ICad.ICad.View.DOM.DOMEmitter);

/**
 * Render this input as a color selector.
 * @access public
 * @return {void}
 */
ICad.View.Form.Input.ColorPicker.ColorPickerDOM.prototype.update = function()
{
    throw("Method 'update' of the class 'ICad.View.Form.Input.ColorPicker.ColorPickerDOM' should be implemented");
};

/**
 * Set this input as the current edited one by the user.
 * @access public
 * @return {void}
 */
ICad.View.Form.Input.ColorPicker.ColorPickerDOM.prototype.focus = function()
{
    throw("Method 'focus' of the class 'ICad.View.Form.Input.ColorPicker.ColorPickerDOM' should be implemented");
};

// Stop use strict
})();
