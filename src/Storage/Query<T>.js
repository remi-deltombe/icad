// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Storage = ICad.Storage || {};

// Start use strict
(function(){
'use strict';

/**
 * Query specify to the storage the xpected result.
 * @class
 * @memberof ICad.Storage
 * @constructor
 */
ICad.Storage.Query<T> = function()
{
    /**
     * List of field name which should be filled in the result
     * @type {Array<string>}
     * @access public
     */
    this.fields = null;

    /**
     * Used to filter the result based on the values.
     * Ex : 
     * {
     *     'name' : 'Log%' // Expect log with a name starting by Log
     * }
     * @type {any}
     * @access public
     */
    this.filter = null;

    /**
     * Field used to sort the result
     * @type {string}
     * @access public
     */
    this.sort = null;

    /**
     * Limit the number of returned objects.
     * Structure : 
     * {
     *     from : 0,
     *     to : 10
     * }
     * @type {any}
     * @access public
     */
    this.limit = null;

    /**
     * Parent used to filter the result.
     * As example, if the parent is a borehole, the result will be only a list of its logs.
     * @type {T}
     * @access public
     */
    this.parent = null;
};

// Stop use strict
})();
