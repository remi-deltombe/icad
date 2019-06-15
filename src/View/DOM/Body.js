// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.DOM = ICad.View.DOM || {};

// Start use strict
(function(){
'use strict';

/**
 * Body tag view abstraction view.
 * @class
 * @extends ICad.ICad.View.DOM.DOMEmitter
 * @memberof ICad.View.DOM
 * @constructor
 */
ICad.View.DOM.Body = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.DOM.DOMEmitter.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.DOM.Body, ICad.ICad.View.DOM.DOMEmitter);

// Stop use strict
})();
