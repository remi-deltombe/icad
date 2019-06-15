namespace ICad.Action
{
    /**
     * LoadLog
     */
    export class LoadLog extends ICad.Action.ActionAppWorkflow
    {
        /** */
        _storage : ICad.Storage.AbstractStorage

        /** */
        _log : ICad.Model.Well.Log
        
        /**
         * Construct a new LoadLog action.
        * @param {ICad.Application.AbstractApplication} app App used to construct controllers.
        ,* @param {ICad.Model.Well.Log} log Log to open.
         */
        constructor(app : ICad.Application.AbstractApplication, storage : ICad.Storage.AbstractStorage, log : ICad.Model.Well.Log)
        {
            super(app)
            this.log = log
            this.storage = storage
        }
        
        /**
         * 
         */
        async act()
        {
            var query = new ICad.Storage.Query();
            query.parent = this.log;
            var traces = await this.storage.getTraces(query);
            return traces
        }
        
        /**
         * Getter of log
        * @return {ICad.Model.Well.Log}  Value of log
         */
        get log() : ICad.Model.Well.Log
        {
            return this._log
        }
        
        /**
         * Getter of storage
        * @return {ICad.Storage.AbstractStorage}  Value of storage
         */
        get storage() : ICad.Storage.AbstractStorage
        {
            return this._storage
        }
        
        /**
         * Setter of log
        * @param {ICad.Model.Well.Log} log New value of log
         */
        set log(log : ICad.Model.Well.Log)
        {
            this._log = log
        }
        
        /**
         * Setter of storage
        * @param {ICad.Storage.AbstractStorage} storage New value of storage
         */
        set storage(storage : ICad.Storage.AbstractStorage)
        {
            this._storage = storage
        }
    }
}
