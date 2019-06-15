namespace ICad.View.Chart
{
    /**
     * ChartInterface
     */
    export class ChartHistogramCanvas2D extends ICad.View.DOM.Canvas2D.Canvas2D implements ChartHistogramInterface
    {
        _color : Math.Color.Color = new Math.Color.Color(255,255,255);

        /** */
        _data : Array<number> = []

        axis : ICad.Math.Geometry.Rectangle = new ICad.Math.Geometry.Rectangle()

        _background : boolean = true;

        constructor()
        {
            super()
        }

        update()
        {
            super.update();

            var x, y, i;

            var context = this.context;
            var canvas = this.dom as HTMLCanvasElement
            var cw = canvas.width
            var ch = canvas.height

            context.strokeStyle = this.color.toString();
            context.fillStyle = 'rgba(255,255,255,0.1)';
            context.lineWidth = 2;
            context.beginPath();

            context.moveTo(0,ch);
            console.log(this.axis.bottom, this.axis.top)
            var dfx = (this.axis.right - this.axis.left)
            var rx = cw / dfx;
            var dfy = (this.axis.bottom - this.axis.top)
            var ry = ch / dfy;
            for(i=0; i<this.data.length; ++i)
            {
                x = (i-this.axis.left) * rx;
                y = (this.data[i] - this.axis.top) * ry;//map(this.data[i], this.axis.top, this.axis.bottom,ch,0);
                context.lineTo(x, y);
            }
            context.lineTo(cw,y);
            context.stroke();
            if(this.background)
            {
                context.beginPath();
                context.fillStyle = 'rgba(255,255,255,0.2)';
                for(i=1; i<4; ++i)
                {
                    x = map(i, 0, 4, 0, cw-1);
                    y = map(i, 0, 4, 0, ch-1);

                    context.rect(x, 0 , 1, ch);
                    context.rect(0, y , cw, 1);
                }
                context.fill();
            }

        }

        get data() : Array<number>
        {
            return this._data;
        }

        get color() : Math.Color.Color
        {
            return this._color;
        }

        get background() : boolean
        {
            return this._background;
        }

        set data(data : Array<number>)
        {
            this._data = data;
        }

        set color(color : Math.Color.Color)
        {
            this._color = color;
        }

        set background(background : boolean)
        {
            this._background = background;
        }
    }
}
