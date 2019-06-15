// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Model = ICad.Model || {};
ICad.Model.Preference = ICad.Model.Preference || {};

// Start use strict
(function(){
'use strict';

/**
 * Preference used to configure the rendering.
 * @class
 * @memberof ICad.Model.Preference
 * @constructor
 */
ICad.Model.Preference.DisplayPreference = function()
{
    /**
     * Minimum value to display.
     * @type {number}
     * @access public
     */
    this.min = null;

    /**
     * Maximum value to display.
     * @type {number}
     * @access public
     */
    this.max = null;

    /**
     * Colors used to render.
     * @type {Array<Math.Color.Color>}
     * @access public
     */
    this.colors = null;
};

// Stop use strict
})();
