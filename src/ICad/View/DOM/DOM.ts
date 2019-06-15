namespace ICad.View.DOM
{
    /**
     * DOM
     */
    export class DOM extends ICad.View.AbstractView
    {
        /** HTML of this dom.*/
        _dom : Element
        
        /** Template used to render  dom.
         * It should be formated as html.
         * Exemple : "<div>My template</div>"*/
        _template : string = ''

        /**
         *
         */
        _requestAnimationFrameID : number = null

        /**
         * Construct its dom based on its template.
         * Append it  to its parent dom if its parent is a DOM.
         * Trigger the event "render.dom.before".
         * Trigger the event "render.dom.after".
         * 
         */
        render()
        {

            this.removeDomFromParent()
            this.dom = document.createElement('div')
            this.dom.innerHTML = this.template
            if(this.dom.children.length == 1)
            {
                this.dom = this.dom.children[0]
                this.dom.parentElement.removeChild(this.dom)
            }
            this.update();
            super.render();
        }
        
        /**
         * Update the content of this view without regenerate it
         * All children of this view are updated too.
         */
        update()
        {
            this.visible = this.visible
            this.classes = this.classes
            
            var translation = '';
            if(this.position.x || this.position.y)
            {
                (this.dom as HTMLElement).style.transform = 'translate3d('+round(this.position.x)+'px,'+round(this.position.y)+'px,0)';
            }
            if(this.position.width) (this.dom as HTMLElement).style.width = this.position.width + 'px';
            if(this.position.height) (this.dom as HTMLElement).style.height = this.position.height + 'px';

            super.update();
        }

        /**
         *
         */
        invalidate()
        {
            var that = this
            //setTimeout(function(){
                if(!that._requestAnimationFrameID)
                {
                    that._requestAnimationFrameID = requestAnimationFrame(function(){
                        that._requestAnimationFrameID = null
                        that.render()
                    })
                }
            //},0)
        }


        /**
         * Add a child to this view.
         * Remove the child of the old parent, if needed.
        * @param {ICad.View.AbstractView} child 
         */
        addChild(child : ICad.View.AbstractView)
        {
            super.addChild(child)
            child.visible = child.visible
        }
        /**
         *
         */
        private removeDomFromParent()
        {
            if(this.dom && this.dom.parentElement)
            {
                this.dom.parentElement.removeChild(this.dom)
            }
        }

        /**
         *
         */
        private addDomToParent()
        {
            if(this.parent && this.dom)
            {
                // lookup for a valid parent to append
                var current = this.parent
                while(current && !(current instanceof DOM)) current = current.parent
                if(current)
                {
                    var parent = current as DOM
                    if(parent.dom && (parent.dom != this.dom.parentElement))
                    {
                        parent.dom.appendChild(this.dom)
                    }
                }
            }
        }

        /**
         * Getter of parent
        * @return {AbstractView}  Value of parent
         */
        get parent() : AbstractView
        {
            return this._parent
        }
        
        /**
         * Getter of dom
        * @return {Element}  Value of dom
         */
        get dom() : Element
        {
            return this._dom
        }
        
        /**
         * Getter of template
        * @return {string}  Value of template
         */
        get template() : string
        {
            return this._template
        }

        /**
         * Getter of visible
        * @return {boolean} Value of visible
         */
        get visible() : boolean
        {
            return this._visible
        }

        /**
         * Getter of classes
        * @return {string} Value of classes
         */
        get classes() : string
        {
            return this._classes
        }
        
        /**
         * Setter of parent
        * @param {AbstractView} parent New value of parent
         */
        set parent(parent : AbstractView)
        {
            this.removeDomFromParent()
            this._parent = parent
            this.addDomToParent()

        }
        
        /**
         * Setter of dom
        * @param {Element} dom New value of dom
         */
        set dom(dom : Element)
        {
            this._dom = dom
        }

        /**
         *
         */
        get offsetPosition() : ICad.Math.Geometry.Rectangle
        {
            var offset = new ICad.Math.Geometry.Rectangle()
            if(this._dom)
            {
                var parentPosition = this.parent ? this.parent.offsetPosition : null
                offset.x = (this._dom as any).offsetLeft + (parentPosition ? parentPosition.left : 0)
                offset.y = (this._dom as any).offsetTop + (parentPosition ? parentPosition.top : 0)
                offset.width = (this._dom as any).offsetWidth
                offset.height = (this._dom as any).offsetHeight
            }
            return offset
        }
        
        /**
         * Setter of template
        * @param {string} template New value of template
         */
        set template(template : string)
        {
            this._template = template
        }

        /**
         * Setter of visible
        * @param {boolean} visible New value of visible
         */
        set visible(visible : boolean)
        {
            this._visible = visible

            if(this.dom)
            {
                if(visible)
                {
                    this.addDomToParent()
                }
                else if(!visible && this.dom.parentElement)
                {
                    this.removeDomFromParent()
                }
            }
        }

        /**
         * Setter of classes
        * @param {string} Value of classes
         */
        set classes(classes : string)
        {
            this._classes = classes
            if(this.dom)
            {
                this.dom.className = classes
            }
        }
    }
}
