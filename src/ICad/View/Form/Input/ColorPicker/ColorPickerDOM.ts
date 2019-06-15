namespace ICad.View.Form.Input.ColorPicker
{
    export class ColorPickerDOM extends View.DOM.DOMEmitter implements ColorPickerInterface
    {
        _title   : string;
        _name    : string;
        _value   : Math.Color.Color;
        _colors : Math.Color.Color[];

        _input : HTMLInputElement;
        _preview : HTMLElement;

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
                    this._input.value = this._value.toString();
                    this._input.onkeyup = e => {
                        var color = new Math.Color.Color();
                        color.fromString((e.srcElement as HTMLInputElement).value);
                        this.value = color;
                    }
                    this._input.onfocus = e => {
                        this.trigger('focus-in', this._value);
                        this._focus = true;
                    }
                    this._input.onblur  = e => {
                        console.log('test')
                        this.trigger('focus-out', this._value);
                        this._focus = false;
                    }
                }

                var divs = this.dom.getElementsByClassName('input-preview');
                if(divs.length)
                {
                    this._preview = divs[0] as HTMLElement
                    this._preview.style.background = this._value.toString();
                }
            }
        }
        
        updateTemplate()
        {
            if(this.value)
                var color = this.value.toString();
            else
                var color = '';

            this.template = `
            <div>
                <div class="input input-color">
                    <div class="input-label">${this._title}</div>
                    <div class="input-field"> 
                        <input name="${this._name}" value="${color}">
                        <div class="input-preview" style="background:${color}">
                    </div>
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

        get value() : Math.Color.Color
        {
            return this._value;
        }
        
        get colors() : Math.Color.Color[]
        {
            return this._colors;
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

        set value(value : Math.Color.Color)
        {
            this._value = value;
            this.trigger('change', this._value);
            if(this._input && !this._focus)
            {
                this._input.value = this._value.toString();
            }
            if(this._preview)
            {
                this._preview.style.background = this._value.toString();
            }
        }

        set colors(colors : Math.Color.Color[])
        {
            this._colors = colors;
            this.updateTemplate();
            this.invalidate();
        }
    }
}
