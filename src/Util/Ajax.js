// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Util = ICad.Util || {};

// Start use strict
(function(){
'use strict';

/**
 * Helper which handle asynchronous HTTP request.
 * @class
 * @memberof ICad.Util
 * @constructor
 */
ICad.Util.Ajax = function()
{
};

/**
 * Execute an HTTP GET request.
 * @access public
 * @param {string} url Url to request.
 * @param {object} args? Arguments to passed to the request.,Structure : {,    argName1 : argValue1,,    argName2 : argValue2,,    argName3 : argValue3,}
 * @return {Promise<string>} Promise resolved with the response of the HTTP request
 */
ICad.Util.Ajax.get = function(url, args?)
{
    throw("Method 'get' of the class 'ICad.Util.Ajax' should be implemented");
};

/**
 * Execute an HTTP POST request.
 * @access public
 * @param {string} url Url to request.
 * @param {object} args? Arguments to passed to the request.,Structure : {,    argName1 : argValue1,,    argName2 : argValue2,,    argName3 : argValue3,}
 * @return {Promise<string>} Promise resolved with the response of the HTTP request
 */
ICad.Util.Ajax.post = function(url, args?)
{
    throw("Method 'post' of the class 'ICad.Util.Ajax' should be implemented");
};

/**
 * Execute an HTTP PUT request.
 * @access public
 * @param {string} url Url to request.
 * @param {object} args? Arguments to passed to the request.,Structure : {,    argName1 : argValue1,,    argName2 : argValue2,,    argName3 : argValue3,}
 * @return {Promise<string>} Promise resolved with the response of the HTTP request
 */
ICad.Util.Ajax.put = function(url, args?)
{
    throw("Method 'put' of the class 'ICad.Util.Ajax' should be implemented");
};

/**
 * Execute an HTTP DELETE request.
 * @access public
 * @param {string} url Url to request.
 * @param {object} args? Arguments to passed to the request.,Structure : {,    argName1 : argValue1,,    argName2 : argValue2,,    argName3 : argValue3,}
 * @return {Promise<string>} Promise resolved with the response of the HTTP request
 */
ICad.Util.Ajax.delete = function(url, args?)
{
    throw("Method 'delete' of the class 'ICad.Util.Ajax' should be implemented");
};

// Stop use strict
})();
