declare var SPECTOR : any;

namespace ICad.Controller.Misc
{
    /**
     * DebugCtrl
     */
    export class DebugCtrl extends ICad.Controller.AbstractCtrl
    {
        _content : View.AbstractView
        _fps : View.AbstractView
        //_mem : View.AbstractView
        _rendering : View.AbstractView
        _specter : View.AbstractView

        _render : boolean = false
        _lastLoop : Date
        _lastRender : Date

        constructor(app: Application.AbstractApplication)
        {
            super(app)
            this._content = this.app.viewFactory.container()
            this._content.classes = 'debug'
            this._fps = this.app.viewFactory.paragraph('')
            this._content.addChild(this._fps)
            /*this._mem = this.app.viewFactory.paragraph('')
            this._content.addChild(this._mem)
            */
            this._rendering = this.app.viewFactory.button('Enable render')
            this._content.addChild(this._rendering)

            this._specter = this.app.viewFactory.button('Run specter')
            this._content.addChild(this._specter)

            var that = this
            this._specter.on('click', function(){
                const s = new SPECTOR.Spector();
                s.displayUI();
                that._content.removeChild(that._specter)
            })

            this._rendering.on('click', function(){
                if(that._render)
                {
                    (that._rendering as any).text = 'Enable render'
                }
                else
                {
                    (that._rendering as any).text = 'Disable render'
                }
                that._render = !that._render
            })

            var root = this._app.viewFactory.root()
            this.app.keyboard.on('keydown', e=>{
                if(this.app.keyboard.isDown('ctrl') && this.app.keyboard.isDown('d'))
                {
                    this._content.visible = !this._content.visible
                    this._content.render();
                }
            })
        }

        /**
         * Fill and render the view depending of this controller.
         */
        start()
        {
            if(this.started) return;

            this._view.addChild(this._content)
            super.start()
            this._lastLoop = new Date()
            this._lastRender = new Date()
            this.loop()
        }

        stop()
        {
            this.started = false;
            this._view.visible = false;
        }

        /**
         *
         */
        loop()
        {
            var date = new Date();
            var fps = window.Math.round(1000 / (date.getTime() - this._lastLoop.getTime()));
            this._lastLoop = date;
            if((this._lastLoop.getTime() - this._lastRender.getTime()) > 250)
            {
                //var memory = (window.performance as any).memory
                //var percent =  window.Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 10000) / 100;

                (this._fps as any as ICad.View.Text.ParagraphInterface).text = 'FPS : ' + fps;
                //(this._mem as any as ICad.View.Text.ParagraphInterface).text = 'MEM : ' + percent + ' %';
                this._lastRender = date;
            }

            if(this._render)
            {
                this._app.container.render()
            }
            if(this.started)window.requestAnimationFrame(this.loop.bind(this));
        }
    }
}
