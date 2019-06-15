// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.Form = ICad.View.Form || {};

// Start use strict
(function(){
'use strict';

/**
 * DOM implementation of the FormInterface.
 * @class
 * @extends ICad.ICad.View.DOM.DOMEmitter
 * @memberof ICad.View.Form
 * @constructor
 */
ICad.View.Form.FormDOM = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.DOMEmitter.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.Form.FormDOM, ICad.ICad.View.DOM.DOMEmitter);

/**
 * Submit this form.
 * @access public
 * @return {void}
 */
ICad.View.Form.FormDOM.prototype.submit = function()
{
    throw("Method 'submit' of the class 'ICad.View.Form.FormDOM' should be implemented");
};

// Stop use strict
})();
