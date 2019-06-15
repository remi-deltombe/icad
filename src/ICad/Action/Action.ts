namespace ICad.Action
{
    /**
     * Action
     */
    export class Action
    {
        /** Function to run by this action.*/
        _callback : Function

        /** Action to execute after this one.*/
        _next : Action
        
        /**
         * Construct a new action.
        * @param {Function} callback? Function to call when this action is running.
         */
        constructor(callback? : Function)
        {
            this.callback = callback || function(){}
            this.next = null;
        }
        
        /**
         * Run the function of this action.
         */
        async run()
        {
            var result = await this.act();
            if(this.next)
            {
                this.next.run()
            }
        }

        async act()
        {
            return this.callback()
        }
        
        /**
         * Getter of callback
        * @return {Function}  Value of callback
         */
        get callback() : Function
        {
            return this._callback
        }
        
        /**
         * Getter of next
        * @return {Action}  Value of next
         */
        get next() : Action
        {
            return this._next
        }
        
        /**
         * Setter of callback
        * @param {Function} callback New value of callback
         */
        set callback(callback : Function)
        {
            this._callback = callback
        }
        
        /**
         * Setter of next
        * @param {Action} next New value of next
         */
        set next(next : Action)
        {
            this._next = next
        }
    }
}
