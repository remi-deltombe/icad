namespace ICad.Math.Geometry
{
    /**
     * Point
     */
    export class Point
    {
        /** */
        _x : number =  null
        
        /** */
        _y : number =  null
        
        distance(from:Point)
        {
            var dx = this.x - from._x
            var dy = this.y - from._y

            return  window.Math.sqrt(dx*dx+dy*dy)
        }

        /**
         * Getter of x
        * @return {number}  Value of x
         */
        get x() : number
        {
            return this._x
        }
        
        /**
         * Getter of y
        * @return {number}  Value of y
         */
        get y() : number
        {
            return this._y
        }
        
        /**
         * Setter of x
        * @param {number} x New value of x
         */
        set x(x : number)
        {
            this._x = x
        }
        
        /**
         * Setter of y
        * @param {number} y New value of y
         */
        set y(y : number)
        {
            this._y = y
        }
    }
}
