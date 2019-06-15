namespace ICad.View
{
    /**
     * AbstractView
     * @abstract
     */
    export abstract class AbstractView extends ICad.Event.EventEmitter
    {
        /** View which contains this view*/
        _parent : AbstractView
        
        /** Views contained by this view*/
        _children : Array<AbstractView> = []
        
        /** */
        _position : ICad.Math.Geometry.Rectangle = new ICad.Math.Geometry.Rectangle
        
        /** */
        _visible : boolean = true

        /** */
        _classes : string = ''
        
        /**
         * Refresh the render of this view.
         * All children of this view are refreshing too.
         */
        render()
        {
            for(var i=0; i<this.children.length; ++i)
            {
                this.children[i].render()
            }
        }
        
        /**
         * Update the content of this view without regenerate it
         * All children of this view are updated too.
         */
        update()
        {
            for(var i=0; i<this.children.length; ++i)
            {
                this.children[i].update()
            }
        }

        clear(){}

        /**
         *
         */
        invalidate()
        {
            this.update()
        }


        /**
         * Add a child to this view.
         * Remove the child of the old parent, if needed.
         * @param {ICad.View.AbstractView} child 
         */
        addChild(child : ICad.View.AbstractView)
        {
            if(child.parent===this) return
            if(child.parent) child.parent.removeChild(child)

            child.parent = this
            child.render()
            this.children.push(child)
        }
        
        /**
         * Remove a child from this view.
         * @param {ICad.View.AbstractView} child 
         */
        removeChild(child : ICad.View.AbstractView)
        {
            if(child.parent===this)
            {
                child.parent = null
                this.children.splice(this.children.indexOf(child), 1)
            }
        }

        /**
         * Remove all children from this view.
         * @param {ICad.View.AbstractView} child 
         */
        removeChildren()
        {
            for(var i=this.children.length-1; i>=0; --i)
            {
                this.removeChild(this.children[i])
            }
        }
        
        /**
         *
         */
        hasClass(_class:string)
        {
            return this.classes.split(' ').indexOf(_class) !== -1;
        }
        
        /**
         *
         */
        addClasses(classes:string)
        {
            var existing = this.classes.split(' ')
            var toAdd = classes.split(' ')

            for(var i=0; i<toAdd.length; ++i)
            {
                var index = existing.indexOf(toAdd[i])
                if(index === -1)
                {
                    existing.push(toAdd[i])
                }
            }

            this.classes = existing.join(' ')
        }

        /**
         *
         */
        removeClasses(classes:string)
        {
            var existing = this.classes.split(' ')
            var toAdd = classes.split(' ')

            for(var i=0; i<toAdd.length; ++i)
            {
                var index = existing.indexOf(toAdd[i])
                if(index !== -1)
                {
                    existing.splice(index,1)
                }
            }

            this.classes = existing.join(' ')
        }

        /**
         *
         */
        toggleClasses(classes:string)
        {
            var existing = this.classes.split(' ')
            var toToggle = classes.split(' ')

            for(var i=0; i<toToggle.length; ++i)
            {
                var index = existing.indexOf(toToggle[i])
                if(index === -1)
                {
                    existing.push(toToggle[i])
                }
                else
                {
                    existing.splice(index,1)
                }
            }

            this.classes = existing.join(' ')
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
         * Getter of children
         * @return {Array<AbstractView>}  Value of children
         */
        get children() : Array<AbstractView>
        {
            return this._children
        }
        
        /**
         * Getter of position
         * @return {ICad.Math.Geometry.Rectangle}  Value of position
         */
        get position() : ICad.Math.Geometry.Rectangle
        {
            return this._position
        }

        /**
         *
         */
        get offsetPosition() : ICad.Math.Geometry.Rectangle
        {
            return this._position
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
            this._parent = parent
        }
        
        /**
         * Setter of children
         * @param {Array<AbstractView>} children New value of children
         */
        set children(children : Array<AbstractView>)
        {
            this._children = children
        }
        
        /**
         * Setter of position
         * @param {ICad.Math.Geometry.Rectangle} position New value of position
         */
        set position(position : ICad.Math.Geometry.Rectangle)
        {
            this._position = position
        }
        
        /**
         * Setter of visible
         * @param {boolean} visible New value of visible
         */
        set visible(visible : boolean)
        {
            this._visible = visible
        }

        /**
         * Setter of classes
         * @param {string} Value of classes
         */
        set classes(classes : string)
        {
            this._classes = classes
        }
    }
}
