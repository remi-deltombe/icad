namespace ICad.Controller.Model.Well.Borehole
{
    /**
     * BoreholeColumnHeaderCtrl
     */
    export class BoreholeColumnHeaderCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl
    {
        _title : ICad.View.AbstractView
        _container : ICad.View.AbstractView
        _logs : ICad.Controller.Model.Well.Log.LogsColumnHeaderCtrl
        _ruler : Reference.ReferenceRulerHeaderCtrl

        constructor(app : ICad.Application.AbstractApplication)
        {
            super(app)

            this._title = this.app.viewFactory.title('',1)
            this._title.addClasses('project-borehole-header-title')

            this._container = this.app.viewFactory.container()
            this._container.classes = 'project-borehole-header-logs'

            this._logs = this.createController(ICad.Controller.Model.Well.Log.LogsColumnHeaderCtrl) as ICad.Controller.Model.Well.Log.LogsColumnHeaderCtrl;
            this._logs.view = this._container;
            
            var view = this.app.viewFactory.container()
            view.classes = 'project-borehole-header-logs-column ruler'
            this._container.addChild(view)
            this._ruler = this.createController(Reference.ReferenceRulerHeaderCtrl) as Reference.ReferenceRulerHeaderCtrl
            this._ruler.view = view
        }

        start()
        {
            this.view.addChild(this._title)
            this.view.addChild(this._container)
            super.start()
        }

        /*
        column(log : ICad.Model.Well.Log) : ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl
        {
            return this.controllers.find(v=>{
                return (v instanceof ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl) && (v as ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl).model.uuid == log.uuid
            }) as ICad.Controller.Model.Well.Log.LogColumnHeaderCtrl
        }
        */

        private updateTitle()
        {
            var text = (this.model as ICad.Model.Well.Borehole).name;
            (<ICad.View.Text.TitleInterface><any>this._title).text = text
        }

        /**
         * Getter of model
        * @return {ICad.Model.AbstractModel}  Value of model
         */
        get model() : ICad.Model.AbstractModel
        {
            return this._model
        }

        /**
         * Getter of reference
        * @return {number}  Value of reference
         */
        get reference() : number
        {
            return this._reference
        }

        /**
         * Getter of scale
        * @return {number}  Value of scale
         */
        get scale() : number
        {
            return this._scale
        }

        /**
         * Getter of logs
        * @return {ICad.Controller.Model.Well.Log.LogsColumnHeaderCtrl}  Value of logs
         */
        get logs() : ICad.Controller.Model.Well.Log.LogsColumnHeaderCtrl
        {
            return this._logs
        }

        /**
         * 
        * @param {ICad.Model.AbstractModel} model 
         */
        set model(model : ICad.Model.AbstractModel)
        {
            this._model = model
            this.updateTitle();


            var borehole = model as ICad.Model.Well.Borehole
            var that = this
            var index = 1;
            borehole.logs.forEach(log=>{
                this._logs.addLog(log)
            })
        }

        /**
         * Getter of reference
        * @return {number}  Value of reference
         */
        set reference(reference : number)
        {
            super.reference = reference
        }

        /**
         * Getter of reference
        * @return {number}  Value of reference
         */
        set scale(scale : number)
        {
            super.scale = scale
        }
    }
}
