namespace ICad.Controller.Model.Well.Trace
{
    /**
     * AbstractTracesRendererCtrl
     * @abstract
     */
    export abstract class TracesLineDataHistogramRGBCtrl extends AbstractTracesLineDataCtrl
    {
        _content : ICad.View.AbstractView
        _r : ICad.View.AbstractView
        _g : ICad.View.AbstractView
        _b : ICad.View.AbstractView

        constructor(app: ICad.Application.AbstractApplication)
        {
            super(app);
            this._content = this.app.viewFactory.container();
            this._r = this.app.viewFactory.chartHistogram();
            this._g = this.app.viewFactory.chartHistogram();
            this._b = this.app.viewFactory.chartHistogram();

            (this._r as any as ICad.View.Chart.ChartInterface).color = new Math.Color.Color(255,0,0);
            (this._g as any as ICad.View.Chart.ChartInterface).color = new Math.Color.Color(0,255,0);
            (this._b as any as ICad.View.Chart.ChartInterface).color = new Math.Color.Color(0,0,255);

            (this._g as any as ICad.View.Chart.ChartInterface).background = false;
            (this._b as any as ICad.View.Chart.ChartInterface).background = false;

            this._content.addClasses('project-borehole-line-data-histogram')
            this._r.addClasses('project-borehole-line-data-histogram-color')
            this._g.addClasses('project-borehole-line-data-histogram-color')
            this._b.addClasses('project-borehole-line-data-histogram-color')

            this._content.addChild(this._r);
            this._content.addChild(this._g);
            this._content.addChild(this._b);
            this._container.addChild(this._content);
        }

        update()
        {
            super.update();
            if(this.model)
            {
                this._content.visible=true;
                var log = this.model.log;
                var data = log.traces.data.data;
                var r = this._r as any as ICad.View.Chart.ChartHistogramInterface;
                var g = this._g as any as ICad.View.Chart.ChartHistogramInterface;
                var b = this._b as any as ICad.View.Chart.ChartHistogramInterface;
                
                r.data = new Array(this.model.data.length)//this.model.data.slice(0).map(v=>v.r);
                g.data = new Array(this.model.data.length)//this.model.data.slice(0).map(v=>v.g);
                b.data = new Array(this.model.data.length)//this.model.data.slice(0).map(v=>v.b);
                
                for(var i=0; i<this.model.data.length; ++i)
                {
                    r.data[i] = this.model.data[i].r;
                    g.data[i] = this.model.data[i].g;
                    b.data[i] = this.model.data[i].b;
                }

                if(!r.axis.right)
                {
                    r.axis.right = r.data.length;
                    r.axis.left = 0;
                    r.axis.bottom = 0;
                    r.axis.top = 255;
                }
                if(!g.axis.right)
                {
                    g.axis.right = g.data.length;
                    g.axis.left = 0;
                    g.axis.bottom = 0;
                    g.axis.top = 255;
                }
                if(!b.axis.right)
                {
                    b.axis.right = b.data.length;
                    b.axis.left = 0;
                    b.axis.bottom = 0;
                    b.axis.top = 255;
                }
                this._content.update();
                this._r.update();
                this._g.update();
                this._b.update();
            }
            else
            {
                this._content.visible=false;
            }
        }
    }
}
