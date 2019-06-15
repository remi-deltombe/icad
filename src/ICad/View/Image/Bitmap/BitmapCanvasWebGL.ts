namespace ICad.View.Image.Bitmap
{
    /**
     * BitmapCanvasWebGL
     */
    export class BitmapCanvasWebGL extends ICad.View.DOM.WebGL.CanvasWebGL implements ICad.View.Image.Bitmap.BitmapInterface
    {
        /** */
        _pixels : ICad.Math.Matrix<ICad.Math.Color.Color>

        /** */
        _colors : DOM.WebGL.Texture = new  DOM.WebGL.Texture ()

        /** */
        _positions : DOM.WebGL.Buffer = new  DOM.WebGL.Buffer ()

        /** */
        _program : DOM.WebGL.Program = new DOM.WebGL.Program()

        constructor()
        {
            super()

            this._program.createVertexShader('vertex', `
                attribute vec2 position;
                uniform float x;
                uniform float y;
                uniform float scale_x;
                uniform float scale_y;
                varying highp vec2 texturePosition;
                void main(void) {
                    gl_Position = vec4(position * vec2(scale_x, scale_y) + vec2(x, -y) , -1, 1);
                    texturePosition = position;
                }
            `)

            this._program.createFragmentShader('fragment', `
                precision mediump float;
                varying highp vec2 texturePosition;
                uniform sampler2D texture;
                void main(void) {
                    gl_FragColor = texture2D(texture, texturePosition);

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

        render()
        {
            super.render();

            var canvas = this.dom as HTMLCanvasElement
            var buffers = new Map([ 
                ['position', this._positions]
            ])

            var width =  this.position.width > 0 ? this.position.width : canvas.width
            var height =  this.position.height > 0 ? this.position.height : canvas.height
            var scaleX = width / canvas.width * 2
            var scaleY = height / canvas.height * 2
            var x = this.position.x / canvas.width
            var y = this.position.y / canvas.height


            var data = new Map<string, any>([
                ['texture', this._colors],
                ['x', (x * 2) -1],
                ['y', (y * 2) - 1],
                ['scale_x', scaleX],
                ['scale_y', -scaleY]
            ])

            this._program.context = this.context
            this._program.draw('vertex', 'fragment', buffers, data)
        }

        /**
         * Getter of pixels
        * @return {ICad.Math.Matrix<ICad.Math.Color.Color>} pixels Value of pixels
         */
        get pixels() : ICad.Math.Matrix<ICad.Math.Color.Color>
        {
            return this._pixels
        }

        /**
         * Setter of pixels
        * @param {ICad.Math.Matrix<ICad.Math.Color.Color>} pixels New value of pixels
         */
        set pixels(pixels : ICad.Math.Matrix<ICad.Math.Color.Color>)
        {
            var that = this

            this._pixels = pixels

            var colors = new Array(this.position.width * this.position.height * 3)
            var i=0
            this.pixels.forEach((v,x,y)=>{
                colors[i] = v.r
                colors[i+1] = v.g
                colors[i+2] = v.b
                i+=3
            })
            this._colors.data = colors;
            this._colors._width = this.pixels.width;
            this._colors._height = this.pixels.height;
        }
    }
}
