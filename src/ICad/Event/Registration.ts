namespace ICad.Event
{
    /**
     * Registration
     */
    export class Registration
    {
        /** Function to call when the event is triggered.*/
        _callback : Function
        
        /**
         * Getter of callback
        * @return {Function}  Value of callback
         */
        get callback() : Function
        {
            return this._callback
        }
        
        /**
         * Setter of callback
        * @param {Function} callback New value of callback
         */
        set callback(callback : Function)
        {
            this._callback = callback
        }
    }
}
