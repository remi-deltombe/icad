namespace ICad.View.DOM.WebGL
{
    /**
     * CanvasWebGL
     */
    export abstract class Shader
    {
        /** */
        _content : string = ''

        /** */
        _shader : any = null

        /** */
        _context : WebGLRenderingContext = null

        /**
         *
         */
        abstract compile(context : WebGLRenderingContext);

        /**
         * Getter of content
        * @return {string}  Value of content
         */
        get content() : string
        {
            return this._content
        }
        
        /**
         * Setter of content
        * @param {string} content New value of content
         */
        set content(content : string)
        {
            this._content = content
            this._shader = null
        }
    }
}
