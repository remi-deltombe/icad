// Namespaces
var ICad = typeof ICad != "undefined" ? ICad : {};
ICad.View = ICad.View || {};

// Start use strict
(function(){
'use strict';

/**
 * @class
 * @memberof ICad.View
 * @constructor
 */
ICad.View.AbstractFactory = function()
{
};

/**
 * Return the base view which contain all the others view.
 * As example, the body in a DOM context.
 * @access public
 * @return {ICad.ICad.View.ViewInterface} Root view
 */
ICad.View.AbstractFactory.prototype.root = function()
{
    throw("Method 'root' of the class 'ICad.View.AbstractFactory' should be implemented");
};

/**
 * Instantiate a basic container view.
 * @access public
 * @return {ViewIntetfface} Container instantiated
 */
ICad.View.AbstractFactory.prototype.container = function()
{
    throw("Method 'container' of the class 'ICad.View.AbstractFactory' should be implemented");
};

/**
 * Instantiate a view button.
 * @access public
 * @param {string} text Text to display inside the button.
 * @return {ICad.ICad.View.Button.ButtonInterface} Button instantiated
 */
ICad.View.AbstractFactory.prototype.button = function(text)
{
    throw("Method 'button' of the class 'ICad.View.AbstractFactory' should be implemented");
};

/**
 * Instantiate a view which render log's data as an heatmap.
 * @access public
 * @return {ICad.ICad.View.Trace.HeatmapInterface} Heatmap instantiated.
 */
ICad.View.AbstractFactory.prototype.traceHeatmap = function()
{
    throw("Method 'traceHeatmap' of the class 'ICad.View.AbstractFactory' should be implemented");
};

/**
 * Instantiate a view which render log's data as a line chart.
 * @access public
 * @return {ICad.ICad.View.Trace.LineInterface} Line chart instantiated.
 */
ICad.View.AbstractFactory.prototype.traceLine = function()
{
    throw("Method 'traceLine' of the class 'ICad.View.AbstractFactory' should be implemented");
};

/**
 * Instantiate a view which render log's data as an image.
 * @access public
 * @return {ICad.ICad.View.Trace.ImageInterface} Renderer instantiated.
 */
ICad.View.AbstractFactory.prototype.traceImage = function()
{
    throw("Method 'traceImage' of the class 'ICad.View.AbstractFactory' should be implemented");
};

/**
 * Instantiate a histogram view.
 * @access public
 * @return {ICad.ICad.View.Chart.ChartHistogramInterface} Histogram instantiated.
 */
ICad.View.AbstractFactory.prototype.chartHistogram = function()
{
    throw("Method 'chartHistogram' of the class 'ICad.View.AbstractFactory' should be implemented");
};

/**
 * Instantiate a form view.
 * @access public
 * @return {ICad.ICad.View.Form.FormInterface} Form instantiated
 */
ICad.View.AbstractFactory.prototype.form = function()
{
    throw("Method 'form' of the class 'ICad.View.AbstractFactory' should be implemented");
};

/**
 * Instantiate a form input of type text.
 * @access public
 * @param {string} name Name of the field
 * @return {ICad.ICad.View.Form.Input.TextField.TextFieldInterface} Field instantiated.
 */
ICad.View.AbstractFactory.prototype.textfield = function(name)
{
    throw("Method 'textfield' of the class 'ICad.View.AbstractFactory' should be implemented");
};

/**
 * Instantiate a form input of type color.
 * @access public
 * @param {string} name Name of the field
 * @return {ICad.ICad.View.Form.Input.ColorPicker.ColorPickerInterface} Field instantiated.
 */
ICad.View.AbstractFactory.prototype.colorpicker = function(name)
{
    throw("Method 'colorpicker' of the class 'ICad.View.AbstractFactory' should be implemented");
};

// Stop use strict
})();
