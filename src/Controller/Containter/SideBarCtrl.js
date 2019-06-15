// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Controller = ICad.Controller || {};
ICad.Controller.Containter = ICad.Controller.Containter || {};

// Start use strict
(function(){
'use strict';

/**
 * SideBarCtrl handle both the left menu and right menu.
 * @class
 * @extends ICad.ICad.Controller.Containter.AbstractTablularCtrl
 * @memberof ICad.Controller.Containter
 * @constructor
 */
ICad.Controller.Containter.SideBarCtrl = function()
{
    // Call inherited classes constructor
    ICad.ICad.Controller.Containter.AbstractTablularCtrl.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Controller.Containter.SideBarCtrl, ICad.ICad.Controller.Containter.AbstractTablularCtrl);

// Stop use strict
})();
