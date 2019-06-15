// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Model = ICad.Model || {};
ICad.Model.Well = ICad.Model.Well || {};

// Start use strict
(function(){
'use strict';

/**
 * Group of logs.
 * @class
 * @extends ICad.ICad.Model.AbstractModelCollection<T>
 * @memberof ICad.Model.Well
 * @constructor
 */
ICad.Model.Well.LogCollection = function()
{
    // Call inherited classes constructor
    ICad.ICad.Model.AbstractModelCollection<T>.apply(this, Array.from(arguments));

    /**
     * Logs contained in this collection.
     * @type {Map<string, Log>}
     * @access public
     */
    this.logs = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Model.Well.LogCollection, ICad.ICad.Model.AbstractModelCollection<T>);

// Stop use strict
})();
