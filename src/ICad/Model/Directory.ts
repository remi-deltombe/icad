namespace ICad.Model
{
    /**
     * Directory
     */
    export class Directory extends ICad.Model.AbstractModel
    {
        /** Name of this directory.*/
        _name : string
        
        /** Projects contained by this directory.
         * key=borehole's uuid, value=borehole.*/
        _projects : Map<string, ICad.Model.Well.Project>
        
        /**
         * Getter of name
        * @return {string}  Value of name
         */
        get name() : string
        {
            return this._name
        }
        
        /**
         * Getter of projects
        * @return {Map<string, ICad.Model.Well.Project>}  Value of projects
         */
        get projects() : Map<string, ICad.Model.Well.Project>
        {
            return this._projects
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
         * Setter of projects
        * @param {Map<string, ICad.Model.Well.Project>} projects New value of projects
         */
        set projects(projects : Map<string, ICad.Model.Well.Project>)
        {
            this._projects = projects
        }
    }
}
