namespace ICad.Controller.Model.Well.Reference
{
    /**
     * AbstractReferenceCtrl
     * @abstract
     */
    export class ReferenceRulerDataCtrl extends AbstractCtrl
    {
        _ruler : View.AbstractView
        _reference : number = 0
        _scale : number = 1

        constructor(app : ICad.Application.AbstractApplication)
        {
            super(app)
            this._ruler = this.app.viewFactory.ruler()
            this._ruler.classes = 'data'
        }
        
        start()
        {
            this.view.addChild(this._ruler)
            super.start()
            this.reference = this.reference
            this.scale = this.scale
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

        /**
         * Getter of reference
        * @return {number}  Value of reference
         */
        set reference(reference : number)
        {
            this._reference = reference;
            (this._ruler as any as View.Ruler.RulerInterface).reference = reference;
            (this._ruler as any as View.Ruler.RulerInterface).increment = (1/ this.scale) /10;
            (this._ruler as any as View.Ruler.RulerInterface).spacing = this._ruler.offsetPosition.height / 10;
            this._ruler.invalidate()
        }

        /**
         * Getter of reference
        * @return {number}  Value of reference
         */
        set scale(scale : number)
        {
            this._scale = scale
            this.reference = this.reference
        }
    }
}
