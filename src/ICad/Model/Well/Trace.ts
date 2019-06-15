namespace ICad.Model.Well
{
    /**
     * Trace
     */
    export class Trace extends ICad.Model.AbstractModel
    {
        /** */
        _collection : TraceCollection

        /** */
        _index : number

        constructor(collection : TraceCollection, index : number)
        {
            super();
            this._collection = collection;
            this._index = index;
        }
        
        /**
         * Getter of reference
        * @return {number}  Value of reference
         */
        get reference() : number
        {
            return this._collection._references[this._index]
        }
        
        /**
         * Getter of data
        * @return {Array<any>}  Value of data
         */
        get data() : Array<any>
        {
            return this._collection._data.line(this._index)
        }
        
        /**
         * Getter of log
        * @return {ICad.Model.Well.Log}  Value of log
         */
        get log() : ICad.Model.Well.Log
        {
            return this._collection._log
        }
        
        /**
         * Setter of reference
        * @param {number} reference New value of reference
         */
        set reference(reference : number)
        {
            this._collection._references[this._index] = reference
        }
        
        /**
         * Setter of data
        * @param {Array<any>} data New value of data
         */
        set data(data : Array<any>)
        {
            this._collection._data.replaceLine(this._index, data)
        }
        
        /**
         * Setter of log
        * @param {ICad.Model.Well.Log} log New value of log
         */
        set log(log : ICad.Model.Well.Log)
        {
            throw 'trace log can\'t be changed'
        }
    }
}
