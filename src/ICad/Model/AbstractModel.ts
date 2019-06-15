namespace ICad.Model
{
    /**
     * AbstractModel
     * @abstract
     */
    export abstract class AbstractModel
    {
        /** Identifier of the model.
         * Each identifers are unique across all kinds of model.*/
        _uuid : string

        constructor()
        {
            this.uuid = ICad.Util.Unicity.uuid();
        }
        
        /**
         * Getter of uuid
        * @return {string}  Value of uuid
         */
        get uuid() : string
        {
            return this._uuid
        }
        
        /**
         * Setter of uuid
        * @param {string} uuid New value of uuid
         */
        set uuid(uuid : string)
        {
            this._uuid = uuid
        }
    }
}
