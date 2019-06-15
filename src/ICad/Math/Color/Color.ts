namespace ICad.Math.Color
{
    /**
     * Color
     */
    export class Color
    {
        /** */
        _r : number
        
        /** */
        _g : number

        /** */
        _b : number

        constructor(r?:number, g?:number, b?:number)
        {
            this._r = r || 0
            this._g = g || 0
            this._b = b || 0
        }

        toString() : string
        {
            return "#" + [
                this._r.toString(16), 
                this._g.toString(16), 
                this._b.toString(16), 
            ]
            .map(v => v.length == 1 ? '0'+v : v )
            .join('')
        }

        fromString(value: string)
        {
            if(value[0] == '#')
            {
                this._r = parseInt(value.substr(1,2) , 16);
                this._g = parseInt(value.substr(3,2) , 16);
                this._b = parseInt(value.substr(5,2) , 16);
            }
        }

        equal(color : Color) : boolean
        {
            return (color.r === this.r) && (color.g === this.g) && (color.b === this.b)
        }
        
        /**
         * Getter of rgb
        * @return {number}  Value of rgb
         */
        get r() : number
        {
            return this._r
        }
        
        /**
         * Getter of rgb
        * @return {number}  Value of rgb
         */
        get g() : number
        {
            return this._g
        }
        
        /**
         * Getter of rgb
        * @return {number}  Value of rgb
         */
        get b() : number
        {
            return this._b
        }

        /**
         * Getter of rgb
        * @param {number} r New value of rgb
         */
        set r(r : number)
        {
            this._r = r % 255
        }
        
        /**
         * Getter of rgb
        * @param {number} g New value of rgb
         */
        set g(g : number)
        {
            this._g = g % 255
        }
        
        /**
         * Getter of rgb
        * @param {number} b New value of rgb
         */
        set b(b : number)
        {
            this._b = b % 255
        }
        
    }
}
