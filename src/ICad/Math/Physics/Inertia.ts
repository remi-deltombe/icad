namespace ICad.Math.Physics
{
    /**
     * Inertia
     */
    export class Inertia
    {
        _start : number 
        _duration : number = 1000
        _value : number = 1

        constructor()
        {
            this._start = new Date().getTime()
        }

        atTime(time : number) : number
        {
            var diff = time - this._start
            var duration = this._duration


            if(diff < 0) return this._value
            if(diff > duration) return 0

            return this._value * ((duration-diff) / duration)
        }
    }
}
