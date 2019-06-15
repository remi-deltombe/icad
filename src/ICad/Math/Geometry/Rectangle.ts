interface Window {
    Math: typeof Math;
}

namespace ICad.Math.Geometry
{
    /**
     * Rectangle
     */
    export class Rectangle
    {
        /** */
        _topLeft : ICad.Math.Geometry.Point = new ICad.Math.Geometry.Point()
        
        /** */
        _bottomRight : ICad.Math.Geometry.Point = new ICad.Math.Geometry.Point()
        

        clone() : Rectangle
        {
            var clone = new Rectangle();
            clone._topLeft._x = this._topLeft._x;
            clone._topLeft._y = this._topLeft._y;
            clone._bottomRight._x = this._topLeft._x;
            clone._bottomRight._y = this._topLeft._y;
            return clone;
        }

        /**
         * Getter of left
        * @return {number}  Value of left
         */
        get left() : number
        {
            return this.topLeft.x
        }
        
        /**
         * Getter of right
        * @return {number}  Value of right
         */
        get right() : number
        {
            return this._bottomRight.x
        }
        
        /**
         * Getter of top
        * @return {number}  Value of top
         */
        get top() : number
        {
            return this.topLeft.y
        }
        
        /**
         * Getter of bottom
        * @return {number}  Value of bottom
         */
        get bottom() : number
        {
            return this._bottomRight.y
        }
        
        /**
         * Getter of width
        * @return {number}  Value of width
         */
        get width() : number
        {
            return this.bottomRight.x - this.topLeft.x
        }
        
        /**
         * Getter of height
        * @return {number}  Value of height
         */
        get height() : number
        {
            return this.bottomRight.y - this.topLeft.y
        }

        /**
         *
         */
        get area() : number
        {
            return this.width * this.height
        }
        
        /**
         *
         */
        get center() : Point
        {
            var p = new Point()
            p.x = this.x + (this.width/2)
            p.y = this.y + (this.height/2)
            return p
        }
        /**
         *
         */
        get diagonal() : number
        {
            return this._topLeft.distance(this.bottomRight)
        }
        
        /**
         * Getter of x
        * @return {number}  Value of x
         */
        get x() : number
        {
            return this.topLeft.x
        }
        
        /**
         * Getter of y
        * @return {number}  Value of y
         */
        get y() : number
        {
            return this.topLeft.y
        }
        
        /**
         * Getter of topLeft
        * @return {ICad.Math.Geometry.Point}  Value of topLeft
         */
        get topLeft() : ICad.Math.Geometry.Point
        {
            return this._topLeft
        }
        
        /**
         * Getter of bottomRight
        * @return {ICad.Math.Geometry.Point}  Value of bottomRight
         */
        get bottomRight() : ICad.Math.Geometry.Point
        {
            return this._bottomRight
        }
        
        /**
         * Setter of left
        * @param {number} left New value of left
         */
        set left(left : number)
        {
            this.topLeft.x = left;//window.Math.min(left, this.bottomRight.x)
        }
        
        /**
         * Setter of right
        * @param {number} right New value of right
         */
        set right(right : number)
        {
            this.bottomRight.x = right;//window.Math.max(right, this.topLeft.x)
        }
        
        /**
         * Setter of top
        * @param {number} top New value of top
         */
        set top(top : number)
        {
            this.topLeft.y = top;//window.Math.min(top, this.bottomRight.y)
        }
        
        /**
         * Setter of bottom
        * @param {number} bottom New value of bottom
         */
        set bottom(bottom : number)
        {
            this.bottomRight.y =  bottom;//window.Math.max(bottom, this.topLeft.y)
        }
        
        /**
         * Setter of width
        * @param {number} width New value of width
         */
        set width(width : number)
        {
            width = window.Math.max(width, 0)
            this.bottomRight.x = this.topLeft.x + width
        }
        
        /**
         * Setter of height
        * @param {number} height New value of height
         */
        set height(height : number)
        {
            height = window.Math.max(height, 0)
            this.bottomRight.y = this.topLeft.y + height
        }
        
        /**
         * Setter of x
        * @param {number} x New value of x
         */
        set x(x : number)
        {
            var width = this.width
            this.topLeft.x = x
            this.bottomRight.x = this.topLeft.x + width
        }
        
        /**
         * Setter of y
        * @param {number} y New value of y
         */
        set y(y : number)
        {
            var height = this.height
            this.topLeft.y = y
            this.bottomRight.y = this.topLeft.y + height
        }
        
        /**
         * Setter of topLeft
        * @param {ICad.Math.Geometry.Point} topLeft New value of topLeft
         */
        set topLeft(topLeft : ICad.Math.Geometry.Point)
        {
            this._topLeft = topLeft
        }
        
        /**
         * Setter of bottomRight
        * @param {ICad.Math.Geometry.Point} bottomRight New value of bottomRight
         */
        set bottomRight(bottomRight : ICad.Math.Geometry.Point)
        {
            this._bottomRight = bottomRight
        }
    }
}
