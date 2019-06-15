// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Model = ICad.Model || {};
ICad.Model.Well = ICad.Model.Well || {};

// Start use strict
(function(){
'use strict';

/**
 * Regroups all the data related to a  well.
 * @class
 * @extends ICad.ICad.Model.AbstractModel
 * @memberof ICad.Model.Well
 * @constructor
 */
ICad.Model.Well.Borehole = function()
{
    // Call inherited classes constructor
    ICad.ICad.Model.AbstractModel.apply(this, Array.from(arguments));

    /**
     * Name of this borehole.
     * @type {string}
     * @access public
     */
    this.name = null;

    /**
     * Logs contained by this borehole.
     * @type {Map<string, Project>}
     * @access public
     */
    this.logs = null;

    /**
     * Project which contain this borehole.
     * @type {ICad.ICad.Model.Well.Project}
     * @access public
     */
    this.project = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Model.Well.Borehole, ICad.ICad.Model.AbstractModel);

// Stop use strict
})();
