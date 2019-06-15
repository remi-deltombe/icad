namespace ICad.Controller.Model
{
    /**
     * AbstractModelDetailCtrl
     * @abstract
     */
    export abstract class AbstractModelDetailCtrl extends ICad.Controller.Model.AbstractModelCtrl
    {
        /** Model used by this controller.*/
        _model : ICad.Model.AbstractModel
        
        /**
         * Getter of model
        * @return {ICad.Model.AbstractModel}  Value of model
         */
        get model() : ICad.Model.AbstractModel
        {
            return this._model
        }
        
        /**
         * Setter of model
        * @param {ICad.Model.AbstractModel} model New value of model
         */
        set model(model : ICad.Model.AbstractModel)
        {
            this._model = model
        }
    }
}
