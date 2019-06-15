namespace ICad.Controller.Model
{
    /**
     * AbstractModelListCtrl
     * @abstract
     */
    export abstract class AbstractModelListCtrl<T> extends ICad.Controller.Model.AbstractModelCtrl
    {
        abstract get models() : T;
        abstract set models(models : T);

    }
}
