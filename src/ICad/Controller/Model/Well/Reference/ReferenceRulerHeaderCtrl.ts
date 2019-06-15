namespace ICad.Controller.Model.Well.Reference
{
    /**
     * AbstractReferenceCtrl
     * @abstract
     */
    export class ReferenceRulerHeaderCtrl extends AbstractCtrl
    {
        _unit : string = 'm'

        _content : View.AbstractView
        _title : View.AbstractView

        constructor(app : ICad.Application.AbstractApplication)
        {
            super(app)
            this._content = this.app.viewFactory.container()
            this._content.addClasses('project-borehole-header-log')
            this._title = this.app.viewFactory.paragraph(this.unit)
            this._title.addClasses('title')
            this._content.addChild(this._title)
        }

        start()
        {
            this.view.addChild(this._content)
            super.start()
        }

        get unit() : string
        {
            return this._unit
        }

        set unit(unit : string)
        {
            this._unit = unit;
            (this._title as any as View.Text.TextInterface).text = unit
        }

    }
}
