namespace ICad.View.DOM
{
    /**
     * Body
     */
    export class Body extends ICad.View.DOM.DOMEmitter
    {
        /**
         * Instantiate a new Body.
         * It will get the current existing body and set its dom with it.
         */
        constructor()
        {
            super()
            this.dom = document.body
            this.bindEvents();
        }
        
        /**
         * Call AbstractView render.
         * The body is constant and shouldn't be rewrite.
         */
        render()
        {
            ICad.View.AbstractView.prototype.render.call(this)
        }
    }
}
