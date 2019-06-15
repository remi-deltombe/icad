namespace ICad.Controller.Model.Well.Trace
{
    /**
     * AbstractTracesRendererCtrl
     * @abstract
     */
    export abstract class AbstractTracesRendererCtrl extends ICad.Controller.Model.AbstractModelListCtrl<ICad.Model.Well.TraceCollection>
    {
        renderer : View.Trace.TraceViewInterface

        _valid : boolean = false;
        _models : ICad.Model.Well.TraceCollection

        start()
        {
            super.start();
            if(!this._valid)
            {
                this.buildData();
                this._valid = true;
            }
        }


        /**
         * Getter of models
        * @return {ICad.Model.Well.TraceCollection}  Value of models
         */
        get models() : ICad.Model.Well.TraceCollection
        {
            return this._models
        }

        /**
         * Setter of models
        * @param {ICad.Model.Well.TraceCollection} models New value of models
         */
        set models(models : ICad.Model.Well.TraceCollection)
        {
            this._models = models
            this._valid = false;
        }

        abstract buildData() : void;
    }
}
