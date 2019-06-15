namespace ICad.View.Form
{
    export class FormDOM extends View.DOM.DOMEmitter implements FormInterface
    {
        _template: string = '<form></form>';

        submit()
        {
            this.trigger('submit');
        }
    }
}
