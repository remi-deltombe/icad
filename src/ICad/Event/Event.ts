namespace ICad.Event
{
    /**
     * Event
     */
    export class Event
    {
        /** Data related to this event.*/
        _data : any
        
        /** EventEmitter which trigger the event.*/
        _emitter : ICad.Event.EventEmitter
        
        /**
         * Getter of data
        * @return {any}  Value of data
         */
        get data() : any
        {
            return this._data
        }
        
        /**
         * Getter of emitter
        * @return {ICad.Event.EventEmitter}  Value of emitter
         */
        get emitter() : ICad.Event.EventEmitter
        {
            return this._emitter
        }
        
        /**
         * Setter of data
        * @param {any} data New value of data
         */
        set data(data : any)
        {
            this._data = data
        }
        
        /**
         * Setter of emitter
        * @param {ICad.Event.EventEmitter} emitter New value of emitter
         */
        set emitter(emitter : ICad.Event.EventEmitter)
        {
            this._emitter = emitter
        }
    }
}
