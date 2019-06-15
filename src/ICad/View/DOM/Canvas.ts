namespace ICad.View.DOM
{
    /**
     * Canvas
     */
    export class Canvas extends ICad.View.DOM.DOMEmitter
    {
        render()
        {
            if(!this.dom)
            {
                var that = this
                this.dom = document.createElement('canvas')
                this.events.forEach((v,k) => {that.bindEvent(k,v)})
            }
            this.visible = this.visible
            this.classes = this.classes
            AbstractView.prototype.render.call(this)
        }

        update()
        {
            super.update();
            (this.dom as HTMLElement).style.transform = '';
            (this.dom as HTMLElement).style.left = '';
            (this.dom as HTMLElement).style.top = '';
            (this.dom as HTMLElement).style.width = '';
            (this.dom as HTMLElement).style.height = '';

        }
    }
}
