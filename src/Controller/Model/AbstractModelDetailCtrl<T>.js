// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Controller = ICad.Controller || {};
ICad.Controller.Model = ICad.Controller.Model || {};

// Start use strict
(function(){
'use strict';

/**
 * Controller which are dedicated to one instance of a model base class.
 * @class
 * @extends ICad.ICad.Controller.Model.AbstractModelCtrl<T>
 * @memberof ICad.Controller.Model
 * @constructor
 */
ICad.Controller.Model.AbstractModelDetailCtrl<T> = function()
{
    // Call inherited classes constructor
    ICad.ICad.Controller.Model.AbstractModelCtrl<T>.apply(this, Array.from(arguments));

    /**
     * Model used by this controller.
     * @type {T}
     * @access public
     */
    this.model = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Controller.Model.AbstractModelDetailCtrl<T>, ICad.ICad.Controller.Model.AbstractModelCtrl<T>);

// Stop use strict
})();
