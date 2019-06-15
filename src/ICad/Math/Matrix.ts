namespace ICad.Math
{
    /**
     * Matrix<T>
     */
    export class Matrix<T>
    {
        /** */
        _width : number
        
        /** */
        _height : number
        
        /** */
        _data : Array<T> = []

        allocate(width, height)
        {
            this.width = width
            this.height = height
            this.data = new Array(width * height).fill(0)
        }

        at(x:number, y:number) : T
        {
            return this.data[x + y*this.width]
        }

        /**
         *
         */
        forEach(fn : Function)
        {
            for(var y=0, i=0; y<this._height; ++y)
            {
                for(var x=0; x<this._width; ++x, ++i)
                {
                    fn(this._data[i], x, y)
                }
            }
        }

        /**
         *
         */
        map(fn : Function)
        {
            for(var y=0, i=0; y<this._height; ++y)
            {
                for(var x=0; x<this._width; ++x, ++i)
                {
                    this._data[i] = fn(this._data[i], x, y)
                }
            }
        }

        /**
         *
         */
        line(index: number) : Array<T>
        {
            index *= this.width
            return this._data.slice(index, index + this._width)
        }

        /**
         *
         */
        column(index: number) : Array<T>
        {
            var result = new Array(this.height);
            for(var i=0; i<this.height; ++i)
            {
                result[i] = this._data[index+this.height*i];
            }
            return result;
        }

        /**
         *
         */
        replaceLine(index: number, data: Array<T>)
        {
            index *= this.width
            for(var i=0; i<this.width; ++i)
            {
                this._data[index + i] = data[i]
            }
        }
        
        /**
         * Getter of width
        * @return {number}  Value of width
         */
        get width() : number
        {
            return this._width
        }
        
        /**
         * Getter of height
        * @return {number}  Value of height
         */
        get height() : number
        {
            return this._height
        }
        
        /**
         * Getter of data
        * @return {Array<any>}  Value of data
         */
        get data() : Array<any>
        {
            return this._data
        }
        
        /**
         * Setter of width
        * @param {number} width New value of width
         */
        set width(width : number)
        {
            this._width = width
        }
        
        /**
         * Setter of height
        * @param {number} height New value of height
         */
        set height(height : number)
        {
            this._height = height
        }
        
        /**
         * Setter of data
        * @param {Array<any>} data New value of data
         */
        set data(data : Array<any>)
        {
            this._data = data
        }
    }
}
