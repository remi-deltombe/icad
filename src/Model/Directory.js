// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Model = ICad.Model || {};

// Start use strict
(function(){
'use strict';

/**
 * Regroups projects together.
 * @class
 * @extends ICad.ICad.Model.AbstractModel
 * @memberof ICad.Model
 * @constructor
 */
ICad.Model.Directory = function()
{
    // Call inherited classes constructor
    ICad.ICad.Model.AbstractModel.apply(this, Array.from(arguments));

    /**
     * Name of this directory.
     * @type {string}
     * @access public
     */
    this.name = null;

    /**
     * Projects contained by this directory.
     * @type {Map<string, Project>}
     * @access public
     */
    this.projects = null;
};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Model.Directory, ICad.ICad.Model.AbstractModel);

// Stop use strict
})();
