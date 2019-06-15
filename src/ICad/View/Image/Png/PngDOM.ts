namespace ICad.View.Image.Png
{
    /**
     * PngDOM
     */
    export class PngDOM extends ICad.View.DOM.DOMEmitter implements ICad.View.Image.Png.PngInterface
    {
        /** */
        _src : string

        /**
         *
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
            this.template = `<img src="${this.src}"/>`
        }
        
        /**
         * Getter of src
        * @return {string}  Value of src
         */
        get src() : string
        {
            return this._src
        }
        
        /**
         * Setter of src
        * @param {string} src New value of src
         */
        set src(src : string)
        {
            this._src = src
            this.updateTemplate()
            if(this.dom) this.dom.innerHTML = src
        }
    }
}
