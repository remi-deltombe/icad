namespace ICad.View.Trace
{
    /**
     * BitmapCanvasWebGL
     */
    export class HeatmapCanvasWebGL extends ICad.View.DOM.WebGL.CanvasWebGL implements ICad.View.Trace.HeatmapInterface
    {
        /** */
        _colorFrom : Math.Color.Color = new Math.Color.Color(255,255,255);

        /** */
        _colorTo : Math.Color.Color = new Math.Color.Color(0, 0, 0);

        /** */
        _values : Math.Matrix<number> //new  DOM.WebGL.Texture ()

        /** */
        _textures : Array<DOM.WebGL.Texture> = [] //new  DOM.WebGL.Texture ()

        /** */
        _positions : DOM.WebGL.Buffer = new  DOM.WebGL.Buffer ()

        /** */
        _program : DOM.WebGL.Program = new DOM.WebGL.Program()

        _max : number = 0
        _min : number = 0

        constructor()
        {
            super()

            this._program.createVertexShader('vertex', `
                attribute vec2 position;
                uniform vec2 A;
                uniform vec2 B;
                varying highp vec2 texturePosition;
                void main(void) {
                    gl_Position = vec4(A + (position * B), -1, 1);
                    texturePosition = position;
                }
            `)

            this._program.createFragmentShader('fragment', `
                precision mediump float;
                varying highp vec2 texturePosition;
                uniform sampler2D texture;
                uniform vec4 colorFrom;
                uniform vec4 colorTo;
                void main(void) {
                    vec4 textureValue = texture2D(texture, texturePosition);
                    float alpha = textureValue[3];
                    gl_FragColor =  colorTo + ((colorFrom - colorTo) * vec4(alpha, alpha, alpha, 1));

                }
            `)

            this._program.createVertexShader('vertexClear', `
                attribute vec2 position;
                void main(void) {
                    gl_Position = vec4(vec2(1, -1) + (position * vec2(2, 2)), -1, 1);
                }
            `)

            this._program.createFragmentShader('fragmentClear', `
                precision mediump float;
                void main(void) {
                    gl_FragColor = vec4(0,0,0,0);

                }
            `)

            this._positions.sizeOfItem = 2
            this._positions.data = [
                0, 0,
                0, 1,
                1, 0,
                1, 0,
                1, 1,
                0, 1,
            ]

        }

        update()
        {
            if(!this.values) return;
            super.update();
            this.renderInCanvas(this.dom as HTMLCanvasElement, this.context, this.position)
        }

        

        renderHeader(header : AbstractView)
        {
            var canvas = header as DOM.Canvas2D.Canvas2D;
            var width = (canvas.dom as HTMLCanvasElement).width;
            var gradient = canvas.context.createLinearGradient(0, 0, width,0);
            canvas.autoclear = false;
            gradient.addColorStop(0, this.colorFrom.toString());
            gradient.addColorStop(1, this.colorTo.toString());
            canvas.context.fillStyle = gradient;
            canvas.context.fillRect(0,0, width, (canvas.dom as HTMLCanvasElement).height);
        }

        renderIn(container : AbstractView, position : Math.Geometry.Rectangle)
        {
            if(!(container instanceof View.DOM.WebGL.CanvasWebGL)) return;
            var canvas3D = container as View.DOM.WebGL.CanvasWebGL;
            var canvas = canvas3D.dom as HTMLCanvasElement;
            var context = canvas3D.context;
            this.renderInCanvas(canvas, context, position);
        }


        renderInCanvas(canvas : HTMLCanvasElement, context : WebGLRenderingContext, position: Math.Geometry.Rectangle)
        {
            if(!canvas.parentElement) return;
            if(!this._textures) this.buildTextures()

            var buffers = new Map([ 
                ['position', this._positions]
            ])

            var program = this._program
            program.context = context
            

            var cw = canvas.width
            var ch = canvas.height
            var rw = 2 / cw
            var rh = 2 / ch
            var x = position.x
            var y = position.y
            var w = position.width > 0 ? position.width : canvas.width
            var rs = (position.height > 0 ? position.height : canvas.height) / this.values.height
            var rendered = 0
            var h = this._textures[0]._height * rs
            var colorFrom = [this.colorFrom.r/255,this.colorFrom.g/255,this.colorFrom.b/255, 1];
            var colorTo = [this.colorTo.r/255,this.colorTo.g/255,this.colorTo.b/255, 1];

            //this._textures.forEach((texture, i)=>{
            for(var i=0; i<this._textures.length && ((y+h) > 0); ++i)
            {
                var h = this._textures[i]._height * rs
                if(y < ch)
                {
                    var A = [-1 + rw * x, 1 + -rh * y]
                    var B = [rw * w, -rh * h]

                    program.draw('vertex', 'fragment', buffers, new Map<string, any>([
                        ['texture', this._textures[i]],
                        ['A', A],
                        ['B', B],
                        ['colorFrom', colorFrom],
                        ['colorTo', colorTo]
                    ]))

                    rendered++
                }

                y += h
            }
            //})

            if(!rendered)
            {
                program.draw('vertexClear', 'fragmentClear', buffers, new Map<string, any>())
            }
        }
        /**
         *
         */
        private buildTextures()
        {
            var totalHeight = this.values.height
            var sliceHeight = this.maxHeight
            var sliceWidth = this.values.width
            var sliceLength = sliceHeight * sliceWidth
            var sliceCount = window.Math.ceil(totalHeight/sliceHeight)

            var ratio = 255 / (this._max-this._min)
            var values = this.values.data.map(v=>(v-this._min)*ratio)

            this._textures = new Array(sliceCount).fill(0).map((v, k)=>{
                var texture = new DOM.WebGL.Texture()
                var yFrom = k * sliceHeight
                var yTo = min(totalHeight, yFrom + sliceHeight)
                var height = yTo - yFrom
                var iFrom = yFrom * sliceWidth
                var iTo = iFrom + sliceLength
                var length = iTo - iFrom

                texture._height = height
                texture._width = sliceWidth
                texture._type = this.context.UNSIGNED_BYTE
                texture._format = this.context.ALPHA
                texture.data = values.slice(iFrom , iTo)
                return texture
            })
        }

        /**
         *
         */
        get colorFrom() : Math.Color.Color
        {
            return this._colorFrom
        }
        
        /**
         *
         */
        get colorTo() : Math.Color.Color
        {
            return this._colorTo
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
        get maxHeight() : number
        {
            if(!this.context) this.render()
            return this.context.getParameter(this.context.MAX_TEXTURE_SIZE)
        }

        /**
         *
         */
        set colorFrom(colorFrom : Math.Color.Color)
        {
            this._colorFrom = colorFrom
        }
        
        /**
         *
         */
        set colorTo(colorTo : Math.Color.Color)
        {
            this._colorTo = colorTo
        }

        /**
         *
         */
        set values(values : Math.Matrix<number>)
        {
            this._values = values
            this._textures = null
        }

        /**
         *
         */
        set min(min : number)
        {
            this._textures = null;
            this._min = min
        }
        
        /**
         *
         */
        set max(max : number)
        {
            this._textures = null;
            this._max = max
        }

        /**
         *
         */
        set maxHeight(maxHeight : number)
        {
            throw 'maxHeight can\'t be setted' 
        }


    }
}
