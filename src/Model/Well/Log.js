// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Model = ICad.Model || {};
ICad.Model.Well = ICad.Model.Well || {};

// Start use strict
(function(){
'use strict';

/**
 * Regroups all the data related to tool recording.
 * @class
 * @extends ICad.ICad.Model.AbstractModel
 * @memberof ICad.Model.Well
 * @constructor
 */
ICad.Model.Well.Log = function()
{
    // Call inherited classes constructor
    ICad.ICad.Model.AbstractModel.apply(this, Array.from(arguments));

    /**
     * Name of this log.
     * @type {string}
     * @access public
     */
    this.name = null;

    /**
     * Recording unit  of this log's data.
     * @type {string}
     * @access public
     */
    this.unit = null;

    /**
     * Preference which describe how the log should be displayed.
     * @type {ICad.ICad.Model.Preference.DisplayPreference}
     * @access public
     */
    this.display = null;

    /**
     * Traces contained by this log.
     * @type {ICad.ICad.Model.Well.TraceCollection}
     * @access public
     */
    this.traces = null;

    /**
     * Borehole  which contain this log.
     * @type {ICad.ICad.Model.Well.Borehole}
     * @access public
     */
    this.borehole = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Model.Well.Log, ICad.ICad.Model.AbstractModel);

// Stop use strict
})();
