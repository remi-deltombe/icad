namespace ICad.Action
{
    /**
     * OpenProject
     */
    export class OpenProject extends ICad.Action.ActionAppWorkflow
    {
        /** */
        _project : ICad.Model.Well.Project
        
        /**
         * Construct a new OpenProject action.
        * @param {ICad.Application.AbstractApplication} app App used to construct controllers.
        ,* @param {ICad.Model.Well.Project} project Project to open.
         */
        constructor(app : ICad.Application.AbstractApplication, project : ICad.Model.Well.Project)
        {
            super(app)
            this.project = project
        }
        
        /**
         * 
         */
        async act()
        {
            var controller = this.app.controllerFactory.instantiate(ICad.Controller.Model.Well.Project.ProjectFrameCtrl) as ICad.Controller.Model.Well.Project.ProjectFrameCtrl
            controller.model = this.project
            this.app.documents.removeControllers()
            this.app.documents.addController(controller)
            this.app.documents.active = controller;
            this.app.navigation.open = false

            var reference = -1;
            this.project.boreholes.forEach(b=>{
                b.logs.forEach(l=>{
                    if(reference === -1)
                        reference = l.traces.top;
                    else
                        reference = min(reference, l.traces.top);
                })
            })
            controller.reference = reference;
        }
        
        /**
         * Getter of project
        * @return {ICad.Model.Well.Project}  Value of project
         */
        get project() : ICad.Model.Well.Project
        {
            return this._project
        }
        
        /**
         * Setter of project
        * @param {ICad.Model.Well.Project} project New value of project
         */
        set project(project : ICad.Model.Well.Project)
        {
            this._project = project
        }
    }
}
