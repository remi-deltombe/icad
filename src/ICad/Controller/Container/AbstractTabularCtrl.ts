namespace ICad.Controller.Container
{
    /**
     * AbstractTabularCtrl
     * @abstract
     */
    export abstract class AbstractTabularCtrl extends ICad.Controller.AbstractCompositeCtrl
    {
        /** Controller to display.*/
        _active : AbstractCtrl
        
        /**  */
        _tabs : ICad.View.AbstractView
        
        /**  */
        _content : ICad.View.AbstractView

        /**
         * Stop all this tabular controller except its active one.
         * Start the active controller if needed.
         */
        constructor(app: ICad.Application.AbstractApplication)
        {
            super(app)
            this.tabs = this.app.viewFactory.container() 
            this.content = this.app.viewFactory.container() 
        }

        /**
         * Stop all this tabular controller except its active one.
         * Start the active controller if needed.
         */
        start()
        {
            var active = this.active
            this.controllers.forEach(v=>v===active ? v.start() : v.stop())
            this.view.addChild(this.tabs)
            this.view.addChild(this.content)
            super.start()
        }

        /**
         * 
        * @param {ICad.Controller.AbstractCtrl} controller 
         */
        addController(controller : ICad.Controller.AbstractCtrl)
        {
            controller.view = this.app.viewFactory.container()
            this.controllers.push(controller);
        }

        /**
         * 
        * @param {ICad.Controller.AbstractCtrl} controller 
         */
        removeController(controller : ICad.Controller.AbstractCtrl)
        {
            this.view.removeChild(controller.view)
            super.removeController(controller)
        }

        /**
         * 
        * @param {ICad.Controller.AbstractCtrl} controller 
         */
        removeControllers()
        {
            super.removeControllers()
            this._active = null
        }

        /**
         * Getter of active
        * @return {AbstractCtrl}  Value of active
         */
        get active() : AbstractCtrl
        {
            return this._active
        }

        /**
         * Getter of tabs
        * @return {ICad.View.AbstractView}  Value of tabs
         */
        get tabs() : ICad.View.AbstractView
        {
            return this._tabs
        }
        
        /**
         * Getter of content
        * @return {ICad.View.AbstractView}  Value of content
         */
        get content() : ICad.View.AbstractView
        {
            return this._content
        }
        
        /**
         * Setter of active
        * @param {AbstractCtrl} active New value of active
         */
        set active(active : AbstractCtrl)
        {
            if(this.active)
            {
                this.active.stop()
                this.content.removeChild(this.active.view)
            }
            this._active = active
            if(this.active)
            {
                this.content.addChild(this.active.view)
                if(this.started) this.active.start()
            }
        }
        
        /**
         * Setter of tabs
        * @return {ICad.View.AbstractView}  tabs New value of tabs
         */
        set tabs(tabs : ICad.View.AbstractView)
        {
            this._tabs = tabs
        }
        
        /**
         * Setter of content
        * @return {ICad.View.AbstractView}  content New value of content
         */
        set content(content : ICad.View.AbstractView)
        {
            this._content = content
        }
    }
}
