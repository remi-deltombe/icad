namespace ICad.Controller.Container
{
    /**
     * SideBarCtrl
     */
    export class SideBarCtrl extends ICad.Controller.Container.AbstractTabularCtrl
    {
        /** */
        _menu : ICad.View.AbstractView

        /** */
        _open : boolean = false

        /**
         * Stop all this tabular controller except its active one.
         * Start the active controller if needed.
         */
        constructor(app: ICad.Application.AbstractApplication)
        {
            super(app)
            this.tabs.classes = "sidebar-tabs"
            this.content.classes = "sidebar-content"

            this._menu = this.app.viewFactory.list()
            this._menu.classes = 'sidebar-menu'
            this.tabs.addChild(this._menu)
        }


        /**
         * Stop all this tabular controller except its active one.
         * Start the active controller if needed.
         */
        start()
        {
            super.start()
            this.view.addClasses('sidebar')
            this.view.addClasses(this.open ? 'open' : '')
        }

        /**
         * 
        * @param {ICad.Controller.AbstractCtrl} controller 
         */
        addController(controller : ICad.Controller.AbstractCtrl, title?:string|ICad.View.AbstractView)
        {
            super.addController(controller)

            title = title || ''

            var item = this.app.viewFactory.listItem()
            var content = title instanceof ICad.View.AbstractView 
                            ? title as ICad.View.AbstractView
                            : this.app.viewFactory.paragraph(title as string)
            
            item.addChild(content)
            content.on('click', ((c)=>{ 
                if( this.active === c)
                {
                    this.view.toggleClasses('open')
                    if(this.view.hasClass('open'))
                    {
                        c.start();
                    }
                    else
                    {
                        c.stop();
                    }
                }
                else
                {
                    if(this.active) this.active.stop();
                    this.active = c
                }
            }).bind(this, controller))

            this._menu.addChild(item)
        }

        /**
         * 
        * @param {ICad.Controller.AbstractCtrl} controller 
         */
        addAction(action : ICad.Action.Action, title?:string|ICad.View.AbstractView)
        {
            title = title || ''

            var item = this.app.viewFactory.listItem()
            var content = title instanceof ICad.View.AbstractView 
                            ? title as ICad.View.AbstractView
                            : this.app.viewFactory.paragraph(title as string)
            
            item.addChild(content)
            content.on('click', (c)=>{ 
                action.act();
            })

            this._menu.addChild(item)
        }

        /**
         * Getter of active
        * @return {AbstractCtrl}  Value of active
         */
        get active() : AbstractCtrl
        {
            return this._active
        }

        /**
         * Getter of open
        * @return {boolean}  Value of open
         */
        get open() : boolean
        {
            return this._open
        }
        
        /**
         * Setter of open
        * @param {boolean} open New value of open
         */
        set open(open : boolean)
        {
            this._open = open
            if(this.open) 
                this.view.toggleClasses('open')
            else
                this.view.removeClasses('open')
        }

        /**
         * Setter of active
        * @param {AbstractCtrl} active New value of active
         */
        set active(active : AbstractCtrl)
        {
            super.active = active
            if(this.active)
            {
                this.view.addClasses('open')
            }
            else
            {
                this.view.removeClasses('open')
            }
        }
    }
}
