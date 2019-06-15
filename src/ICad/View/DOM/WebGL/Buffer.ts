namespace ICad.View.DOM.WebGL
{
    /**
     * CanvasWebGL
     */
    export  class Buffer
    {
        /** */
        _context : WebGLRenderingContext

        /** */
        _data : any

        /** */
        _sizeOfItem : number = 1

        /** */
        _buffer : any = null

        /** */
        _length : number = 0

        _position : number|boolean = false;

        /**
         *
         */
        bind(context: WebGLRenderingContext, position: any) 
        {
            if(position < 0) return
            if(this._context != context || !this._buffer)
            {
                this._context = context
                this._buffer = context.createBuffer()
                context.bindBuffer(context.ARRAY_BUFFER, this._buffer);
                context.bufferData(context.ARRAY_BUFFER, this._data, context.STATIC_DRAW);
                context.enableVertexAttribArray(position);
                context.vertexAttribPointer(position, this.sizeOfItem, context.FLOAT, false, 0, 0);
            }
        }

        protected buildData(data : Array<number>)
        {
            this._data = new Float32Array(data)
        }

        /**
         *
         */
        get data() : Array<number>
        {
            throw 'Data can\'t  be getted'
        }

        /**
         *
         */
        set data(data : Array<number>)
        {
            if(this._buffer)
            {
                this._context.deleteBuffer(this._buffer)
                this._buffer = null
            } 
            this.buildData(data)
            this._length = data.length
        }
        
        /**
         *
         */
        get sizeOfItem() : number
        {
            return this._sizeOfItem
        }

        /**
         *
         */
        set sizeOfItem(sizeOfItem : number)
        {
            this._sizeOfItem = sizeOfItem
        }
    }
}
