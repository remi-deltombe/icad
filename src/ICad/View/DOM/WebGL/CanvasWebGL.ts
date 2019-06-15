namespace ICad.View.DOM.WebGL
{
    /**
     * CanvasWebGL
     */
    export class CanvasWebGL extends ICad.View.DOM.Canvas
    {
        /** */
        _context : WebGLRenderingContext

        render() 
        {
            super.render();
            this.update();
        }

        /**
         * Render this canvas.
         */
        update() 
        {
            super.update();
            var canvas = this.dom as HTMLCanvasElement
            if(canvas.width != canvas.offsetWidth || canvas.height != canvas.offsetHeight)
            {
                canvas.width = canvas.offsetWidth
                canvas.height = canvas.offsetHeight
                this.context = null
            }
            if(!this.context)
            {
                var canvas = this.dom as HTMLCanvasElement
                this.context = canvas.getContext('webgl', {antialias: false})
                this.context.viewport(0, 0, canvas.width, canvas.height);
            }
        }

        /**
         * Getter of context
        * @return {WebGLRenderingContext}  Value of context
         */
        get context() : WebGLRenderingContext
        {
            return this._context
        }
        
        /**
         * Setter of context
        * @param {WebGLRenderingContext} context New value of context
         */
        set context(context : WebGLRenderingContext)
        {
            this._context = context
        }
    }
}
