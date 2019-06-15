namespace ICad.Controller
{
    /**
     * AbstractCompositeCtrl
     * @abstract
     */
    export abstract class AbstractCompositeCtrl extends ICad.Controller.AbstractCtrl
    {
        /** Controller which compose this controller
         * */
        _controllers : Array<AbstractCtrl> = []

        /**
         * Start this controller and all its contained controllers.
         */
        start()
        {
            this.controllers.forEach(v=>v.start())
            super.start()
        }
        
        /**
         * Update this controller and its view.
         * If it's not started, it will start it first. 
         */
        update()
        {
            this.controllers.forEach(v=>v.update())
        }

        /**
         * Stop this controller and all its contained controllers.
         */
        stop()
        {
            this.controllers.forEach(v=>v.stop())
            super.stop()
        }
        
        /**
         * 
        * @param {ICad.Controller.AbstractCtrl} controller 
         */
        addController(controller : ICad.Controller.AbstractCtrl)
        {
            this.controllers.push(controller);
        }

        findControllers(controllerClass : any) : AbstractCtrl[]
        {
            var result = []; 
            this.controllers.forEach(c=>{
                if(c instanceof controllerClass)
                {
                    result.push(c);
                }
                if(c instanceof AbstractCompositeCtrl)
                {
                    result=result.concat(c.findControllers(controllerClass));
                }
            })
            return result;
        }

        /**
         * 
        * @param {ICad.Controller.AbstractCtrl} controller 
         */
        removeController(controller : ICad.Controller.AbstractCtrl)
        {
            var i = this.controllers.indexOf(controller)
            if(i!==-1)
            {
                controller.stop()
                this.controllers.splice(i,1)
            }
        }

        /**
         * 
        * @param {ICad.Controller.AbstractCtrl} controller 
         */
        removeControllers()
        {
            for(var i=this.controllers.length-1; i>=0; --i)
            {
                this.removeController(this.controllers[i])
            }
        }
        
        protected createController(controller: any) : ICad.Controller.AbstractCtrl
        {
            var result = this.app.controllerFactory.instantiate(controller)
            if(this.started)
                result.start()
            this.addController(result)
            return result
        }

        /**
         * Getter of controllers
        * @return {Array<AbstractCtrl>}  Value of controllers
         */
        get controllers() : Array<AbstractCtrl>
        {
            return this._controllers
        }
        
        /**
         * Setter of controllers
        * @param {Array<AbstractCtrl>} controllers New value of controllers
         */
        set controllers(controllers : Array<AbstractCtrl>)
        {
            this._controllers = controllers
        }
    }
}
