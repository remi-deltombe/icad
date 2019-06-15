namespace ICad.Controller.Model.Well.Borehole
{
    /**
     * BoreholeColumnDataCtrl
     */
    export class BoreholeColumnDataCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl
    {
        _container : ICad.View.AbstractView

        _logs : ICad.Controller.Model.Well.Log.LogsColumnDataCtrl

        _ruler : Reference.ReferenceRulerDataCtrl

        _touchHandler : ICad.Event.TouchEventHandler = new ICad.Event.TouchEventHandler()

        _line : ICad.Controller.Model.Well.Borehole.BoreholeLineDataCtrl

        constructor(app : ICad.Application.AbstractApplication)
        {
            super(app)

            this._container = this.app.viewFactory.container()
            this._container.classes = 'project-borehole-content-logs'

            this._logs = this.createController(ICad.Controller.Model.Well.Log.LogsColumnDataCtrl) as ICad.Controller.Model.Well.Log.LogsColumnDataCtrl;
            this._logs.view = this._container;

            var view = this.app.viewFactory.container()
            view.addClasses('project-borehole-content-logs-column ruler')
            this._container.addChild(view)
            this._ruler = this.createController(Reference.ReferenceRulerDataCtrl) as Reference.ReferenceRulerDataCtrl
            this._ruler.view = view

            var view = this.app.viewFactory.container()
            this._container.addChild(view)
            this._line = this.createController(ICad.Controller.Model.Well.Borehole.BoreholeLineDataCtrl) as ICad.Controller.Model.Well.Borehole.BoreholeLineDataCtrl
            this._line.column = this;
            this._line.view = view

            this._container.on('mousewheel', e => {
                console.log(e.data)
                var ctrl = this.app.keyboard.isDown('ctrl')
                var shift = this.app.keyboard.isDown('shift')

                if(ctrl && shift)
                    this.trigger('project-scale-change', e.data.deltaY / 1000)
                else if(ctrl)
                    this.trigger('borehole-scale-change', e.data.deltaY / 1000)

                else if(shift)
                    this.trigger('project-reference-change', (-e.data.deltaY/500) / this.scale)
                else
                    this.trigger('borehole-reference-change', (-e.data.deltaY/500)/ this.scale)
            })

            this._touchHandler.emitter = this._container

            this._line.on('project-reference-change', e=>{
                this.trigger('project-reference-change', this.reference- e.data)
            })

            this._touchHandler.on('scroll-1', e=> { 
                console.log(e.data)
                var height = this._container.offsetPosition.height
                this.trigger('project-reference-change', (e.data.y/height) / this._scale)
            })

            this._touchHandler.on('scroll-2', e=> { 
                var height = this._container.offsetPosition.height
                this.trigger('borehole-reference-change', (e.data.y/height) / this._scale)
            })
            
            this._touchHandler.on('zoom-2', e=> { 
                this.trigger('borehole-scale-change', 1 - ((e.data.zoom-1)/2))
            })

            this._touchHandler.on('zoom-3', e=> { 
                this.trigger('project-scale-change', 1 - ((e.data.zoom-1)/2))
            })

            this._logs.on('column-width-change', e=>{
                this.trigger('column-width-change', e.data)
            })
        }

        start()
        {
            this.view.addChild(this._container)
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

        get logs() : ICad.Controller.Model.Well.Log.LogsColumnDataCtrl
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

            var borehole = model as ICad.Model.Well.Borehole
            borehole.logs.forEach(log=>{
                this._logs.addLog(log);
            })
        }

    }
}
