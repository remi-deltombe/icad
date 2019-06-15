namespace ICad.Storage
{
    /**
     * Query
     */
    export class Query
    {
        /** */
        _fields : Array<string> = []
        
        /** */
        _filter : any = {}
        
        /** */
        _sort : string = ''
        
        /** */
        _limit : any = {}
        
        /** */
        _parent : ICad.Model.AbstractModel

        /**
         * Getter of fields
        * @return {Array<string>}  Value of fields
         */
        get fields() : Array<string>
        {
            return this._fields
        }
        
        /**
         * Getter of filter
        * @return {any}  Value of filter
         */
        get filter() : any
        {
            return this._filter
        }
        
        /**
         * Getter of sort
        * @return {string}  Value of sort
         */
        get sort() : string
        {
            return this._sort
        }
        
        /**
         * Getter of limit
        * @return {any}  Value of limit
         */
        get limit() : any
        {
            return this._limit
        }
        
        /**
         * Getter of parent
        * @return {ICad.Model.AbstractModel}  Value of parent
         */
        get parent() : ICad.Model.AbstractModel
        {
            return this._parent
        }
        
        /**
         * Setter of fields
        * @param {Array<string>} fields New value of fields
         */
        set fields(fields : Array<string>)
        {
            this._fields = fields
        }
        
        /**
         * Setter of filter
        * @param {any} filter New value of filter
         */
        set filter(filter : any)
        {
            this._filter = filter
        }
        
        /**
         * Setter of sort
        * @param {string} sort New value of sort
         */
        set sort(sort : string)
        {
            this._sort = sort
        }
        
        /**
         * Setter of limit
        * @param {any} limit New value of limit
         */
        set limit(limit : any)
        {
            this._limit = limit
        }
        
        /**
         * Setter of parent
        * @param {ICad.Model.AbstractModel} parent New value of parent
         */
        set parent(parent : ICad.Model.AbstractModel)
        {
            this._parent = parent
        }
    }
}
