namespace ICad.Action
{
    /**
     * Call
     */
    export class Call extends ICad.Action.Action
    {
        /** Object which contain the method to call.*/
        _object : any
        
        /** Name of the method to call.*/
        _method : string
        
        /** Arguments to pass to the methods when it is calling.*/
        _args : Array<any>
        
        /**
         * Construct a new Call action.
        * @param {any} object Object which contain the method to call.
        ,* @param {string} method Name of the method to call.
        ,* @param {Array<any>} args? Arguments to pass to the methods when it is calling.
         */
        constructor(object : any, method : string, args? : any)
        {
            super()

            this.object = object
            this.method = method
            this.args = args
        }
        
        /**
         * 
         */
        async act()
        {
            this.object[this.method].apply(this.object, this.args)
        }
        
        /**
         * Getter of object
        * @return {any}  Value of object
         */
        get object() : any
        {
            return this._object
        }
        
        /**
         * Getter of method
        * @return {string}  Value of method
         */
        get method() : string
        {
            return this._method
        }
        
        /**
         * Getter of args
        * @return {Array<any>}  Value of args
         */
        get args() : Array<any>
        {
            return this._args
        }
        
        /**
         * Setter of object
        * @param {any} object New value of object
         */
        set object(object : any)
        {
            this._object = object
        }
        
        /**
         * Setter of method
        * @param {string} method New value of method
         */
        set method(method : string)
        {
            this._method = method
        }
        
        /**
         * Setter of args
        * @param {Array<any>} args New value of args
         */
        set args(args : Array<any>)
        {
            this._args = args
        }
    }
}
