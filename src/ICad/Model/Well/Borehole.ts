namespace ICad.Model.Well
{
    /**
     * Borehole
     */
    export class Borehole extends ICad.Model.AbstractModel
    {
        /** Name of this borehole.*/
        _name : string
        
        /** Logs contained by this borehole.
         * key=log's uuid, value=log.*/
        _logs : Map<string, ICad.Model.Well.Log> = new Map()
        
        /** Project which contain this borehole*/
        _project : ICad.Model.Well.Project
        
        /**
         * Getter of name
        * @return {string}  Value of name
         */
        get name() : string
        {
            return this._name
        }
        
        /**
         * Getter of logs
        * @return {Map<string, ICad.Model.Well.Log>}  Value of logs
         */
        get logs() : Map<string, ICad.Model.Well.Log>
        {
            return this._logs
        }
        
        /**
         * Getter of project
        * @return {ICad.Model.Well.Project}  Value of project
         */
        get project() : ICad.Model.Well.Project
        {
            return this._project
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
         * Setter of logs
        * @param {Map<string, ICad.Model.Well.Log>} logs New value of logs
         */
        set logs(logs : Map<string, ICad.Model.Well.Log>)
        {
            this._logs = logs
        }
        
        /**
         * Setter of project
        * @param {ICad.Model.Well.Project} project New value of project
         */
        set project(project : ICad.Model.Well.Project)
        {
            this._project = project
        }
    }
}
