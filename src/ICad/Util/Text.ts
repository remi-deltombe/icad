interface Window {
    Math: typeof Math;
}

namespace ICad.Util
{
    /**
     * Unicity
     */
    export class Text
    {
        /**
         * 
         * @static
        * @return {string}  Generated UUID.
         */
        static formatNumber(n:number, precision:number) : string
        {
            var str = n + ''
            if(str.indexOf('.') === -1) str += '.'
            str += '000000000000000000000000000000000000000000000' 
            if(precision == 0) return str.substr(0, str.indexOf('.'))
            return str.substr(0, str.indexOf('.') + precision + 1)
        }
    }
}
