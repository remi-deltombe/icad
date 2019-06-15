namespace ICad.Controller.Model
{
    /**
     * AbstractModelCtrl
     * @abstract
     */
    export abstract class AbstractModelCtrl extends ICad.Controller.AbstractCompositeCtrl
    {
        /** */
        _reference : number = 0

        /** */
        _scale : number = 1

        protected createModelController(model: ICad.Model.AbstractModel, controller: any) : ICad.Controller.Model.AbstractModelDetailCtrl
        {
            var result = this.createController(controller) as ICad.Controller.Model.AbstractModelDetailCtrl
            result.model = model
            return result
        }
        
        /**
         *
         */
        get reference() : number
        {
            return this._reference
        }

        /**
         *
         */
        get scale() : number
        {
            return this._scale
        }

        /**
         *
         */
        set scale(scale : number)
        {
            var diff = this._scale - scale
            this._scale = scale
            for(var i=0; i<this._controllers.length; ++i)
            {
                var a = this._controllers[i] as any
                if(a.scale != 'undefined')
                {
                    a.scale -= diff
                }
            }
        }

        /**
         *
         */
        set reference(reference : number)
        {
            var diff = this._reference - reference
            this._reference = reference
            for(var i=0; i<this._controllers.length; ++i)
            {
                var a = this._controllers[i] as any
                if(a.reference != 'undefined')
                {
                    a.reference -= diff
                }
            }
        }
    }
}
