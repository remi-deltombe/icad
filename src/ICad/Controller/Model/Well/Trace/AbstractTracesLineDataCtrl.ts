namespace ICad.Controller.Model.Well.Trace
{
    /**
     * AbstractTracesRendererCtrl
     * @abstract
     */
    export abstract class AbstractTracesLineDataCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl
    {
        _container : ICad.View.AbstractView
        _model : ICad.Model.Well.Trace

        constructor(app: ICad.Application.AbstractApplication)
        {
            super(app);
            this._container = this.app.viewFactory.container();
            this._container.addClasses('project-borehole-line-data-data')
        }

        update()
        {
            if(this.view) this.view.addChild(this._container);
            super.update();
        }

        start()
        {
            if(this.started) return;
            super.start();
        }

        get model() : ICad.Model.Well.Trace
        {
            return this._model;
        }

        set model(trace : ICad.Model.Well.Trace)
        {
            this._model = trace;
            this.update();
        }

        get container() : ICad.View.AbstractView
        {
            return this._container;
        }

        set container(container : ICad.View.AbstractView)
        {
            this._container = container;
        }
    }
}
