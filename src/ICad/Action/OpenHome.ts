namespace ICad.Action
{
    /**
     * OpenHome
     */
    export class OpenHome extends ICad.Action.ActionAppWorkflow
    {
        /**
         * Construct a new OpenLog action.
         */
        async act()
        {
            var home = this.app.controllerFactory.instantiate(ICad.Controller.Misc.HomeCtrl)
            this.app.documents.addController(home)
            this.app.documents.active = home
            
        }
    }
}
