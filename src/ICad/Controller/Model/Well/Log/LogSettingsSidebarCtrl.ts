namespace ICad.Controller.Model.Well.Log
{
    /**
     * LogColumnDataCtrl
     */
    export class LogSettingsSidebarCtrl extends ICad.Controller.Model.AbstractModelDetailCtrl
    {
        /**/
        _title : ICad.View.AbstractView

        _content : ICad.View.AbstractView

        _events : ICad.Event.Registration[] = new Array(1);

        constructor(app : ICad.Application.AbstractApplication)
        {
            super(app)

            this._title = this.app.viewFactory.title("Log settings", 6)
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
            this._events[0] = this.app.config.on('keys.activeLog.change', e=>{
                this.model = e.data as ICad.Model.Well.Log
            })
            this.model = this.app.config.get('activeLog')
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
            super.model = model;

            this._content.removeChildren();

            if(!this.model)
            {
                this._content.addChild(this.app.viewFactory.paragraph('No log selected'))
                return;
            }
            
            var log = this.model as ICad.Model.Well.Log;
            var name = this.app.viewFactory.paragraph(log.name);
            
            name.addClasses('settings-title');
            this._content.addChild(name)

            if(!(log.traces.data.at(0, 0) instanceof Math.Color.Color))
            {
                var min = this.app.viewFactory.textfield('Min', 'min', log.display.min.toString());
                var max = this.app.viewFactory.textfield('Max', 'max', log.display.max.toString());
                this._content.addChild(min);
                this._content.addChild(max);

                (max as View.AbstractView).on('focus-out', e=>{
                    if(log.display.max !== parseFloat(e.data)) log.display.max = parseFloat(e.data)
                });
                (min as View.AbstractView).on('focus-out', e=>{
                    if(log.display.min !== parseFloat(e.data)) log.display.min = parseFloat(e.data)
                });
    
                if(log.traces.data.width > 1)
                {
                    var colorMin = this.app.viewFactory.colorpicker('Color min', 'color_min', log.display.colors[0]);
                    var colorMax = this.app.viewFactory.colorpicker('Color max', 'color_max', log.display.colors[1]);
                    this._content.addChild(colorMin);
                    this._content.addChild(colorMax);
                    (colorMin as View.AbstractView).on('focus-out', e=>{
                        if(!log.display.colors[0].equal(e.data as Math.Color.Color))
                        {
                            log.display.colors[0] = e.data as Math.Color.Color;
                            log.display.trigger('colors.change', log.display.colors)
                        }
                    });
                    (colorMax as View.AbstractView).on('focus-out', e=>{
                        if(!log.display.colors[1].equal(e.data as Math.Color.Color))
                        {
                            log.display.colors[1] = e.data as Math.Color.Color;
                            log.display.trigger('colors.change', log.display.colors)
                        }
                    });
                }
                else
                {
                    var color = this.app.viewFactory.colorpicker('Color', 'color', log.display.colors[0]);
                    this._content.addChild(color);

                    (color as View.AbstractView).on('focus-out', e=>{
                        log.display.colors[0] = e.data as Math.Color.Color;
                        log.display.trigger('colors.change', log.display.colors)
                    });
                }


            }
        }
    }
}
