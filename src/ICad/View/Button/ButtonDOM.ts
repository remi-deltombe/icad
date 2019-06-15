namespace ICad.View.Button
{
    /**
     * ButtonDOM
     */
    export class ButtonDOM extends ICad.View.DOM.DOMEmitter implements ICad.View.Button.ButtonInterface
    {
        /** */
        _text : string
        
        /**
         * Return its text surround by <p> tags.
         */
        constructor()
        {
            super()
            this.updateTemplate()
        }
        
        /**
         * 
         */
        updateTemplate()
        {
            this.template = `<button>${this.text}</button>`
        }
        
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
            this.updateTemplate()
            if(this.dom) this.dom.innerHTML = text
        }
    }
}
