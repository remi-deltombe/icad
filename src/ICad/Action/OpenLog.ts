namespace ICad.Action
{
    /**
     * OpenLog
     */
    export class OpenLog extends ICad.Action.ActionAppWorkflow
    {
        /** */
        _log : ICad.Model.Well.Log
        
        /**
         * Construct a new OpenLog action.
        * @param {ICad.Application.AbstractApplication} app App used to construct controllers.
        ,* @param {ICad.Model.Well.Log} log Log to open.
         */
        constructor(app : ICad.Application.AbstractApplication, log : ICad.Model.Well.Log)
        {
            super(app)
            this.log = log
        }
        
        /**
         * 
         */
        async act()
        {
            var controller = this.app.controllerFactory.instantiate(ICad.Controller.Model.Well.Project.ProjectFrameCtrl) as ICad.Controller.Model.Well.Project.ProjectFrameCtrl
            controller.model = this.log.borehole.project
            this.app.documents.removeControllers()
            this.app.documents.addController(controller)
            this.app.documents.active = controller;
            this.app.navigation.open = false
        }
        
        /**
         * Getter of log
        * @return {ICad.Model.Well.Log}  Value of log
         */
        get log() : ICad.Model.Well.Log
        {
            return this._log
        }
        
        /**
         * Setter of log
        * @param {ICad.Model.Well.Log} log New value of log
         */
        set log(log : ICad.Model.Well.Log)
        {
            this._log = log
        }
    }
}
