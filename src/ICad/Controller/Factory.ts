namespace ICad.Controller
{
    /**
     * Factory
     */
    export class Factory
    {
        /** */
        _app : ICad.Application.AbstractApplication
        
        /**
         * 
        * @param {ICad.Application.AbstractApplication} app 
         */
        constructor(app : ICad.Application.AbstractApplication)
        {
            this.app = app
        }
        
        /**
         * 
        * @param {new ()=>ICad.Controller.AbstractCtrl} controller 
         */
        instantiate(controller : any)
        { 
            var result = new controller(this.app)
            return result
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
