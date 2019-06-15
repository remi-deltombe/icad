namespace ICad.Action
{
    /**
     * OpenSample
     */
    export class OpenSample extends ICad.Action.ActionAppWorkflow
    {
        _url : string = "http://localhost:8080";

        constructor(app, url?)
        {
            super(app);
            this._url = url ? url : this._url
        }

        /**
         * 
         */
        async act()
        {
            var explorer = this.app.navigation.controllers.find(v=>v instanceof ICad.Controller.Model.StorageExplorerCtrl) as ICad.Controller.Model.StorageExplorerCtrl
            var storage = explorer.storages.find(v=>v instanceof ICad.Storage.FakeStorage)
            
            if(!storage)
            {
                storage = new ICad.Storage.StoreJS.Rest(this._url)
                //explorer.addStorage(new ICad.Storage.FakeStorage(1))
                explorer.addStorage(storage)
                //explorer.addStorage(new ICad.Storage.FakeStorage(1))
            }
        }
    }
}
