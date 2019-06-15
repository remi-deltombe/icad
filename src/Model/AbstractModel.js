// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Model = ICad.Model || {};

// Start use strict
(function(){
'use strict';

/**
 * Model base class.
 * Models contain the data used by the application.
 * @class
 * @abstract
 * @extends ICad.ICad.Event.EventEmitter
 * @memberof ICad.Model
 * @constructor
 */
ICad.Model.AbstractModel = function()
{
    // Call inherited classes constructor
    ICad.ICad.Event.EventEmitter.apply(this, Array.from(arguments));

    /**
     * Identifier of the model.
     * Each identifers are unique across all kinds of model.
     * @type {string}
     * @access public
     */
    this.uuid = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Model.AbstractModel, ICad.ICad.Event.EventEmitter);

// Stop use strict
})();
