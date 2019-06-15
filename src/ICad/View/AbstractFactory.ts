namespace ICad.View
{
    /**
     * AbstractFactory
     * @abstract
     */
    export abstract class AbstractFactory
    {
        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract root() : ICad.View.AbstractView
        
        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract container() : ICad.View.AbstractView
        
        /**
         * 
         * @abstract
        * @param {string} text 
        * @return {ICad.View.AbstractView}  
         */
        abstract paragraph(text : string) : ICad.View.AbstractView
        
        /**
         * 
         * @abstract
        * @param {string} text 
        ,* @param {number} level 
        * @return {ICad.View.AbstractView}  
         */
        abstract title(text : string, level : number) : ICad.View.AbstractView
        
        /**
         * 
         * @abstract
        * @param {string} text 
        * @return {ICad.View.AbstractView}  
         */
        abstract button(text : string) : ICad.View.AbstractView
        
        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract bitmap() : ICad.View.AbstractView

        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract png() : ICad.View.AbstractView
        
        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract list() : ICad.View.AbstractView
        
        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract listItem() : ICad.View.AbstractView

        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract traceHeatmap() : ICad.View.AbstractView

        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract traceImage() : ICad.View.AbstractView

        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract traceLines() : ICad.View.AbstractView


        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract chartHistogram() : ICad.View.AbstractView

        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract draw() : ICad.View.AbstractView

        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract draw3D() : ICad.View.AbstractView

        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract form() : ICad.View.AbstractView

        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract textfield(title : string, name : string, value : string) : ICad.View.AbstractView

        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract colorpicker(title : string, name : string, value : Math.Color.Color) : ICad.View.AbstractView

        /**
         * 
         * @abstract
        * @return {ICad.View.AbstractView}  
         */
        abstract ruler() : ICad.View.AbstractView
    }
}
