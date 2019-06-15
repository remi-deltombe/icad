// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.DOM = ICad.View.DOM || {};

// Start use strict
(function(){
'use strict';

/**
 * DOM view which propagate dom event as an ICad event.
 * @class
 * @extends ICad.ICad.View.DOM.DOM
 * @memberof ICad.View.DOM
 * @constructor
 */
ICad.View.DOM.DOMEmitter = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.DOM.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.DOM.DOMEmitter, ICad.ICad.View.DOM.DOM);

/**
 * Render and bind event.
 * @access public
 * @return {void}
 */
ICad.View.DOM.DOMEmitter.prototype.render = function()
{
    throw("Method 'render' of the class 'ICad.View.DOM.DOMEmitter' should be implemented");
};

// Stop use strict
})();
