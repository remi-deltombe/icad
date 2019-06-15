namespace ICad.View.Trace
{
    /**
     * BitmapCanvasWebGL
     */
    export class LinesCanvas2D extends ICad.View.DOM.Canvas2D.Canvas2D implements ICad.View.Trace.LinesInterface
    {
        /** */
        _color : Math.Color.Color = new Math.Color.Color(1,1,1);

        /** */
        _values : Math.Matrix<number> 

        _min : number
        _max : number

        update()
        {
            if(!this.values) return;
            
            super.update();
            this.renderInCanvas(this.dom as HTMLCanvasElement, this.context, this.position)
        }

        renderHeader(header : AbstractView)
        {
            var canvas = header as DOM.Canvas2D.Canvas2D;
            canvas.autoclear = false;
            canvas.context.fillStyle = this.color.toString();
            canvas.context.fillRect(0,0,(canvas.dom as HTMLCanvasElement).width, (canvas.dom as HTMLCanvasElement).height);
        }

        renderIn(container : AbstractView, position : Math.Geometry.Rectangle)
        {
            if(!(container instanceof View.DOM.Canvas2D.Canvas2D)) return;
            var canvas2D = container as View.DOM.Canvas2D.Canvas2D;
            var canvas = canvas2D.dom as HTMLCanvasElement;
            var context = canvas2D.context;
            this.renderInCanvas(canvas, context, position);
        }

        renderInCanvas(canvas : HTMLCanvasElement, context : CanvasRenderingContext2D, position : Math.Geometry.Rectangle)
        {
            if(!this.values.height) return;

            var cw = canvas.width;
            var ch = canvas.height;

            var height = position.height ? (position.height * this._resolution) : ch;
            var width  = position.width   ? (position.width * this._resolution)  : cw;
            var x      = position.x ? (position.x * this._resolution) : 0;
            var y      = position.y ? (position.y * this._resolution) : 0;
            var columnWidth = width / this.values.width;

            context.strokeStyle = this.color.toString();

            var firstY = max(1, round(map(0, y, y+height, 0, this.values.height)));//max(1, round(map(max(y, 0), y, y+height, 0, this.values.height)));
            var lastY = firstY + round(map(ch, 0, height, 0, this.values.height));// map(min(ch, y+height), y, y+height, 0, this.values.height);
            var firstYM1 = firstY - 1;

            for(var _x=0;_x<this.values.width; ++_x)
            {
                var dx = columnWidth * _x;
                context.beginPath();
                context.moveTo(
                    dx + map(this.values.at(_x,0), this._min, this._max, 0, columnWidth),
                    y + map(firstYM1, 0, this.values.height, 0, height)
                );

                for(var _y=firstY;_y<this.values.height; ++_y)
                {
                    context.lineTo(
                        dx + map(this.values.at(_x,_y), this._min, this._max, 0, columnWidth),
                        y + map(_y, 0, this.values.height, 0, height)
                    );
                }

                context.stroke();
                context.closePath();
            }

            /*
            var cw = canvas.width
            var ch = canvas.height

            if(!this.values.height) return;

            var height = position.height ? (position.height * this._resolution) : ch;
            var columnWidth = (position.width ? (position.width * this._resolution) : cw) / this.values.width;
            var ratio = columnWidth / (this._max-this._min)


            var incY = (height / this.values.height) * this._resolution;
            var dy = position.top * this._resolution;
            var dx = position.left * this._resolution;
            context.strokeStyle = this.color.toString();

            var first = minmax(floor(-dy / incY), 0, this.values.height-1);
            var last =  minmax(first + 1 + window.Math.floor(ch / incY), 0, this.values.height-1);
            if(first < this.values.height)
            {
                for(var x=0; x<this.values.width; ++x)
                {
                    var v = this.values.at(x, first)
                    var xc = x * columnWidth;
                    var tx = window.Math.round(xc + ((v-this._min) * ratio)) + dx;
                    var ty = window.Math.round(dy);
                    context.beginPath();
                    context.moveTo(tx, ty);
                    for(var y=first; y<=last; ++y)
                    {
                        var v = this.values.at(x, y)
                        var tx = window.Math.round(xc + ((v-this._min) * ratio)) + dx;
                        var ty = window.Math.round(y * incY + dy);
                        context.lineTo(tx, ty);
                    }
                    context.stroke();
                }
            }
            */
        }

        /**
         *
         */
        get color() : Math.Color.Color
        {
            return this._color
        }
        
        /**
         *
         */
        get values() : Math.Matrix<number>
        {
            return this._values
        }
        /**
         *
         */
        get min() : number
        {
            return this._min
        }
        
        /**
         *
         */
        get max() : number
        {
            return this._max
        }

        /**
         *
         */
        set color(color : Math.Color.Color)
        {
            this._color = color
        }

        /**
         *
         */
        set values(values : Math.Matrix<number>)
        {
            this._values = values
        }

        /**
         *
         */
        set min(min : number)
        {
            this._min = min
        }
        
        /**
         *
         */
        set max(max : number)
        {
            this._max = max
        }

    }
}
