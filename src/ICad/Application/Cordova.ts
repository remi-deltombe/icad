namespace ICad.Application
{
    /**
     * Cordova
     */
    export class Cordova extends ICad.Application.AbstractApplication
    {
        /**
         * Initialize and start this application.
         * The application instanciate its context and a rootController
         */
        start()
        {
            // Factory instanciation
            this.viewFactory = new View.DOM.Factory()
            this.controllerFactory = new Controller.Factory(this)

            // keyboard
            this.keyboard = new ICad.Util.Keyboard(this)

            // Basic container creation
            this.navigation = this.controllerFactory.instantiate(Controller.Container.SideBarCtrl)
            this.edition    = this.controllerFactory.instantiate(Controller.Container.SideBarCtrl)
            this.documents  = this.controllerFactory.instantiate(Controller.Container.FrameCtrl)
            //this.charts     = this.controllerFactory.instantiate(Controller.Container.FrameCtrl)

            this.container = this.viewFactory.container()
            this.container.classes = "app"

            this.navigation.view = this.viewFactory.container()
            this.navigation.view.classes += " left"

            this.edition.view = this.viewFactory.container()
            this.edition.view.classes += " right"

            this.documents.view = this.viewFactory.container()
            this.documents.view.classes = "app-content"
            //this.charts.view = this.viewFactory.container()

            this.container.addChild(this.navigation.view)
            this.container.addChild(this.edition.view)
            this.container.addChild(this.documents.view)
            //this.container.addChild(this.charts.view)

            this.navigation.start()
            this.edition.start()
            this.documents.start()
            //this.charts.start()

            // Debugger
            this._debug = this.controllerFactory.instantiate(ICad.Controller.Misc.DebugCtrl) as ICad.Controller.Misc.DebugCtrl
            this._debug.view = this._container

            // Storage explorer creation
            var explorer = this.controllerFactory.instantiate(ICad.Controller.Model.StorageExplorerCtrl)
            var icon = this.viewFactory.png() as ICad.View.Image.Png.PngDOM;
            icon.src = "images/icon-storage.png";
            this.navigation.addController(explorer, icon)


            // Log info
            var info = this.controllerFactory.instantiate(ICad.Controller.Model.Well.Log.LogInfoSidebarCtrl)
            var icon = this.viewFactory.png() as ICad.View.Image.Png.PngDOM;
            icon.src = "images/icon-info.png";
            this.edition.addController(info, icon)

            // Log settings
            var settings = this.controllerFactory.instantiate(ICad.Controller.Model.Well.Log.LogSettingsSidebarCtrl)
            var icon = this.viewFactory.png() as ICad.View.Image.Png.PngDOM;
            icon.src = "images/icon-settings.png";
            this.edition.addController(settings, icon)


            // Live stat in edition
            var iconStat = this.viewFactory.png() as ICad.View.Image.Png.PngDOM;
            iconStat.src = "images/icon-stats.png";
            iconStat.addClasses('icon');
            this.edition.addAction(new ICad.Action.Action(()=>{
                iconStat.toggleClasses('icon-active');
                new ICad.Action.ToggleLiveStat(this).act();
            }), iconStat)

            // Debug in edition
            var iconDebug = this.viewFactory.png() as ICad.View.Image.Png.PngDOM;
            iconDebug.src = "images/icon-debug.png";
            iconDebug.addClasses('icon');
            this.edition.addAction(new ICad.Action.Action(()=>{
                iconDebug.addClasses('icon-active');
                this._debug.start()
            }), iconDebug)


            // Render
            var body = this.viewFactory.root()
            body.addChild(this.container)
            body.render()

            window.onresize = function(){
                body.invalidate();
            }

            // Open home
            //var openHome = new ICad.Action.OpenSample(this, "http://10.0.0.211:8080")
            var openHome = new ICad.Action.OpenSample(this, "http://192.168.0.23:8080")
            openHome.run()
        }
    }
}

var _Cordova = ICad.Application.Cordova