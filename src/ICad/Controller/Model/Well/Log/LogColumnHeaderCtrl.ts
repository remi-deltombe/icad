namespace ICad.Controller.Model.Well.Log
{
    /**
     * LogColumnHeaderCtrl
     */
    export class LogColumnHeaderCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl
    {
        _content : ICad.View.AbstractView
        _title : ICad.View.AbstractView
        _preview : ICad.View.AbstractView
        _min : ICad.View.AbstractView
        _max : ICad.View.AbstractView
        _unit : ICad.View.AbstractView
        
        _dragzoneN : ICad.View.AbstractView
        _dragzoneS : ICad.View.AbstractView
        _dragzoneE : ICad.View.AbstractView
        _dragzoneW : ICad.View.AbstractView

        _events : Event.Registration[] = new Array(2);

        constructor(app : ICad.Application.AbstractApplication)
        {
            super(app)
            this._content = this.app.viewFactory.container()
            this._content.addClasses('project-borehole-header-log')

            this._title = this.app.viewFactory.paragraph('')
            this._preview  = this.app.viewFactory.draw()
            this._min  = this.app.viewFactory.paragraph('')
            this._max  = this.app.viewFactory.paragraph('')
            this._unit  = this.app.viewFactory.paragraph('')

            this._dragzoneN = this.app.viewFactory.container()
            this._dragzoneS = this.app.viewFactory.container()
            this._dragzoneE = this.app.viewFactory.container()
            this._dragzoneW = this.app.viewFactory.container()

            this._title.addClasses('title')
            this._preview.addClasses('preview')
            this._min.addClasses('min')
            this._max.addClasses('max')
            this._unit.addClasses('unit')

            this._dragzoneN.addClasses('dragzone-n');
            this._dragzoneS.addClasses('dragzone-s');
            this._dragzoneE.addClasses('dragzone-e');
            this._dragzoneW.addClasses('dragzone-w');

            this._content.addChild(this._title)
            this._content.addChild(this._preview)
            this._content.addChild(this._min)
            this._content.addChild(this._unit)
            this._content.addChild(this._max)
            this._content.addChild(this._dragzoneN)
            this._content.addChild(this._dragzoneS)
            this._content.addChild(this._dragzoneE)
            this._content.addChild(this._dragzoneW)
        }

        start()
        {
            this.view.addChild(this._content)
            super.start()

            this._events[0] = this._content.on('click', ()=>{
                this.app.config.set('activeLog', this.model);
            });

            this._events[0] = this.app.config.on('keys.activeLog.change', (event)=>{
                if(event.data && this.model.uuid == event.data.uuid)
                {
                    this._content.addClasses('active')
                    this._content.render();
                }
                else if(this._content.hasClass('active'))
                {
                    this._content.removeClasses('active')
                    this._content.render();
                }
            });
        }

        update()
        {
            super.update();
        }

       stop()
       {
            super.stop();
            this._content.off(this._events[0])
            this.app.config.off(this._events[1])
       }

        renderPreview()
        {
            var log = this.model as ICad.Model.Well.Log
            if(log.traces.data.width > 1)
            {
                var renderer = this.app.controllerFactory.instantiate(Trace.TracesRendererHeatmapCtrl) as Trace.AbstractTracesRendererCtrl;
                renderer.models = log.traces
            }
            else
            {
                var renderer = this.app.controllerFactory.instantiate(Trace.TracesRendererLinesCtrl) as Trace.AbstractTracesRendererCtrl;
                renderer.models = log.traces
            }
            renderer.renderer.renderHeader(this._preview);
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
            super.model = model;

            var log = model as ICad.Model.Well.Log

            if(log.traces.data._data[0] instanceof Math.Color.Color)
            {
                this._preview.visible = false;
                this._min.visible = false;
                this._max.visible = false;
                this._unit.visible = false;
            }

            (<ICad.View.Text.ParagraphInterface><any>this._title).text = (model as ICad.Model.Well.Log).name;
            (<ICad.View.Text.ParagraphInterface><any>this._min).text = log.display.min + '';
            (<ICad.View.Text.ParagraphInterface><any>this._max).text = log.display.max + '';
            (<ICad.View.Text.ParagraphInterface><any>this._unit).text = log.unit;

            log.display.on('min.change', e=>{
                (<ICad.View.Text.ParagraphInterface><any>this._min).text = e.data as string;
                this._min.render();
            })
            log.display.on('max.change', e=>{
                (<ICad.View.Text.ParagraphInterface><any>this._max).text = e.data as string;
                this._max.render();
            })
            log.display.on('colors.change', e=>{
                this.renderPreview();
            })

            delay(this.renderPreview.bind(this));
        }
    }
}
