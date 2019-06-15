namespace ICad.View.Trace
{
    /**
     * BitmapCanvasWebGL
     */
    export class ImageCanvas2D extends ICad.View.DOM.WebGL.CanvasWebGL implements ICad.View.Trace.ImageInterface
    {
        /** */
        _values : Math.Matrix<ICad.Math.Color.Color> //new  DOM.WebGL.Texture ()
        _pixels : Math.Matrix<ICad.Math.Color.Color> //new  DOM.WebGL.Texture ()

        constructor()
        {
            super();
        }

        update()
        {
            if(!this.values) return;
            super.update();
            this.renderInCanvas(this.dom as HTMLCanvasElement, this.context, this.position);
        }

        renderHeader(header : AbstractView)
        {
        }

        renderIn(container : AbstractView, position : Math.Geometry.Rectangle)
        {
            if(!(container instanceof View.DOM.Canvas2D.Canvas2D)) return;
            var canvas3D = container as View.DOM.Canvas2D.Canvas2D;
            var canvas = canvas3D.dom as HTMLCanvasElement;
            var context = canvas3D.context;
            this.renderInCanvas(canvas, context, position);
        }

        renderInCanvas(canvas : HTMLCanvasElement, context : CanvasRenderingContext2D, position: Math.Geometry.Rectangle)
        {
        }

        /**
         *
         */
        get values() : Math.Matrix<Math.Color.Color>
        {
            return this._values
        }

        /**
         *
         */
        set values(values : Math.Matrix<Math.Color.Color>)
        {
            this._values = values
            this._pixels = values
        }
    }
}
