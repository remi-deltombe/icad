namespace ICad.Collection
{
    export class MapListenable<K, T> extends ICad.Event.EventEmitter
    {
        _map : Map<K, T> = new Map();

        set(key : K, value : T)
        {
            this._map.set(key, value);
            this.trigger('keys.'+key+'.change', value);
        }

        get(key : K) : T
        {
            return this._map.get(key)
        }
    }
}
