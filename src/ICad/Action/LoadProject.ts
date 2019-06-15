namespace ICad.Action
{
    /**
     * LoadProject
     */
    export class LoadProject extends ICad.Action.ActionAppWorkflow
    {
        /** */
        _storage : ICad.Storage.AbstractStorage

        /** */
        _project : ICad.Model.Well.Project
        
        /**
         * Construct a new LoadProject action.
        * @param {ICad.Application.AbstractApplication} app App used to construct controllers.
        ,* @param {ICad.Model.Well.Project} borehole Log to open.
         */
        constructor(app : ICad.Application.AbstractApplication, storage : ICad.Storage.AbstractStorage, project : ICad.Model.Well.Project)
        {
            super(app)
            this.project = project
            this.storage = storage
        }
        
        /**
         * 
         */
        async act()
        {
            var loading = this.app.controllerFactory.instantiate(ICad.Controller.Misc.LoadingCtrl);
            //this.app.documents.addController(loading)
            loading.view = this.app.viewFactory.container();
            this.app.viewFactory.root().addChild(loading.view);
            loading.start();

            this.app.config.set('activeLog', null)

            var query = new ICad.Storage.Query();
            query.parent = this.project;
            this.project.boreholes = await this.storage.getBoreholes(query);
            var boreholesIterator = this.project.boreholes.entries();
            for(var boreholeValue of boreholesIterator)
            {
                var borehole = boreholeValue[1];
                query.parent = borehole;
                borehole.logs = await this.storage.getLogs(query);
                var logsIterator = borehole.logs.entries();
                for(var logValue of logsIterator)
                {
                    var log = logValue[1];
                    query.parent = log;
                    log.traces = await this.storage.getTraces(query);

                }
            }

            this.app.viewFactory.root().removeChild(loading.view);
            loading.stop();

            return this.project
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
         * Getter of storage
        * @return {ICad.Storage.AbstractStorage}  Value of storage
         */
        get storage() : ICad.Storage.AbstractStorage
        {
            return this._storage
        }
        
        /**
         * Setter of project
        * @param {ICad.Model.Well.Project} project New value of project
         */
        set project(project : ICad.Model.Well.Project)
        {
            this._project = project
        }
        
        /**
         * Setter of storage
        * @param {ICad.Storage.AbstractStorage} storage New value of storage
         */
        set storage(storage : ICad.Storage.AbstractStorage)
        {
            this._storage = storage
        }
    }
}
