namespace ICad.View.DOM
{
    /**
     * DOMEmitter
     */
    export class DOMEmitter extends ICad.View.DOM.DOM
    {
        /** Event to listen on this view dom.
         * The keys are the HTML events names.
         * The values are the function to call, or the event to trigger.*/
        _events : Map<string, string|Function> = new Map<string, string|Function>([
            ['click', 'click'],
            ['scroll', 'scroll'],
            ['mousedown', 'mousedown'],
            ['mouseup', 'mouseup'],
            ['mousemove', 'mousemove'],
            ['mouseleave', 'mouseleave'],
            ['mouseenter', 'mouseenter'],
            ['mousewheel', 'mousewheel'],
            ['gesturestart', 'gesturestart'],
            ['touchstart', 'touchstart'],
            ['touchmove', 'touchmove'],
            ['touchend', 'touchend'],
            ['keydown', 'keydown'],
            ['keyup', 'keyup'], 
            ['resize', 'resize']
        ])
        
        /**
         * Call DOM render and bind events on its dom.
         */
        render()
        {
            super.render()
            this.bindEvents()
        }
        
        /**
         * Getter of events
        * @return {Map<string, string|Function>}  Value of events
         */
        get events() : Map<string, string|Function>
        {
            return this._events
        }
        
        /**
         * Setter of events
        * @param {Map<string, string|Function>} events New value of events
         */
        set events(events : Map<string, string|Function>)
        {
            this._events = events
        }

        /**
         *
         */
        protected bindEvents()
        {
            var that = this
            this.events.forEach((v,k) => {that.bindEvent(k,v)})
        }

        protected bindEvent(eventName : string, callback : string|Function) : void
        {
            if(typeof callback == 'string')
            {
                (this.dom.addEventListener as any)(eventName, this.trigger.bind(this, callback), {passive: true})
            }
            else if(typeof callback == 'function')
            {
                (this.dom.addEventListener as any)(eventName, callback as EventListenerOrEventListenerObject, {passive: true})
            }
        }
    }
}
