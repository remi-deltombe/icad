// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Model = ICad.Model || {};

// Start use strict
(function(){
'use strict';

/**
 * Model's collection base class.
 * @class
 * @abstract
 * @memberof ICad.Model
 * @constructor
 */
ICad.Model.AbstractModelCollection<T> = function()
{
};

/**
 * Retrieve a model, based on its uuid.
 * @access public
 * @param {string} uuid Uuid of the model to retreive
 * @return {T} Searched model.
 */
ICad.Model.AbstractModelCollection<T>.prototype.withUuid = function(uuid)
{
    throw("Method 'withUuid' of the class 'ICad.Model.AbstractModelCollection<T>' should be implemented");
};

/**
 * Add a model to this collection.
 * @access public
 * @param {T} model Model to add
 * @return {void}
 */
ICad.Model.AbstractModelCollection<T>.prototype.add = function(model)
{
    throw("Method 'add' of the class 'ICad.Model.AbstractModelCollection<T>' should be implemented");
};

// Stop use strict
})();
