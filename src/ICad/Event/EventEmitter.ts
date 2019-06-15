namespace ICad.Event
{
    /**
     * EventEmitter
     * @abstract
     */
    export abstract class EventEmitter
    {
        /** Registred callbacks on this object.
         * Structure : 
         * {
         *   eventName: 
         *   [
         *     callback,
         *     callback,
         *     ...
         *   ],
         *    ...
         * }*/
        _registrations : Map<string, Array<Registration>> = new Map<string, Array<Registration>>()
        
        /** Registred bridge emitters.*/
        _bridges : Array<EventEmitter>
        
        /**
         * Register a function to an event.
         * When called, this function will receive an Event object as parameter.
         * Prototype : function(Event.Event) : void
         * @param {string} eventName Name of the event to listen.
         * @param {Function} callback Function to call when the event is triggered.
         * @return {ICad.Event.Registration}  Registration create for this event registration.
         */
        on(eventName : string, callback : Function) : ICad.Event.Registration
        {
            var registration = new  ICad.Event.Registration()
            registration.callback = callback

            if(!this.registrations.has(eventName))
            {
                this.registrations.set(eventName, [])
            }
            this.registrations.get(eventName).push(registration)

            return registration
        }
        
        /**
         * Unregister a function from  an event.
        * @param {ICad.Event.Registration} registration Registration to remove from the event.
         */
        off(registration : ICad.Event.Registration)
        {
            this.registrations.forEach(registrations=>{
                var i = registrations.indexOf(registration) 
                if(i !== -1)  registrations.splice(i,1)
            })
        }
        
        /**
         * Spread  an event.
         * All functions registered to this event will be called.
         * @param {string} eventName Event's name to spread.
         * @param {Object} args?.Data used to build the Event object.
         *                      These data will be available for all the called registered functions.
         * @return {ICad.Event.Event}  Event triggered by this emitter.
         */
        trigger(eventName : string, args? : Object) : ICad.Event.Event
        {
            if(!this.registrations.has(eventName)) return

            var registrations = this.registrations.get(eventName)
            if(registrations.length == 0) return

            var  event = new ICad.Event.Event()
            event.data = args
            event.emitter = this

            for(var i=0; i<registrations.length; ++i)
            {
                registrations[i].callback(event)
            }

            return null
        }
        
        /**
         * Getter of registrations
         * @return {Map<string, Array<Registration>>}  Value of registrations
         */
        get registrations() : Map<string, Array<Registration>>
        {
            return this._registrations
        }
        
        /**
         * Getter of bridges
         * @return {Array<EventEmitter>}  Value of bridges
         */
        get bridges() : Array<EventEmitter>
        {
            return this._bridges
        }
        
        /**
         * Setter of registrations
         * @param {Map<string, Array<Registration>>} registrations New value of registrations
         */
        set registrations(registrations : Map<string, Array<Registration>>)
        {
            this._registrations = registrations
        }
        
        /**
         * Setter of bridges
        * @param {Array<EventEmitter>} bridges New value of bridges
         */
        set bridges(bridges : Array<EventEmitter>)
        {
            this._bridges = bridges
        }
    }
}
