namespace ICad.Model.Preference
{
    export class DisplayPreference extends ICad.Event.EventEmitter
    {
        _min : number = 0;
        _max : number = 10;
        _colors : Math.Color.Color[] = [
            new Math.Color.Color(),
            new Math.Color.Color(255, 255, 255)
        ];

        get min() : number
        {
            return this._min;
        }

        get max() : number
        {
            return this._max;
        }

        get colors() : Math.Color.Color[]
        {
            return this._colors;
        }

        set min(min : number)
        {
            this.trigger('min.change', min);
            this._min = min;
        }

        set max(max : number)
        {
            this.trigger('max.change', max);
            this._max = max;
        }

        set colors(colors : Math.Color.Color[])
        {
            this.trigger('colors.change', colors);
            this._colors = colors;
        }
    }
}
