namespace ICad.Controller.Misc
{
    /**
     * HomeCtrl
     */
    export class HomeCtrl extends ICad.Controller.AbstractCtrl
    {
        /**
         * Fill and render the view depending of this controller.
         */
        start()
        {
            if(this.started) return

            /*
            var button = this.app.viewFactory.button('Open storage')
            this.view.addChild(button)

            var button = this.app.viewFactory.button('Quick tour')
            button.on('click', alert.bind(null, '2'))
            this.view.addChild(button)
            */

            var action = new ICad.Action.OpenSample(this.app)
            var button = this.app.viewFactory.button('Open sample data')
            button.on('click', action.run.bind(action))
            this.view.addChild(button)
            super.start()
        }

        /**
         * Fill and render the view depending of this controller.
         */
        stop()
        {
            super.stop()
            this.view.removeChildren()
        }
    }
}
