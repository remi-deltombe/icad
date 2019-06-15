namespace ICad.Controller.Model.Well.Log
{
    /**
     * LogColumnDataCtrl
     */
    export class LogsColumnHeaderCtrl extends ICad.Controller.Model.AbstractModelListCtrl<ICad.Model.Well.LogCollection>
    {
        _columns : Map<ICad.Model.Well.Log, ICad.Controller.Model.Well.Log.LogColumnDataCtrl>

        _container : ICad.View.AbstractView

        /** Models used by this controller.*/
        _models : ICad.Model.Well.LogCollection

        constructor(app:ICad.Application.AbstractApplication)
        {
            super(app);
            this.models = new ICad.Model.Well.LogCollection();
            this._columns = new Map();
            this._container = this.app.viewFactory.container();
            this._container.classes = 'project-borehole-header-logs-container';
        }

        start()
        {
            this.view.addChild(this._container);
            super.start();
        }

        addLog(log:ICad.Model.Well.Log)
        {
            this.models.add(log);

            var controller = this.createModelController(log, ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl)

            var view = this.app.viewFactory.container()
            view.classes = 'project-borehole-header-logs-column'
            this._container.addChild(view)
            controller.view = view
        }

        column(log : ICad.Model.Well.Log) : ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl
        {
            return this.controllers.find(v=>{
                return (v instanceof ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl) && (v as ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl).model.uuid == log.uuid
            }) as ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl
        }

        get models() : ICad.Model.Well.LogCollection
        {
            return this._models;
        }

        set models(models : ICad.Model.Well.LogCollection)
        {
            this._models = models;
        }
    }
}
