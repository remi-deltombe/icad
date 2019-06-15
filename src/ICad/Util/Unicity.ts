interface Window {
    Math: typeof Math;
}

namespace ICad.Util
{
    /**
     * Unicity
     */
    export class Unicity
    {
        /**
         * Generate an Universal Unique Identifier (UUID).
         * 
         * @static
        * @return {string}  Generated UUID.
         */
        static uuid() : string
        {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = window.Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
}
