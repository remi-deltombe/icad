// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};
ICad.View.DOM = ICad.View.DOM || {};

// Start use strict
(function(){
'use strict';

/**
 * View factory in a DOM context.
 * @class
 * @extends ICad.ICad.View.AbstractFactory
 * @memberof ICad.View.DOM
 * @constructor
 */
ICad.View.DOM.Factory = function()
{
    // Call inherited classes constructor
    ICad.ICad.View.AbstractFactory.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.View.DOM.Factory, ICad.ICad.View.AbstractFactory);

// Stop use strict
})();
