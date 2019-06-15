namespace ICad.View.Text
{
    /**
     * ParagraphDOM
     */
    export class ParagraphDOM extends ICad.View.DOM.DOMEmitter implements ICad.View.Text.ParagraphInterface
    {
        /** */
        _text : string = ""
        
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
            this.template = `<p>${this.text}</p>`
        }

        render()
        {
            if(!this.dom)
            {
                super.render();
            }
            else
            {
                this.dom.innerHTML = this.text
            }
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
