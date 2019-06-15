// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Model = ICad.Model || {};
ICad.Model.Well = ICad.Model.Well || {};

// Start use strict
(function(){
'use strict';

/**
 * Regroups all the data related a same job or field.
 * @class
 * @extends ICad.ICad.Model.AbstractModel
 * @memberof ICad.Model.Well
 * @constructor
 */
ICad.Model.Well.Project = function()
{
    // Call inherited classes constructor
    ICad.ICad.Model.AbstractModel.apply(this, Array.from(arguments));

    /**
     * Name of this project.
     * @type {string}
     * @access public
     */
    this.name = null;

    /**
     * Boreholes contained by this project.
     * @type {Map<string, Borehole>}
     * @access public
     */
    this.boreholes = null;

    /**
     * Directory which contain this project.
     * @type {ICad.ICad.Model.Directory}
     * @access public
     */
    this.directory = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Model.Well.Project, ICad.ICad.Model.AbstractModel);

// Stop use strict
})();
