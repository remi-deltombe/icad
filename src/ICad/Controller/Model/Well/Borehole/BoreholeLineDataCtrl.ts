namespace ICad.Controller.Model.Well.Borehole
{
    /**
     * BoreholeColumnDataCtrl
     */
    export class BoreholeLineDataCtrl extends ICad.Controller.Model.AbstractModelCtrl
    {
        _column : ICad.Controller.Model.Well.Borehole.BoreholeColumnDataCtrl
        _container : ICad.View.AbstractView
        _referenceDom : ICad.View.AbstractView
        _referenceInputDom : ICad.View.AbstractView
        _datas : Map<ICad.Model.Well.Log, ICad.Controller.Model.Well.Trace.AbstractTracesLineDataCtrl> = new Map();
        _displayLiveStats : boolean = false;

        constructor(app : ICad.Application.AbstractApplication, column : ICad.Controller.Model.Well.Borehole.BoreholeColumnDataCtrl)
        {
            super(app)

            this._column = column;
            this._container = this.app.viewFactory.container()
            this._container.classes = 'project-borehole-line-data'

            this._referenceDom = this.app.viewFactory.paragraph('');
            this._referenceDom.classes = 'project-borehole-line-data-reference';

            this._referenceInputDom = this.app.viewFactory.textfield(null, null, '');
            this._referenceInputDom.visible = false;
            this._referenceDom.addChild(this._referenceInputDom);

            this._container.addChild(this._referenceDom);

            var input = this._referenceInputDom as any as View.Form.Input.TextField.TextFieldInterface;

            this._referenceDom.on('click', e=>{
                input.value = this.reference.toFixed(2);
                this._referenceInputDom.visible = true;
                this._referenceInputDom.render();
                input.focus();
            })

            this._referenceInputDom.on('focus-out', e=>{
                this._referenceInputDom.visible = false;
                this._referenceInputDom.render();
                this.trigger('project-reference-change', parseFloat(input.value));
            })

            
        }

        start()
        {
            this.view.addChild(this._container)
            super.start()
            this.render();
        }

        update()
        {
            super.update()
            this.render();
        }

        render()
        {
            (this._referenceDom as any as ICad.View.Text.ParagraphInterface).text = ICad.Util.Text.formatNumber(this.reference, 2);

            if(this.app.config.get('displayLiveStats'))
            {
                this._column.logs.columns.forEach((v, l)=>{
                    var ctrl = this._datas.get(l);
                    if(!ctrl)
                    {
                        if(l.traces.data.width > 1)
                        {
                            if(l.traces.data._data[0] instanceof ICad.Math.Color.Color)
                            {
                                ctrl = this.createController(ICad.Controller.Model.Well.Trace.TracesLineDataHistogramRGBCtrl) as ICad.Controller.Model.Well.Trace.AbstractTracesLineDataCtrl;
                            }
                            else
                            {
                                ctrl = this.createController(ICad.Controller.Model.Well.Trace.TracesLineDataHistogramCtrl) as ICad.Controller.Model.Well.Trace.AbstractTracesLineDataCtrl;
                            }
                        }
                        else
                            ctrl = this.createController(ICad.Controller.Model.Well.Trace.TracesLineDataFirstDataCtrl) as ICad.Controller.Model.Well.Trace.AbstractTracesLineDataCtrl;
                        var view = this.app.viewFactory.container();
                        ctrl.view = view;
                        this._container.addChild(view);
                        this._datas.set(l, ctrl);
                    }
                    if(this.reference > l.traces.top && this.reference < l.traces.bottom)
                    {
                        var position = v.view.offsetPosition
                        var parentPosition = v.view.parent.offsetPosition
                        ctrl.start()
                        ctrl.model = l.traces.atReference(this.reference);
                        ctrl.container.position.x = position.x - parentPosition.x
                        ctrl.container.position.width = position.width
                        ctrl.container.render()
                    }
                    else
                    {
                        ctrl.stop()
                    }
                })
            }
            else
            {
                this._datas.forEach(c=>c.stop())
            }
        }

        /**
         *
         */
        get reference() : number
        {
            return this._reference
        }

        /**
         *
         */
        get scale() : number
        {
            return this._scale
        }

        /**
         *
         */
        get column() : ICad.Controller.Model.Well.Borehole.BoreholeColumnDataCtrl
        {
            return this._column
        }

        get displayLiveStats() : boolean
        {
            return this._displayLiveStats
        }
        
        /**
         * Setter of reference
        * @param {number} reference New value of reference
         */
        set reference(reference : number)
        {
            super.reference = reference
            this.render();
        }

        /**
         * Setter of reference
        * @param {number} reference New value of reference
         */
        set scale(scale : number)
        {
            super.scale = scale
            this.render();
        }

        /**
         * Setter of column
        * @param {ICad.Controller.Model.Well.Borehole.BoreholeColumnDataCtrl} column New value of column
         */
        set column(column : ICad.Controller.Model.Well.Borehole.BoreholeColumnDataCtrl)
        {
            this._column = column
            this.render();
        }

        set displayLiveStats(displayLiveStats : boolean)
        {
            this._displayLiveStats = displayLiveStats
            this.render();
        }
        
    }
}
