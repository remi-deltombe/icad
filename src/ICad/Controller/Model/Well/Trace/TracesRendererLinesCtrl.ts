namespace ICad.Controller.Model.Well.Trace
{
    /**
     * TracesRendererBitmapCtrl
     */
    export class TracesRendererLinesCtrl extends ICad.Controller.Model.Well.Trace.AbstractTracesRendererCtrl
    {
        _lines : View.AbstractView

        constructor(app : Application.AbstractApplication)
        {
            super(app)
            this._lines = this.app.viewFactory.traceLines()
            this._lines.classes = 'data'
        }

        start()
        {
            if(this.started) return;
            this.view.addChild(this._lines)
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
            var lines = this._lines as any as View.Trace.LinesInterface
            lines.values = this.models._data
        }

        /**
         * Getter of models
        * @return {ICad.Model.Well.TraceCollection}  Value of models
         */
        get models() : ICad.Model.Well.TraceCollection
        {
            return this._models
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
            return this._lines as any as View.Trace.TraceViewInterface
        }

        /**
         * Setter of models
        * @param {ICad.Model.Well.TraceCollection} models New value of models
         */
        set models(models : ICad.Model.Well.TraceCollection)
        {
            super.models = models

            var lines = this._lines as any as View.Trace.LinesInterface
            lines.min = models.log.display.min
            lines.max = models.log.display.max
            lines.color = models.log.display.colors[0]
            
            this.reference = this.reference
            this.scale = this.scale

            models.log.display.on('min.change', e=> {
                lines.min = e.data;
                (lines as any as View.AbstractView).render();
            })
            models.log.display.on('max.change', e=> {
                lines.max = e.data;
                (lines as any as View.AbstractView).render();
            })
            models.log.display.on('colors.change', e=> {
                lines.color = e.data[0];
                (lines as any as View.AbstractView).render();
            })
        }

        /**
         * Setter of reference
        * @param {number} reference New value of reference
         */
        set reference(reference : number)
        {
            super.reference = reference

            this._lines.position.y = (this._models._references[0] - reference) * this._scale * this._lines.offsetPosition.height + (this._lines.offsetPosition.height / 2)
            this._lines.invalidate()
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

            this._lines.position.height = totalOfScreen * this._scale * this._lines.offsetPosition.height
            this._lines.invalidate()
        }
    }
}
