namespace ICad.View.Ruler
{
    /**
     * BitmapCanvasWebGL
     */
    export class RulerVerticalCanvas2D extends DOM.Canvas2D.Canvas2D implements RulerInterface
    {
        /** */
        _reference : number = 0

        /** */
        _spacing : number = 100

        /** */
        _increment : number = 100

        /** */
        _vertical : boolean = true

        public update()
        {
            super.update()
            this.renderVertical()
        }

        private renderVertical()
        {
            var resolution = 2;
            var canvas = this.dom as HTMLCanvasElement
            var ctx = this.context
            var width = canvas.width
            var height = canvas.height
            var spacing = this.spacing * resolution

            var reference = this.reference;
            var increment = this.increment;
            var precision = window.Math.pow(10, 1);

            var count = window.Math.ceil(height / spacing) 

            var lineWidth = width / 5

            // Clear
            ctx.fillStyle = '#fff'
            ctx.fillRect(0,0,width,height)

            // Text
            ctx.fillStyle = '#767676'
            ctx.font = '24px Fira Code, sans-serif';
            ctx.textAlign = "center";


            var baseValue = window.Math.floor(this.reference / increment) * increment;
            var positionReference = height / 2
            var positionBase = positionReference - (((reference - baseValue) / increment) * spacing)
            var dy = positionBase - positionReference;
            baseValue -=  (count/2) * increment;

            for(var i=0; i<=count; ++i)
            {
                var y = i * spacing + dy;
                var text = (window.Math.floor((baseValue + i * increment) * precision) / precision) + ''

                ctx.save();
                ctx.translate((width/2) + 8, y);
                ctx.rotate(-window.Math.PI/2);
                ctx.fillText(text, 0, 0);
                ctx.restore();
            }

            ctx.fillStyle = '#D5D5D5'
            for(var i=0; i<=count; ++i)
            {
                var y = i * spacing + dy;
                ctx.fillRect(0,y,lineWidth,2)
                ctx.fillRect(width-lineWidth,y,lineWidth,2)
            }
        }

        /**
         *
         */
        get reference() : number
        {
            return this._reference
        }

        /**
         *
         */
        get spacing() : number
        {
            return this._spacing
        }

        /**
         *
         */
        get increment() : number
        {
            return this._increment
        }

        /**
         *
         */
        get vertical() : boolean
        {
            return this._vertical
        }

        /**
         *
         */
        get horizontal() : boolean
        {
            return !this._vertical
        }

        /**
         *
         */
        set reference(reference : number)
        {
            this._reference = reference
        }

        /**
         *
         */
        set spacing(spacing : number)
        {
            this._spacing = spacing
        }

        /**
         *
         */
        set increment(increment : number)
        {
            this._increment = increment
        }

        /**
         *
         */
        set vertical(vertical : boolean)
        {
            this._vertical = vertical
        }

        /**
         *
         */
        set horizontal(horizontal : boolean)
        {
            this._vertical = !horizontal
        }

    }
}
