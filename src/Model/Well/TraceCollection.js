// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Model = ICad.Model || {};
ICad.Model.Well = ICad.Model.Well || {};

// Start use strict
(function(){
'use strict';

/**
 * Group of traces.
 * @class
 * @extends ICad.ICad.Model.AbstractModelCollection<T>
 * @memberof ICad.Model.Well
 * @constructor
 */
ICad.Model.Well.TraceCollection = function()
{
    // Call inherited classes constructor
    ICad.ICad.Model.AbstractModelCollection<T>.apply(this, Array.from(arguments));

    /**
     * Data of this collections.
     * @type {Matrix<number>}
     * @access public
     */
    this.data = null;

    /**
     * Reference of this collections.
     * @type {Array<number>}
     * @access public
     */
    this.references = null;

    /**
     * Log which contain this collection
     * @type {ICad.ICad.Model.Well.Log}
     * @access public
     */
    this.log = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Model.Well.TraceCollection, ICad.ICad.Model.AbstractModelCollection<T>);

/**
 * Find a trace for a given reference.
 * @access public
 * @param {number} reference Reference used to find the trace.
 * @return {ICad.ICad.Model.Well.Trace} Founded trace.
 */
ICad.Model.Well.TraceCollection.prototype.atReference = function(reference)
{
    throw("Method 'atReference' of the class 'ICad.Model.Well.TraceCollection' should be implemented");
};

// Stop use strict
})();
