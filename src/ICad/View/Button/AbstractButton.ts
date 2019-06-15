namespace ICad.View.Button
{
    /**
     * AbstractButton
     */
    export class AbstractButton extends ICad.View.AbstractView
    {
        /** Text displayed in the box.*/
        _text : string
        
        /**
         * Getter of text
        * @return {string}  Value of text
         */
        get text() : string
        {
            return this._text
        }
        
        /**
         * Setter of text
        * @param {string} text New value of text
         */
        set text(text : string)
        {
            this._text = text
        }
    }
}
