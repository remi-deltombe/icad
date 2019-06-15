namespace ICad.Controller.Model.Well.Project
{
    /**
     * ProjectFrameCtrl
     */
    export class ProjectFrameCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl
    {
        _boreholes : ICad.View.AbstractView
        _preview : ICad.View.AbstractView
        _previewCtrl : ProjectPreviewCtrl

        constructor(app : ICad.Application.AbstractApplication)
        {
            super(app)
            this._boreholes = this.app.viewFactory.container()
            this._boreholes.addClasses('project-boreholes')
            this._preview = this.app.viewFactory.container()
            this._preview.addClasses('project-preview')

            this._previewCtrl = new ProjectPreviewCtrl(this.app, this);
            this._previewCtrl.view = this._preview;


            this._previewCtrl.on('project-reference-change', e=> { 
                if(!isNaN(e.data)) this.reference = e.data;
                this.trigger('project-reference-change', this.reference);
            })
        }

        start()
        {
            this.view.addChild(this._boreholes)
            this.view.addChild(this._preview)
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
            this.addController(this._previewCtrl);

            var project = model as ICad.Model.Well.Project
            var that = this
            project.boreholes.forEach(borehole=>{
                var controller = that.createModelController(borehole, ICad.Controller.Model.Well.Borehole.BoreholeColumnCtrl)
                var view = that.app.viewFactory.container()
                view.addClasses('project-borehole')
                that._boreholes.addChild(view)
                controller.view = view

                controller.on('project-scale-change', e=> { 
                    var scale = that.scale + e.data 
                    scale = window.Math.max(0.01, scale)
                    scale = window.Math.min(100, scale)
                    if(!isNaN(scale)) 
                    {
                        this.scale = scale
                        this.reference = this.reference
                    }
                })
                controller.on('project-reference-change', e=> { 
                    var reference = that.reference - e.data 
                    if(!isNaN(reference)) this.reference = reference
                    this.trigger('project-reference-change', reference);
                })
                controller.on('borehole-reference-change', e=> { 
                    this.trigger('project-borehole-reference-change', e.data);
                })


            })


            // Update preview
            this._previewCtrl.render();
        }
    }
}
