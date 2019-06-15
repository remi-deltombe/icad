namespace ICad.View.List
{
    /**
     * ListDOM
     */
    export class ListDOM extends ICad.View.DOM.DOM implements ICad.View.List.ListInterface
    {
        _template: string = '<ul></ul>'
        
        /**
         * 
        * @param {ICad.View.List.ListItemInterface} item 
         */
        addItem(item : ICad.View.List.ListItemInterface)
        {
            return null
        }
    }
}
