namespace ICad.Controller.Model.Well.Trace
{
    /**
     * TracesRendererBitmapCtrl
     */
    export class TracesRendererImageCtrl extends ICad.Controller.Model.Well.Trace.AbstractTracesRendererCtrl
    {
        _image : View.AbstractView

        constructor(app : Application.AbstractApplication)
        {
            super(app)
            this._image = this.app.viewFactory.traceImage()
            this._image.classes = 'data'
        }

        start()
        {
            if(this.started) return;
            this.view.addChild(this._image)
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
            var image = this._image as any as View.Trace.ImageInterface
            image.values = this.models._data
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
            return this._image as any as View.Trace.TraceViewInterface
        }

        /**
         * Setter of models
        * @param {ICad.Model.Well.TraceCollection} models New value of models
         */
        set models(models : ICad.Model.Well.TraceCollection)
        {
            super.models = models

            var image = this._image as any as View.Trace.ImageInterface
            this.reference = this.reference
            this.scale = this.scale

        }

        /**
         * Setter of reference
        * @param {number} reference New value of reference
         */
        set reference(reference : number)
        {
            super.reference = reference

            this._image.position.y = (this._models._references[0] - reference) * this._scale * this._image.offsetPosition.height + (this._image.offsetPosition.height / 2)
            this._image.invalidate()
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

            this._image.position.height = totalOfScreen * this._scale * this._image.offsetPosition.height
            this._image.invalidate()
        }
    }
}
