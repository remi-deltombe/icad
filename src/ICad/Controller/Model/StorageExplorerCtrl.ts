namespace ICad.Controller.Model
{
    /**
     * StorageExplorerCtrl
     */
    export class StorageExplorerCtrl extends ICad.Controller.Model.AbstractModelCtrl
    {
        /**/
        _title : ICad.View.AbstractView

        /**/
        _list : ICad.View.AbstractView

        /** Storage used to pull model data.*/
        _storages : Array<ICad.Storage.AbstractStorage> = []

        constructor(app : ICad.Application.AbstractApplication)
        {
            super(app)

            this._title = this.app.viewFactory.title("Storages", 6)
            this._title.classes = "sidebar-title"

            this._list = this.app.viewFactory.list()
            this._list.classes = "storage-list"
        }

        /**
         *
         */
        start()
        {
            super.start()
            this.view.addChild(this._title)
            this.view.addChild(this._list)
        }

        /**
         *
         */
        addStorage(storage: ICad.Storage.AbstractStorage)
        {
            this.storages.push(storage)

            var listItem = this.buildListItemWithStatus(storage.name, 'storage',this.loadStorage.bind(this, storage))
            this._list.addChild(listItem)
            //this.loadStorage(storage, listItem)
        }

        private async loadStorage(storage: ICad.Storage.AbstractStorage, view: ICad.View.AbstractView)
        {
            var query = new ICad.Storage.Query()
            var projects = await storage.getProjects(query)
            var list = this.app.viewFactory.list()
            var that = this
            
            view.removeChildren();

            await projects.forEach(async project=>{
                var listItem = this.buildListItemWithStatus(project.name, 'project', this.loadProject.bind(this, storage, project))
                list.addChild(listItem);
            })

            view.addChild(list)
        }

        private async loadProject(storage: ICad.Storage.AbstractStorage, project: ICad.Model.Well.Project, view: ICad.View.AbstractView)
        {
            var query = new ICad.Storage.Query()
            query.parent = project;
            var boreholes = await storage.getBoreholes(query)
            var list = this.app.viewFactory.list()
            var that = this

            view.removeChildren();

            await boreholes.forEach(async borehole=>{
                var listItem = this.buildListItemWithStatus(borehole.name, 'borehole', this.loadBorehole.bind(this, storage, borehole))
                list.addChild(listItem);
            })

            view.addChild(list)
        }

        private async loadBorehole(storage: ICad.Storage.AbstractStorage, borehole: ICad.Model.Well.Borehole, view: ICad.View.AbstractView)
        {
            var query = new ICad.Storage.Query()
            query.parent = borehole;
            var logs = await storage.getLogs(query)
            var list = this.app.viewFactory.list()
            var that = this

            view.removeChildren();

            logs.forEach(log=>{
                var listItem = this.buildListItem(log.name, 'log')
                list.addChild(listItem)

                var openProject = new ICad.Action.OpenProject(this.app, log.borehole.project)
                var loadProject = new ICad.Action.LoadProject(this.app, storage, log.borehole.project)
                loadProject.next = openProject;
                
                listItem.children[0].on('click', loadProject.run.bind(loadProject))
            })

            view.addChild(list)
        }

        private buildListItem(name: string, type:string) : ICad.View.AbstractView
        {
            var listItem = this.app.viewFactory.listItem()
            var title = this.app.viewFactory.container()
            var text = this.app.viewFactory.title(name, 6)
            title.classes = type + ' open'
            title.addChild(text)
            listItem.addChild(title)
            return listItem
        }

        private buildListItemWithStatus(name: string, type:string, loader: Function) : ICad.View.AbstractView
        {
            var listItem = this.app.viewFactory.listItem()
            var title = this.app.viewFactory.container()
            var icon = this.app.viewFactory.container()
            var text = this.app.viewFactory.title(name, 6)
            var children = this.app.viewFactory.container();
            icon.classes = 'status'
            title.classes = type + ' close'
            title.addChild(icon)
            title.addChild(text)
            listItem.addChild(title)
            listItem.addChild(children)
            

            var clickHandler = async function(loader, title, listItem){
                if(title.hasClass('close'))
                {
                    await loader(children);
                    title.toggleClasses('open close')
                }
                else
                {
                    title.toggleClasses('open close')
                }
            }

            icon.on('click',clickHandler.bind(null, loader, title, listItem))
            return listItem
        }

        /**
         * Getter of list
        * @return {Array<ICad.View.AbstractView}  Value of list
         */
        get storages() : Array<ICad.Storage.AbstractStorage>
        {
            return this._storages
        }
        
        /**
         * Setter of storages
        * @param {Array<ICad.Storage.AbstractStorage>} storages New value of storages
         */
        set storages(storages : Array<ICad.Storage.AbstractStorage>)
        {
            this._storages = storages
        }
    }
}
