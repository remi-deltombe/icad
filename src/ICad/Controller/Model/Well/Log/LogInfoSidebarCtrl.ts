namespace ICad.Controller.Model.Well.Log
{
    /**
     * LogColumnDataCtrl
     */
    export class LogInfoSidebarCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl
    {
        /**/
        _title : ICad.View.AbstractView

        _content : ICad.View.AbstractView

        constructor(app : ICad.Application.AbstractApplication)
        {
            super(app)

            this._title = this.app.viewFactory.title("Log informations", 6)
            this._title.classes = "sidebar-title"

            this._content = this.app.viewFactory.container()
        }

        /**
         *
         */
        start()
        {
            super.start()
            this.view.addChild(this._title);
            this.view.addChild(this._content);
            this.model = this.app.config.get('activeLog')

            this.app.config.on('keys.activeLog.change', e=>{
                this.model = e.data as ICad.Model.Well.Log
            })
        }

        stop()
        {
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
            if(!model) return ;
            super.model = model;

            this._content.removeChildren();

            if(!this.model)
            {
                this._content.addChild(this.app.viewFactory.paragraph('No log selected'))
                return;
            }
            
            var log = this.model as ICad.Model.Well.Log;
            var name = this.app.viewFactory.paragraph(log.name);
            
            name.addClasses('info-title');
            this._content.addChild(name)

            var createInfo = (name, value) => {
                var container = this.app.viewFactory.container();
                var _title = this.app.viewFactory.paragraph(name);
                var _value = this.app.viewFactory.paragraph(value);

                container.addClasses('info-data')
                _title.addClasses('info-data-title')
                _value.addClasses('info-data-value')

                container.addChild(_title)
                container.addChild(_value)

                this._content.addChild(container);
            }

            createInfo('Top depth', log.traces.top)
            createInfo('Bottom depth', log.traces.bottom)
            createInfo('Data type', log.traces.data.at(0,0) instanceof Math.Color.Color ? 'color' : 'number')
            createInfo('Traces', log.traces.data.height)
            createInfo('Data per trace', log.traces.data.width)
            createInfo('Total of data', log.traces.data.width * log.traces.data.height)

        }
    }
}
