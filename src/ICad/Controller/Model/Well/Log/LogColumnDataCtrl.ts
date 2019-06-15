namespace ICad.Controller.Model.Well.Log
{
    /**
     * LogColumnDataCtrl
     */
    export class LogColumnDataCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl
    {
        _traces : View.AbstractView

        _drag : ICad.View.AbstractView

        constructor(app : Application.AbstractApplication)
        {
            super(app)
            this._traces = this.app.viewFactory.container() 
            this._drag = this.app.viewFactory.container();
            this._drag.addClasses('dragzone')

            this._drag.on('mousedown', e=>{

                var previousPosition = e.data.clientX
                var e1 = this._app.container.on('mousemove', e=>{
                    this.trigger('column-width-change', this._view.offsetPosition.width + e.data.clientX - previousPosition)
                    previousPosition = e.data.clientX
                })

                var e2 = this._app.container.on('mouseup', e=>{
                    this._app.container.off(e1);
                    this._app.container.off(e2);
                })
            })
        }

        start()
        {
            this.view.addChild(this._traces)
            this.view.addChild(this._drag)
            super.start()
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
         * 
        * @param {ICad.Model.AbstractModel} model 
         */
        set model(model : ICad.Model.AbstractModel)
        {
            this._model = model
            this.removeControllers()

            var log = model as ICad.Model.Well.Log
            if(log.traces.data.width > 1)
            {
                if(log.traces.data._data[0] instanceof ICad.Math.Color.Color)
                    var controller = this.app.controllerFactory.instantiate(Trace.TracesRendererImageCtrl)
                else
                    var controller = this.app.controllerFactory.instantiate(Trace.TracesRendererHeatmapCtrl)
            }
            else
                var controller = this.app.controllerFactory.instantiate(Trace.TracesRendererLinesCtrl)
            
            controller.models = log.traces
            this.addController(controller)
            controller.view = this._traces
            if(this.started)controller.start()

            var that = this
            controller.on('project-scale-change', e=> { that.trigger('project-scale-change', e.data) })
            controller.on('borehole-scale-change', e=> { that.trigger('borehole-scale-change', e.data) })
            controller.on('project-reference-change', e=> { that.trigger('project-reference-change', e.data) })
            controller.on('borehole-reference-change', e=> { that.trigger('borehole-reference-change', e.data) })
        }
    }
}
