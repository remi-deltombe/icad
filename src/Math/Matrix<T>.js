// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.Math = ICad.Math || {};

// Start use strict
(function(){
'use strict';

/**
 * Flexible array of 2 dimension.
 * @class
 * @memberof ICad.Math
 * @constructor
 */
ICad.Math.Matrix<T> = function()
{
    /**
     * Width of this matrix.
     * @type {number}
     * @access public
     */
    this.width = null;

    /**
     * Height of this matrix.
     * @type {number}
     * @access public
     */
    this.height = null;

    /**
     * Buffer of this matrix
     * @type {Array<number>}
     * @access public
     */
    this.data = null;
};

/**
 * Allocate this matrix buffer. 
 * It is not a requirement but it will improve the push performance.
 * @access public
 * @param  width New width of this matrix
 * @param  height New height of this matrix
 * @return {void}
 */
ICad.Math.Matrix<T>.prototype.allocate = function(width, height)
{
    throw("Method 'allocate' of the class 'ICad.Math.Matrix<T>' should be implemented");
};

/**
 * Retrieve a data in this matrix
 * @access public
 * @param {number} x X axis coordonate
 * @param {number} y Y axis coordonate
 * @return {T} Asked value
 */
ICad.Math.Matrix<T>.prototype.at = function(x, y)
{
    throw("Method 'at' of the class 'ICad.Math.Matrix<T>' should be implemented");
};

/**
 * Call a function on each data contained by this matrix.
 * @access public
 * @param {Function} fn Function to execute,Prototype : (value:T, x:number, y:number)
 * @return {void}
 */
ICad.Math.Matrix<T>.prototype.forEach = function(fn)
{
    throw("Method 'forEach' of the class 'ICad.Math.Matrix<T>' should be implemented");
};

/**
 * Call a function on each data contained by this matrix and replace its content by the result of this callback.
 * @access public
 * @param {Function} fn Function to execute,Prototype : (value:T, x:number, y:number) : T
 * @return {void}
 */
ICad.Math.Matrix<T>.prototype.map = function(fn)
{
    throw("Method 'map' of the class 'ICad.Math.Matrix<T>' should be implemented");
};

/**
 * Return a specified line of data.
 * @access public
 * @param {number} y Y axis coordonate
 * @return {Array<T>} Asked line
 */
ICad.Math.Matrix<T>.prototype.line = function(y)
{
    throw("Method 'line' of the class 'ICad.Math.Matrix<T>' should be implemented");
};

/**
 * Return a specified line of data.
 * @access public
 * @param {number} x X axis coordonate
 * @return {Array<T>} Asked column
 */
ICad.Math.Matrix<T>.prototype.column = function(x)
{
    throw("Method 'column' of the class 'ICad.Math.Matrix<T>' should be implemented");
};

// Stop use strict
})();
