namespace ICad.View.Trace
{
    /**
     * BitmapCanvasWebGL
     */
    export class ImageCanvasWebGL extends ICad.View.DOM.WebGL.CanvasWebGL implements ICad.View.Trace.ImageInterface
    {
        /** */
        _values : Math.Matrix<ICad.Math.Color.Color> //new  DOM.WebGL.Texture ()

        /** */
        _textures : Array<DOM.WebGL.Texture> = [] //new  DOM.WebGL.Texture ()

        /** */
        _positions : DOM.WebGL.Buffer = new  DOM.WebGL.Buffer ()

        /** */
        _program : DOM.WebGL.Program = new DOM.WebGL.Program()

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
                void main(void) {
                    gl_FragColor =  texture2D(texture, texturePosition);

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
            this.renderInCanvas(this.dom as HTMLCanvasElement, this.context, this.position);
        }

        

        renderHeader(header : AbstractView)
        {
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
                    ]))

                    rendered++;
                }

                y += h
            }
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
            var sliceWidth = this.values.width * 3
            var sliceLength = sliceHeight * sliceWidth
            var sliceCount = window.Math.ceil(totalHeight/sliceHeight)

            var that = this
            this._textures = new Array(sliceCount).fill(0).map((v, k)=>{
                
                var texture = new DOM.WebGL.Texture()
                var yFrom = k * sliceHeight
                var yTo = min(totalHeight, yFrom + sliceHeight)
                var height = yTo - yFrom;
                var iFrom = yFrom * this.values.width;
                var iTo = iFrom + height * this.values.width;

                var values = new Array(height * sliceWidth);
                for(var i=iFrom, j=0; i<iTo; ++i, j+=3)
                {
                    values[j] = this.values._data[i].r;
                    values[j+1] = this.values._data[i].g;
                    values[j+2] = this.values._data[i].b;
                }

                /*
                for(var i=0, j=iFrom; i<sliceLength; i+=3, j++)
                {
                    console.log(i,sliceLength,j, iFrom, this.values._data[j], this.values)
                    values[i] = this.values._data[j].r;
                    values[i+1] = this.values._data[j].g;
                    values[i+2] = this.values._data[j].b;
                }
                */

                texture._width = this.values.width
                texture._height = height
                texture._type = that.context.UNSIGNED_BYTE
                texture._format = that.context.RGB
                texture.data = values;
                return texture
            })

        }

        /**
         *
         */
        get values() : Math.Matrix<Math.Color.Color>
        {
            return this._values
        }

        get maxHeight() : number
        {
            if(!this.context) this.render()
            return this.context.getParameter(this.context.MAX_TEXTURE_SIZE)
        }

        /**
         *
         */
        set values(values : Math.Matrix<Math.Color.Color>)
        {
            this._values = values
            this._textures = null
        }
    }
}
