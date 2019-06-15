// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Action = ICad.Action || {};

// Start use strict
(function(){
'use strict';

/**
 * This action open a project in the workspace.
 * @class
 * @extends ICad.ICad.Action.Action
 * @memberof ICad.Action
 * @constructor
 * @param {AbstractApplication} app App to configure
 * @param {ICad.ICad.Model.Well.Project} project Project to open
 */
ICad.Action.OpenProject = function(app, project)
{
    // Call inherited classes constructor
    ICad.ICad.Action.Action.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Action.OpenProject, ICad.ICad.Action.Action);

// Stop use strict
})();
