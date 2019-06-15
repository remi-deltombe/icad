namespace ICad.View.DOM.WebGL
{
    /**
     * CanvasWebGL
     */
    export  class Texture extends Buffer
    {
        /** */
        _width : number = 0
        
        /** */
        _height : number = 0

        /** */
        _index : number = 0

        /** */
        _format : number

        /** */
        _type : number

        /** */
        static _totalTexture : number = 0

        /** */
        static _maxIndex : number = 8

        constructor()
        {
            super()
            this._index = Texture._totalTexture
            Texture._totalTexture = (Texture._totalTexture+ 1 )
        }

        /**
         *
         */
        bind(context: WebGLRenderingContext, position: any) 
        {
            this._context = context
            this._buffer = context.createTexture()

            context.pixelStorei(context.UNPACK_ALIGNMENT, 1);
            context.activeTexture(context.TEXTURE0 + (this._index % Texture._maxIndex))
            context.bindTexture( context.TEXTURE_2D, this._buffer ) ;

            context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
            context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
            context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
            context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);

            const level = 0;
            const internalFormat = this._format || context.RGB;
            const width = this._width;
            const height = this._height;
            const border = 0;
            const format = this._format || context.RGB;
            const type = this._type || context.UNSIGNED_BYTE;
            const data = this._data;
            context.texImage2D(context.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data);

            context.uniform1i(position, (this._index % Texture._maxIndex));
        }

        protected buildData(data : Array<number>)
        {
            this._data = new Uint8Array(data)
        }
    }
}
