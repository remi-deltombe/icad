// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Controller = ICad.Controller || {};
ICad.Controller.Model = ICad.Controller.Model || {};

// Start use strict
(function(){
'use strict';

/**
 * Controller which are dedicated to model base class.
 * @class
 * @extends ICad.ICad.Controller.AbstractCompositeCtrl
 * @memberof ICad.Controller.Model
 * @constructor
 */
ICad.Controller.Model.AbstractModelCtrl<T> = function()
{
    // Call inherited classes constructor
    ICad.ICad.Controller.AbstractCompositeCtrl.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Controller.Model.AbstractModelCtrl<T>, ICad.ICad.Controller.AbstractCompositeCtrl);

// Stop use strict
})();
