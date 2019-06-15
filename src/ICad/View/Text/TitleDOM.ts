namespace ICad.View.Text
{
    /**
     * TitleDOM
     */
    export class TitleDOM extends ICad.View.DOM.DOM implements ICad.View.Text.TitleInterface
    {
        /** */
        _level : number = 1

        /** */
        _text : string = ""
        
        /**
         * Return its text surround by <hlevel> tags.
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
            this.template = `<h${this.level}>${this.text}</h${this.level}>`
        }
        
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
            this.updateTemplate()
            this.render()
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
