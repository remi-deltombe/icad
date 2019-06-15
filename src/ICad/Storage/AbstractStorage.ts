namespace ICad.Storage
{
    /**
     * AbstractStorage
     * @abstract
     */
    export abstract class AbstractStorage
    {
        /** Name of this storage.*/
        _name : string
        
        /**
         * 
         * @abstract
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string,ICad.Model.Directory>>}  
         */
        abstract async getDirectories(query : ICad.Storage.Query) : Promise<Map<string,ICad.Model.Directory>>
        
        
        /**
         * 
         * @abstract
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string,ICad.Model.Well.Project>>}  
         */
        abstract async getProjects(query : ICad.Storage.Query) : Promise<Map<string,ICad.Model.Well.Project>>
        
        
        /**
         * 
         * @abstract
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string,ICad.Model.Well.Borehole>>}  
         */
        abstract async getBoreholes(query : ICad.Storage.Query) : Promise<Map<string,ICad.Model.Well.Borehole>>
        
        
        /**
         * 
         * @abstract
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string,ICad.Model.Well.Log>>}  
         */
        abstract async getLogs(query : ICad.Storage.Query) : Promise<Map<string,ICad.Model.Well.Log>>
        
        
        /**
         * 
         * @abstract
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Model.Well.TraceCollection>}  
         */
        abstract async getTraces(query : ICad.Storage.Query) : Promise<Model.Well.TraceCollection>

        /**
         * Getter of name
        * @return {string}  Value of name
         */
        get name() : string
        {
            return this._name
        }
        
        /**
         * Setter of name
        * @param {string} name New value of name
         */
        set name(name : string)
        {
            this._name = name
        }
    }
}
