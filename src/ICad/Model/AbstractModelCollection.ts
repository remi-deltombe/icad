namespace ICad.Model
{
    /**
     * AbstractModel
     * @abstract
     */
    export abstract class AbstractModelCollection<T>
    {
        abstract withUUID(uuid: string) : T
        abstract add(model: T) 
    }
}
