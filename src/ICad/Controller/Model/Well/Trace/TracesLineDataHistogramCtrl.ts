namespace ICad.Controller.Model.Well.Trace
{
    /**
     * AbstractTracesRendererCtrl
     * @abstract
     */
    export abstract class TracesLineDataHistogramCtrl extends AbstractTracesLineDataCtrl
    {
        _content : ICad.View.AbstractView


        constructor(app: ICad.Application.AbstractApplication)
        {
            super(app);
            this._content = this.app.viewFactory.chartHistogram();
            this._content.addClasses('project-borehole-line-data-histogram')
            this._container.addChild(this._content);
        }

        update()
        {
            super.update();
            if(this.model)
            {
                this._content.visible=true;
                this._content.update();
            }
            else
            {
                this._content.visible=false;
            }
        }

        get model() : ICad.Model.Well.Trace
        {
            return super.model;
        }

        set model(trace : ICad.Model.Well.Trace)
        {
            super.model = trace;

            var log = this.model.log;
            var data = log.traces.data.data;
            var histogram = this._content as any as ICad.View.Chart.ChartHistogramInterface;
            histogram.data = this.model.data;
            histogram.axis.right = histogram.data.length;
            histogram.axis.left = 0;
            histogram.axis.bottom = log.display.min;
            histogram.axis.top = log.display.max;

            log.display.on('min.change', e=>{
                histogram.axis.bottom = e.data
                this._content.update();
            })
            log.display.on('max.change', e=>{
                histogram.axis.top = e.data
                this._content.update();
            })

            this.update();
        }
    }
}
