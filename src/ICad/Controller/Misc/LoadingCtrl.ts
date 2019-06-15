namespace ICad.Controller.Misc
{
    /**
     * LoadingCtrl
     */
    export class LoadingCtrl extends ICad.Controller.AbstractCtrl
    {
        _loading : ICad.View.AbstractView;

        /**
         * Fill and render the view depending of this controller.
         */
        start()
        {
            if(this.started) return

            this._loading = this._app.viewFactory.container();
            this._loading.classes += 'app-loading';

            this.view.addChild(this._loading)
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
