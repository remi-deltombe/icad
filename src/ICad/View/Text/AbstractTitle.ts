namespace ICad.View.Text
{
    /**
     * AbstractTitle
     */
    export class AbstractTitle extends ICad.View.Text.AbstractText
    {
        /** Importance of this title.
         * Start at 1, smaller numbers are more important.*/
        _level : number
        
        /**
         * Getter of level
        * @return {number}  Value of level
         */
        get level() : number
        {
            return this._level
        }
        
        /**
         * Setter of level
        * @param {number} level New value of level
         */
        set level(level : number)
        {
            this._level = level
        }
    }
}
