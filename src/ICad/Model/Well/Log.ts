namespace ICad.Model.Well
{
    /**
     * Log
     */
    export class Log extends ICad.Model.AbstractModel
    {
        /** Name of this log.*/
        _name : string

        /** Unit of this log.*/
        _unit : string = ''

        _display : Preference.DisplayPreference = new Preference.DisplayPreference();

        /** Traces contained by this log.
         * key=trace's  uuid, value=trace.*/
        _traces : TraceCollection

        /** Borehole  which contain this log.*/
        _borehole : ICad.Model.Well.Borehole

        /**
         * Getter of name
        * @return {string}  Value of name
         */
        get name() : string
        {
            return this._name
        }

        /**
         * Getter of unit
        * @return {string}  Value of unit
         */
        get unit() : string
        {
            return this._unit
        }

        /**
         * Getter of traces
        * @return {TraceCollection}  Value of traces
         */
        get traces() : TraceCollection
        {
            return this._traces
        }

        /**
         * Getter of borehole
        * @return {ICad.Model.Well.Borehole}  Value of borehole
         */
        get borehole() : ICad.Model.Well.Borehole
        {
            return this._borehole
        }

        /**
         */
        get display() : Preference.DisplayPreference
        {
            return this._display
        }

        /**
         * Setter of name
        * @param {string} name New value of name
         */
        set name(name : string)
        {
            this._name = name
        }

        /**
         * Setter of unit
        * @param {string} unit New value of unit
         */
        set unit(unit : string)
        {
            this._unit = unit
        }

        /**
         * Setter of traces
        * @param {TraceCollection} traces New value of traces
         */
        set traces(traces : TraceCollection)
        {
            this._traces = traces
        }

        /**
         * Setter of borehole
        * @param {ICad.Model.Well.Borehole} borehole New value of borehole
         */
        set borehole(borehole : ICad.Model.Well.Borehole)
        {
            this._borehole = borehole
        }

        /**
         */
        set display(display : Preference.DisplayPreference)
        {
            this._display = display
        }
    }
}
