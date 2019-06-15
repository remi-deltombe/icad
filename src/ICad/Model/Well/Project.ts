namespace ICad.Model.Well
{
    /**
     * Project
     */
    export class Project extends ICad.Model.AbstractModel
    {
        /** Name of this project.*/
        _name : string
        
        /** Boreholes contained by this project.
         * key=borehole's uuid, value=borehole.*/
        _boreholes : Map<string, ICad.Model.Well.Borehole> = new Map()
        
        /** Directory  which contain this log.*/
        _directory : ICad.Model.Directory

        /**
         * Getter of name
        * @return {string}  Value of name
         */
        get name() : string
        {
            return this._name
        }
        
        /**
         * Getter of boreholes
        * @return {Map<string, ICad.Model.Well.Borehole>}  Value of boreholes
         */
        get boreholes() : Map<string, ICad.Model.Well.Borehole>
        {
            return this._boreholes
        }
        
        /**
         * Getter of directory
        * @return {ICad.Model.Directory}  Value of directory
         */
        get directory() : ICad.Model.Directory
        {
            return this._directory
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
         * Setter of boreholes
        * @param {Map<string, ICad.Model.Well.Borehole>} boreholes New value of boreholes
         */
        set boreholes(boreholes : Map<string, ICad.Model.Well.Borehole>)
        {
            this._boreholes = boreholes
        }
        
        /**
         * Setter of directory
        * @param {ICad.Model.Directory} directory New value of directory
         */
        set directory(directory : ICad.Model.Directory)
        {
            this._directory = directory
        }
    }
}
