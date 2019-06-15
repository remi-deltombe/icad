// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Storage = ICad.Storage || {};
ICad.Storage.StoreJS = ICad.Storage.StoreJS || {};

// Start use strict
(function(){
'use strict';

/**
 * Storage used to develop the application.
 * @class
 * @extends ICad.ICad.Storage.AbstractStorage
 * @memberof ICad.Storage.StoreJS
 * @constructor
 * @param  url Url of this storage API.
 */
ICad.Storage.StoreJS.Rest = function(url)
{
    // Call inherited classes constructor
    ICad.ICad.Storage.AbstractStorage.apply(this, Array.from(arguments));

};

// Inherit mother classes 
ICad.Util.Class.extend(ICad.Storage.StoreJS.Rest, ICad.ICad.Storage.AbstractStorage);

/**
 * Retrieve the directories of this storage, based on a query.
 * @access public
 * @param {Query<Directory>} query Query used to retrieve directories.
 * @return {Promise<Map<string,Directory>>} Found directories
 */
ICad.Storage.StoreJS.Rest.prototype.getDirectories = function(query)
{
    throw("Method 'getDirectories' of the class 'ICad.Storage.StoreJS.Rest' should be implemented");
};

/**
 * Retrieve the projects of this storage, based on a query.
 * @access public
 * @param {Query<Directory>} query Query used to retrieve projects.
 * @return {Promise<Map<string,Project>>} Found projects
 */
ICad.Storage.StoreJS.Rest.prototype.getProjects = function(query)
{
    throw("Method 'getProjects' of the class 'ICad.Storage.StoreJS.Rest' should be implemented");
};

/**
 * Retrieve the boreholes of this storage, based on a query.
 * @access public
 * @param {Query<Project>} query Query used to retrieve boreholes.
 * @return {Promise<Map<string,Borehole>>} Found boreholes
 */
ICad.Storage.StoreJS.Rest.prototype.getBoreholes = function(query)
{
    throw("Method 'getBoreholes' of the class 'ICad.Storage.StoreJS.Rest' should be implemented");
};

/**
 * Retrieve the logs of this storage, based on a query.
 * @access public
 * @param {Query<Borehole>} query Query used to retrieve logs.
 * @return {Promise<Map<string,Log>>} Found logs
 */
ICad.Storage.StoreJS.Rest.prototype.getLogs = function(query)
{
    throw("Method 'getLogs' of the class 'ICad.Storage.StoreJS.Rest' should be implemented");
};

/**
 * Retrieve the traces of this storage, based on a query.
 * @access public
 * @param {Query<Log>} query Query used to retrieve traces.
 * @return { Promise<TraceCollection>} Found traces
 */
ICad.Storage.StoreJS.Rest.prototype.getTraces = function(query)
{
    throw("Method 'getTraces' of the class 'ICad.Storage.StoreJS.Rest' should be implemented");
};

// Stop use strict
})();
