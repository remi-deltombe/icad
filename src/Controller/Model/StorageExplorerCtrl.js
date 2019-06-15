// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Controller = ICad.Controller || {};
ICad.Controller.Model = ICad.Controller.Model || {};

// Start use strict
(function(){
'use strict';

/**
 * Controller which display a list of the data browsable in its storages.
 * @class
 * @extends ICad.ICad.Controller.AbstractCompositeCtrl
 * @memberof ICad.Controller.Model
 * @constructor
 */
ICad.Controller.Model.StorageExplorerCtrl = function()
{
    // Call inherited classes constructor
    ICad.ICad.Controller.AbstractCompositeCtrl.apply(this, Array.from(arguments));

    /**
     * Storages used by this controller.
     * @type {Array<AbstractStorage>}
     * @access public
     */
    this.storages = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Controller.Model.StorageExplorerCtrl, ICad.ICad.Controller.AbstractCompositeCtrl);

// Stop use strict
})();
