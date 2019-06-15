// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Action = ICad.Action || {};

// Start use strict
(function(){
'use strict';

/**
 * This action enable or disable the live statistics displayed on the cursor, depending of its current state
 * @class
 * @extends ICad.ICad.Action.Action
 * @memberof ICad.Action
 * @constructor
 */
ICad.Action.ToggleLiveStat = function()
{
    // Call inherited classes constructor
    ICad.ICad.Action.Action.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Action.ToggleLiveStat, ICad.ICad.Action.Action);

// Stop use strict
})();
