// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Model = ICad.Model || {};
ICad.Model.Well = ICad.Model.Well || {};

// Start use strict
(function(){
'use strict';

/**
 * Regroups all the data related to a depth measurement.
 * @class
 * @extends ICad.ICad.Model.AbstractModel
 * @memberof ICad.Model.Well
 * @constructor
 * @param {ICad.ICad.Model.Well.TraceCollection} collection Collection used to retrieve  this trace data.
 * @param {number} index Index of the trace in the collection.
 */
ICad.Model.Well.Trace = function(collection, index)
{
    // Call inherited classes constructor
    ICad.ICad.Model.AbstractModel.apply(this, Array.from(arguments));

    /**
     * Reference of this trace.
     * @type {number}
     * @access public
     */
    this.reference = null;

    /**
     * Data of this trace.
     * @type {Array<any>}
     * @access public
     */
    this.data = null;

    /**
     * Log  which contain this borehole.
     * @type {ICad.ICad.Model.Well.Log}
     * @access public
     */
    this.log = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Model.Well.Trace, ICad.ICad.Model.AbstractModel);

// Stop use strict
})();
