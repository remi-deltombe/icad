namespace ICad.Event
{
    /**
     * Event
     */
    export class TouchEventHandler extends EventEmitter
    {
        /** */
        _emitter : EventEmitter = null

        /** */
        _events : Array<Registration> = []

        /** */
        _previous : Math.Geometry.Rectangle

        /** */
        _initial : Math.Geometry.Rectangle

        /** */
        _fingers : number

        /** */
        _inertia : Math.Physics.Inertia = new Math.Physics.Inertia()

        /**
         *
         */
        get emitter() : EventEmitter
        {
            return this._emitter
        }

        /**
         *
         */
        set emitter(emitter : EventEmitter)
        {
            this.unbindEvents()
            this._emitter = emitter
            this.bindEvents()
        }

        /**
         *
         */
        private bindEvents()
        {
            this._events.push(this._emitter.on('gesturestart', this.onGestureStart.bind(this)))
            this._events.push(this._emitter.on('touchstart', this.onTouchStart.bind(this)))
            this._events.push(this._emitter.on('touchmove', this.onTouchMove.bind(this)))
            this._events.push(this._emitter.on('touchend', this.onTouchEnd.bind(this)))
        }

        /**
         *
         */
        private unbindEvents()
        {
            if(this._emitter && this._events)
            {
                for(var i=0; i<this._events.length; ++i)
                {
                    this._emitter.off(this._events[i])
                }
            }
        }

        /**
         *
         */
        private onTouchStart(e : Event)
        {
            e.data.preventDefault();
            this._fingers = e.data.touches.length
            this._initial = this.getRectangle(e.data.touches)
            this._previous = this._initial
            this._inertia._start = 0
        }

        /**
         *
         */
        private onGestureStart(e : Event)
        {
            e.data.preventDefault();
        }

        /**
         *
         */
        private onTouchMove(e : Event)
        {
            e.data.preventDefault();
            if(this._fingers !== e.data.touches.length) return 

            var current = this.getRectangle(e.data.touches)

            var move = current.center.distance(this._previous.center)
            var grow = window.Math.abs(current.diagonal - this._previous.diagonal)


            if(move > grow)
            {
                var cc = current.center
                var cp = this._previous.center
                var dy = cc.y-cp.y
                this.trigger('scroll-' + this._fingers, {
                    y : dy,
                    x : cc.x-cp.x
                });
                this._inertia._value = dy
                this._inertia._duration = ((dy * dy)/2500) * 4000
            } 
            else
            {
                var cc = current.center
                this.trigger('zoom-' + this._fingers, {
                   zoom : this._previous.area / current.area,
                   x: cc.x,
                   y: cc.y
                });
            }

            this._previous = current
        }

        /**
         *
         */
        private onTouchEnd(e : Event)
        {
            console.log(e.data);
            e.data.preventDefault();
            this._inertia._start = new Date().getTime()
            this.applyInertia();
        }

        /**
         *
         */
        private getRectangle(touches : any) : Math.Geometry.Rectangle
        {
            var top    = touches[0].clientY
            var bottom = touches[0].clientY
            var left   = touches[0].clientX
            var right  = touches[0].clientX

            for(var i=1; i<touches.length; ++i)
            {
                top    = window.Math.min(top    , touches[i].clientY)
                bottom = window.Math.max(bottom , touches[i].clientY)
                left   = window.Math.min(left   , touches[i].clientX)
                right  = window.Math.max(right  , touches[i].clientX)
            }

            var rect = new Math.Geometry.Rectangle()
            rect.y = top
            rect.x = left
            rect.height = bottom - top
            rect.width = right - left
            return rect
        }

        private applyInertia()
        {
            var that = this
            requestAnimationFrame(function(){
                var now = new Date().getTime()
                var value = that._inertia.atTime(now)
                if(value !== 0)
                {
                    that.trigger('scroll-' + that._fingers, {
                        y : value,
                        x : 0
                    });
                    that.applyInertia()
                }
            })
        }

    }
}
