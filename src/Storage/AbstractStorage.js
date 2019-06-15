// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Storage = ICad.Storage || {};

// Start use strict
(function(){
'use strict';

/**
 * Storage base case.
 * Provide a common interface to request remote data server.
 * @class
 * @memberof ICad.Storage
 * @constructor
 */
ICad.Storage.AbstractStorage = function()
{
    /**
     * Name of this storage
     * @type {string}
     * @access public
     */
    this.name = null;
};

/**
 * Retrieve the directories of this storage, based on a query.
 * @access public
 * @param {Query<Directory>} query Query used to retrieve directories.
 * @return {Promise<Map<string,Directory>>} Found directories
 */
ICad.Storage.AbstractStorage.prototype.getDirectories = function(query)
{
    throw("Method 'getDirectories' of the class 'ICad.Storage.AbstractStorage' should be implemented");
};

/**
 * Retrieve the projects of this storage, based on a query.
 * @access public
 * @param {Query<Directory>} query Query used to retrieve projects.
 * @return {Promise<Map<string,Project>>} Found projects
 */
ICad.Storage.AbstractStorage.prototype.getProjects = function(query)
{
    throw("Method 'getProjects' of the class 'ICad.Storage.AbstractStorage' should be implemented");
};

/**
 * Retrieve the boreholes of this storage, based on a query.
 * @access public
 * @param {Query<Project>} query Query used to retrieve boreholes.
 * @return {Promise<Map<string,Borehole>>} Found boreholes
 */
ICad.Storage.AbstractStorage.prototype.getBoreholes = function(query)
{
    throw("Method 'getBoreholes' of the class 'ICad.Storage.AbstractStorage' should be implemented");
};

/**
 * Retrieve the logs of this storage, based on a query.
 * @access public
 * @param {Query<Borehole>} query Query used to retrieve logs.
 * @return {Promise<Map<string,Log>>} Found logs
 */
ICad.Storage.AbstractStorage.prototype.getLogs = function(query)
{
    throw("Method 'getLogs' of the class 'ICad.Storage.AbstractStorage' should be implemented");
};

/**
 * Retrieve the traces of this storage, based on a query.
 * @access public
 * @param {Query<Log>} query Query used to retrieve traces.
 * @return { Promise<TraceCollection>} Found traces
 */
ICad.Storage.AbstractStorage.prototype.getTraces = function(query)
{
    throw("Method 'getTraces' of the class 'ICad.Storage.AbstractStorage' should be implemented");
};

// Stop use strict
})();
