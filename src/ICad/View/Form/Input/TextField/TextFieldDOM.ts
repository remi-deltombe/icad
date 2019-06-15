namespace ICad.View.Form.Input.TextField
{
    export class TextFieldDOM extends View.DOM.DOMEmitter implements TextFieldInterface
    {
        _title   : string;
        _name    : string;
        _value   : string;
        _pattern : string;

        _input   : HTMLInputElement

        _focus : boolean = false

        constructor()
        {
            super()
            this.updateTemplate()
        }

        update()
        {
            super.update();
            
            if(this.dom)
            {
                // Retreive dom element and register events
                var inputs = this.dom.getElementsByTagName('input');
                if(inputs.length)
                {
                    this._input = inputs[0]
                    this._input.value = this._value
                    this._input.onkeyup = e => { this.value = (e.srcElement as HTMLInputElement).value; }
                    this._input.onfocus = e => {
                        this.trigger('focus-in', this._value);
                        this._focus = true;
                    }
                    this._input.onblur  = e => {
                        this.trigger('focus-out', this._value);
                        this._focus = false;
                    }
                }
            }
        }
        
        updateTemplate()
        {
            this.template = `
            <div>
                <div class="input input-text">
                    `+(this._title ? `<div class="input-label">${this._title}</div>` : '')+`
                    <div class="input-field"> 
                        <input name="${this._name}" value="${this._value}">
                    </div>
                </div>
            </div>`
        }

        focus()
        {
            this._input.focus();
        }

        get title() : string
        {
            return this._title;
        }

        get name() : string
        {
            return this._name;
        }

        get value() : string
        {
            return this._value;
        }

        get pattern() : string
        {
            return this._pattern;
        }

        set title(title : string)
        {
            this._title = title;
            this.updateTemplate();
            this.invalidate();
        }

        set name(name : string)
        {
            this._name = name;
            this.updateTemplate();
            this.invalidate();
        }

        set value(value : string)
        {

            this._value = value;
            this.trigger('change', this._value);
            if(this._input && !this._focus)
            {
                this._input.value = value;
            }
        }

        set pattern(pattern : string)
        {
            this._pattern = pattern;
        }
    }
}
