namespace ICad.Controller
{
    /**
     * AbstractCtrl
     * @abstract
     */
    export abstract class AbstractCtrl extends Event.EventEmitter
    {
        /** View which contain views created by this controller.*/
        _view : ICad.View.AbstractView
        
        /** Is this controller started?*/
        _started : Boolean = false
        
        /** App which contain this application*/
        _app : ICad.Application.AbstractApplication
        
        /**
         * Construct a new abstract controller.
         * 
        * @param {ICad.Application.AbstractApplication} app App which contain this application
         */
        constructor(app : ICad.Application.AbstractApplication)
        {
            super()
            this.app = app
        }
        
        /**
         * Start this controller and its view.
         * Only work if it's not started.
         */
        start()
        {
            if(this.view) this.view.visible = true
            this._started = true
            if(this.view) this.view.render()
        }
        
        /**
         * Update this controller and its view.
         * If it's not started, it will start it first. 
         */
        update()
        {
            this.stop()
            this.start()
        }
        
        /**
         * Stop this controller and its view.
         * Only work if it's started.
         */
        stop()
        {
            if(this.view) this.view.visible = false
            this._started = false
        }

        /**
         * Getter of view
        * @return {ICad.View.AbstractView}  Value of view
         */
        get view() : ICad.View.AbstractView
        {
            return this._view
        }
        
        /**
         * Getter of started
        * @return {Boolean}  Value of started
         */
        get started() : Boolean
        {
            return this._started
        }
        
        /**
         * Getter of app
        * @return {ICad.Application.AbstractApplication}  Value of app
         */
        get app() : ICad.Application.AbstractApplication
        {
            return this._app
        }
        
        /**
         * Setter of view
        * @param {ICad.View.AbstractView} view New value of view
         */
        set view(view : ICad.View.AbstractView)
        {
            this._view = view
        }
        
        /**
         * Setter of started
        * @param {Boolean} started New value of started
         */
        set started(started : Boolean)
        {
            this._started = started
        }
        
        /**
         * Setter of app
        * @param {ICad.Application.AbstractApplication} app New value of app
         */
        set app(app : ICad.Application.AbstractApplication)
        {
            this._app = app
        }
    }
}
