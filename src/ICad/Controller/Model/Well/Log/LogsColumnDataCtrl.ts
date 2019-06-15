namespace ICad.Controller.Model.Well.Log
{
    /**
     * LogColumnDataCtrl
     */
    export class LogsColumnDataCtrl extends ICad.Controller.Model.AbstractModelListCtrl<ICad.Model.Well.LogCollection>
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
            this._container.classes = 'project-borehole-content-logs-container';
        }

        start()
        {
            this.view.addChild(this._container);
            super.start();
        }

        addLog(log:ICad.Model.Well.Log)
        {
            this.models.add(log);

            var controller = this.createModelController(log, ICad.Controller.Model.Well.Log.LogColumnDataCtrl) as  ICad.Controller.Model.Well.Log.LogColumnDataCtrl

            var view = this.app.viewFactory.container()
            view.classes = 'project-borehole-content-logs-column'
            this._container.addChild(view)
            controller.view = view

            this.columns.set(log, controller);

            var cb = function(log,e){
                this.trigger('column-width-change', {log, width:e.data})
            }.bind(this, log)
            controller.on('column-width-change', cb)
        }

        column(log : ICad.Model.Well.Log) : ICad.Controller.Model.Well.Log.LogColumnDataCtrl
        {
            return this.controllers.find(v=>{
                return (v instanceof ICad.Controller.Model.Well.Log.LogColumnDataCtrl) && (v as ICad.Controller.Model.Well.Log.LogColumnDataCtrl).model.uuid == log.uuid
            }) as ICad.Controller.Model.Well.Log.LogColumnDataCtrl
        }

        get models() : ICad.Model.Well.LogCollection
        {
            return this._models;
        }
        
        get columns() :  Map<ICad.Model.Well.Log, ICad.Controller.Model.Well.Log.LogColumnDataCtrl>
        {
            return this._columns;
        }

        set models(models : ICad.Model.Well.LogCollection)
        {
            this._models = models;
        }

        set columns(columns :  Map<ICad.Model.Well.Log, ICad.Controller.Model.Well.Log.LogColumnDataCtrl>)
        {
            this._columns = columns;
        }
    }
}
