namespace ICad.Controller.Model.Well.Borehole
{
    /**
     * BoreholeColumnCtrl
     */
    export class BoreholeColumnCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl
    {
        _header : ICad.View.AbstractView
        _data : ICad.View.AbstractView

        constructor(app : ICad.Application.AbstractApplication)
        {
            super(app)
            this._header = this.app.viewFactory.container()
            this._header.addClasses('project-borehole-header')
            this._data = this.app.viewFactory.container()
            this._data.addClasses('project-borehole-content')

        }

        start()
        {
            this.view.addChild(this._header)
            this.view.addChild(this._data)
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
            
            var header = this.createModelController(model, ICad.Controller.Model.Well.Borehole.BoreholeColumnHeaderCtrl) as ICad.Controller.Model.Well.Borehole.BoreholeColumnHeaderCtrl
            var data = this.createModelController(model, ICad.Controller.Model.Well.Borehole.BoreholeColumnDataCtrl) as ICad.Controller.Model.Well.Borehole.BoreholeColumnDataCtrl
            
            header.view = this._header
            data.view = this._data
            

            // Events ------------------------

            // Header
            var target = {
                action: null,
                target: null,
                log: null,
            }

            header.on('log-move', e=>{
                target.log = e.data
                this._header.addClasses('dragzone-enable');
                this._app.container.on('mouseup',e=>{

                    if(target.target && target.log && target.action)
                    {

                    }

                    this._header.removeClasses('dragzone-enable');
                })
            })
            header.on('target-set', e=>{
                target.action = e.data
                target.target = e._emitter
            })
            header.on('target-unset', e=>{
                target.target = null
            })

            // Content
            data.on('project-scale-change', e=> this.trigger('project-scale-change', e.data))
            data.on('project-reference-change', e=> this.trigger('project-reference-change', e.data))

            data.on('borehole-scale-change', e=> { 
                var scale = this.scale + e.data
                scale = window.Math.max(0.0001, scale)
                scale = window.Math.min(100, scale)
                if(!isNaN(scale)) 
                {
                    this.scale = scale
                    this.reference = this.reference
                }
            })

            data.on('borehole-reference-change', e=> { 
                var reference = this.reference - e.data 
                if(!isNaN(reference)) this.reference = reference
                this.trigger('borehole-reference-change', e.data)
            })
            
            data.on('column-width-change', e=>{
                var columnHeader = header.logs.column(e.data.log)
                var columnData = data.logs.column(e.data.log)

                columnHeader.view.position.width = e.data.width
                columnData.view.position.width = e.data.width
                
                columnHeader.view.update()
                columnData.view.update()

                this.update();
            })

        }
    }
}
