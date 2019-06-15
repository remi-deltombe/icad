namespace ICad.View.Text
{
    /**
     * AbstractText
     */
    export class AbstractText extends ICad.View.AbstractView
    {
        /** Text displayed by this view.*/
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
