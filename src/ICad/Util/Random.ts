interface Window {
    Math: typeof Math;
}

namespace ICad.Util
{
    /**
     * Random
     */
    export class Random
    {
        /** Seed used to generate data.
         * If two object Random used the same seed, all the generated data will be identical.
         * */
        _seed : number
        
        /**
         * Instanciate a new Random.
         * @param {number} seed? Seed to be used by this Random.
         * If not specified, it is set with a random number.
         */
        constructor(seed? : number)
        {
            seed = window.Math.abs(seed || (window.Math.random() * 16807))
            seed = seed * 16807 % 2147483647
            this.seed = seed
        }
        
        /**
         * Build a random number and update the seed.
        * @return {number}  Random number depending of the current seed.
         */
        next() : number
        {
            return this._seed = this._seed * 16807 % 2147483647
        }
        
        /**
         * Getter of seed
        * @return {number}  Value of seed
         */
        get seed() : number
        {
            return this._seed
        }
        
        /**
         * Setter of seed
        * @param {number} seed New value of seed
         */
        set seed(seed : number)
        {
            this._seed = seed
        }
    }
}
