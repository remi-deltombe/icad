// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Action = ICad.Action || {};

// Start use strict
(function(){
'use strict';

/**
 * Create a new action OpenLog
 * @class
 * @extends ICad.ICad.Action.Action
 * @memberof ICad.Action
 * @constructor
 * @param {AbstractApplication} app App used to configure.
 * @param {ICad.ICad.Model.Well.Log} log Log which is used to find the project  to open.
 */
ICad.Action.OpenLog = function(app, log)
{
    // Call inherited classes constructor
    ICad.ICad.Action.Action.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Action.OpenLog, ICad.ICad.Action.Action);

// Stop use strict
})();
