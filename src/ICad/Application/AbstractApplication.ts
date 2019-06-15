namespace ICad.Application
{
    /**
     * AbstractApplication
     * @abstract
     */
    export abstract class AbstractApplication
    {
        /** */
        _container : ICad.View.AbstractView
        
        /** Main content of this application.*/
        _documents : ICad.Controller.Container.FrameCtrl
        
        /** */
        _charts : ICad.Controller.Container.FrameCtrl
        
        /** Menu container used to navigate in this application.*/
        _navigation : ICad.Controller.Container.SideBarCtrl
        
        /** */
        _edition : ICad.Controller.Container.SideBarCtrl
        
        /** */
        _viewFactory : ICad.View.AbstractFactory
        
        /** */
        _controllerFactory : ICad.Controller.Factory

        /** */
        _debug : ICad.Controller.Misc.DebugCtrl

        /** */
        _keyboard : ICad.Util.Keyboard

        _config : ICad.Collection.MapListenable<string, any> = new ICad.Collection.MapListenable();

        /**
         * Initialize and start this application.
         * The application instanciate its context and a rootController
         * @abstract
         */
        abstract start()

        /**
         * Getter of container
        * @return {ICad.View.AbstractView}  Value of container
         */
        get container() : ICad.View.AbstractView
        {
            return this._container
        }
        
        /**
         * Getter of documents
        * @return {ICad.Controller.Container.FrameCtrl}  Value of documents
         */
        get documents() : ICad.Controller.Container.FrameCtrl
        {
            return this._documents
        }
        
        /**
         * Getter of charts
        * @return {ICad.Controller.Container.FrameCtrl}  Value of charts
         */
        get charts() : ICad.Controller.Container.FrameCtrl
        {
            return this._charts
        }
        
        /**
         * Getter of navigation
        * @return {ICad.Controller.Container.SideBarCtrl}  Value of navigation
         */
        get navigation() : ICad.Controller.Container.SideBarCtrl
        {
            return this._navigation
        }
        
        /**
         * Getter of edition
        * @return {ICad.Controller.Container.SideBarCtrl}  Value of edition
         */
        get edition() : ICad.Controller.Container.SideBarCtrl
        {
            return this._edition
        }
        
        /**
         * Getter of viewFactory
        * @return {ICad.View.AbstractFactory}  Value of viewFactory
         */
        get viewFactory() : ICad.View.AbstractFactory
        {
            return this._viewFactory
        }
        
        /**
         * Getter of controllerFactory
        * @return {ICad.Controller.Factory}  Value of controllerFactory
         */
        get controllerFactory() : ICad.Controller.Factory
        {
            return this._controllerFactory
        }
        
        /**
         * Getter of keyboard
        * @return {ICad.Util.Keyboard}  Value of keyboard
         */
        get keyboard() : ICad.Util.Keyboard
        {
            return this._keyboard
        }

        /**
         */
        get config() : ICad.Collection.MapListenable<string, any>
        {
            return this._config
        }

        /**
         * Setter of container
        * @param {ICad.View.AbstractView} container New value of container
         */
        set container(container : ICad.View.AbstractView)
        {
            this._container = container
        }
        
        /**
         * Setter of documents
        * @param {ICad.Controller.Container.FrameCtrl} documents New value of documents
         */
        set documents(documents : ICad.Controller.Container.FrameCtrl)
        {
            this._documents = documents
        }
        
        /**
         * Setter of charts
        * @param {ICad.Controller.Container.FrameCtrl} charts New value of charts
         */
        set charts(charts : ICad.Controller.Container.FrameCtrl)
        {
            this._charts = charts
        }
        
        /**
         * Setter of navigation
        * @param {ICad.Controller.Container.SideBarCtrl} navigation New value of navigation
         */
        set navigation(navigation : ICad.Controller.Container.SideBarCtrl)
        {
            this._navigation = navigation
        }
        
        /**
         * Setter of edition
        * @param {ICad.Controller.Container.SideBarCtrl} edition New value of edition
         */
        set edition(edition : ICad.Controller.Container.SideBarCtrl)
        {
            this._edition = edition
        }
        
        /**
         * Setter of viewFactory
        * @param {ICad.View.AbstractFactory} viewFactory New value of viewFactory
         */
        set viewFactory(viewFactory : ICad.View.AbstractFactory)
        {
            this._viewFactory = viewFactory
        }
        
        /**
         * Setter of controllerFactory
        * @param {ICad.Controller.Factory} controllerFactory New value of controllerFactory
         */
        set controllerFactory(controllerFactory : ICad.Controller.Factory)
        {
            this._controllerFactory = controllerFactory
        }
        
        /**
         * Setter of keyboard
        * @param {ICad.Util.Keyboard} keyboard New value of keyboard
         */
        set keyboard(keyboard : ICad.Util.Keyboard)
        {
            this._keyboard = keyboard
        }
    }
}
