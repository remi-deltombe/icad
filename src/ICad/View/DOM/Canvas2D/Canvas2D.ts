namespace ICad.View.DOM.Canvas2D
{
    /**
     * CanvasWebGL
     */
    export class Canvas2D extends ICad.View.DOM.Canvas
    {
        /** */
        _context : CanvasRenderingContext2D

        _resolution : number
        
        _autoclear : boolean = true;

        constructor(resolution = 2)
        {
            super();
            this._resolution = resolution
        }

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

            if(this.autoclear || canvas.width == 0 || canvas.height == 0)
            {
            var width = canvas.offsetWidth * this._resolution;
            var height = canvas.offsetHeight * this._resolution;
                canvas.width = width
                canvas.height = height
            }
            this.context = canvas.getContext('2d', {antialias: false})
        }

        clear()
        {
            var canvas = this.dom as HTMLCanvasElement
            canvas.width = canvas.width
            canvas.height = canvas.height

        }


        /**
         * Getter of context
        * @return {CanvasRenderingContext2D}  Value of context
         */
        get context() : CanvasRenderingContext2D
        {
            return this._context
        }

        /**
         */
        get autoclear() : boolean
        {
            return this._autoclear
        }
        
        /**
         * Setter of context
        * @param {CanvasRenderingContext2D} context New value of context
         */
        set context(context : CanvasRenderingContext2D)
        {
            this._context = context
        }
        
        /**
         */
        set autoclear(autoclear : boolean )
        {
            this._autoclear = autoclear
        }
    }
}
