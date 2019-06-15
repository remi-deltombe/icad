namespace ICad.Action
{
    /**
     * ActionAppWorkflow
     */
    export class ActionAppWorkflow extends ICad.Action.Action
    {
        /** */
        _app : ICad.Application.AbstractApplication
        
        /**
         * 
        * @param {ICad.Application.AbstractApplication} app 
         */
        constructor(app : ICad.Application.AbstractApplication)
        {
            super()
            this.app = app
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
         * Setter of app
        * @param {ICad.Application.AbstractApplication} app New value of app
         */
        set app(app : ICad.Application.AbstractApplication)
        {
            this._app = app
        }
    }
}
