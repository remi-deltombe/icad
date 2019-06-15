namespace ICad.Controller.Model.Well.Trace
{
    /**
     * AbstractTracesRendererCtrl
     * @abstract
     */
    export abstract class TracesLineDataFirstDataCtrl extends AbstractTracesLineDataCtrl
    {
        _content : ICad.View.AbstractView

        constructor(app: ICad.Application.AbstractApplication)
        {
            super(app);
            this._content = this.app.viewFactory.paragraph('');
            this._content.addClasses('project-borehole-line-data-firstdata')
            this._container.addChild(this._content);
        }

        update()
        {
            super.update();
            if(this.model)
                (this._content as any as ICad.View.Text.ParagraphInterface).text = ICad.Util.Text.formatNumber((this.model as ICad.Model.Well.Trace).data[0], 3);
            else
                (this._content as any as ICad.View.Text.ParagraphInterface).text = '';
        }
    }
}
