namespace ICad.Controller.Model.Well.Trace
{
    /**
     * TracesRendererBitmapCtrl
     */
    export class TracesRendererHeatmapCtrl extends ICad.Controller.Model.Well.Trace.AbstractTracesRendererCtrl
    {
        _heatmap : View.AbstractView

        constructor(app : Application.AbstractApplication)
        {
            super(app)
            this._heatmap = this.app.viewFactory.traceHeatmap()
            this._heatmap.classes = 'data'
        }

        start()
        {
            if(this.started) return;
            this.view.addChild(this._heatmap)
            super.start()
            this.render()
        }

        /**
         *
         */
        render()
        {
            var that = this
            window.requestAnimationFrame(function(){
                that.reference = that.reference
                that.scale = that.scale
            })
        }

        buildData()
        {
            var heatmap = this._heatmap as any as View.Trace.HeatmapInterface
            heatmap.values = this.models._data
        }

        /**
         * Getter of models
        * @return {ICad.Model.Well.TraceCollection}  Value of models
         */
        get models() : ICad.Model.Well.TraceCollection
        {
            return super.models
        }

        /**
         * Getter of reference
        * @return {number}  Value of reference
         */
        get reference() : number
        {
            return this._reference
        }

        /**
         * Getter of scale
        * @return {number}  Value of scale
         */
        get scale() : number
        {
            return this._scale
        }

        get renderer() : View.Trace.TraceViewInterface
        {
            return this._heatmap as any as View.Trace.TraceViewInterface
        }

        /**
         * Setter of models
        * @param {ICad.Model.Well.TraceCollection} models New value of models
         */
        set models(models : ICad.Model.Well.TraceCollection)
        {
            super.models = models

            var heatmap = this._heatmap as any as View.Trace.HeatmapInterface
            heatmap.min = models.log.display.min
            heatmap.max = models.log.display.max
            heatmap.colorFrom = models.log.display.colors[0]
            heatmap.colorTo = models.log.display.colors[1]

            this.reference = this.reference
            this.scale = this.scale

            models.log.display.on('min.change', e=> {
                heatmap.min = e.data;
                (heatmap as any as View.AbstractView).render();
            })
            models.log.display.on('max.change', e=> {
                heatmap.max = e.data;
                (heatmap as any as View.AbstractView).render();
            })
            models.log.display.on('colors.change', e=> {
                heatmap.colorFrom = e.data[0];
                heatmap.colorTo = e.data[1];
                (heatmap as any as View.AbstractView).render();
            })
        }

        /**
         * Setter of reference
        * @param {number} reference New value of reference
         */
        set reference(reference : number)
        {
            super.reference = reference

            this._heatmap.position.y = (this._models._references[0] - reference) * this._scale * this._heatmap.offsetPosition.height + (this._heatmap.offsetPosition.height / 2)
            this._heatmap.invalidate()
        }

        /**
         * Setter of reference
        * @param {number} reference New value of reference
         */
        set scale(scale : number)
        {
            super.scale = scale

            var dataPerScreen = 1 / window.Math.abs(this._models._references[0] - this._models._references[1])
            var totalOfScreen = this._models._references.length / dataPerScreen

            this._heatmap.position.height = totalOfScreen * this._scale * this._heatmap.offsetPosition.height
            this._heatmap.invalidate()
        }
    }
}
