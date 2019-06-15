namespace ICad.Network
{
    /**
     * Ajax
     */
    export class Ajax
    {
        /** Queried url. */
        _url : string
        
        /**
         * 
        * @param {number | null} seed 
         */
        constructor(url)
        {
            this._url = url;
        }
        
        /**
         * Getter of url
        * @return {string}  Value of url
         */
        get url() : string
        {
            return this._url;
        }

        async get(path, data={}) : Promise<any>
        {
            return this.query('GET', path, data);
        }

        private async query(verb, path, data)
        {
            return new Promise(resolver => {
                var key : string;
                var xhr = new XMLHttpRequest();
                var handler = function(){
                    resolver(JSON.parse(this.response));
                }
                xhr.addEventListener( 'load', handler );
                switch(verb)
                {
                    case 'GET':
                        path += '?'
                        for( key in data)
                        {
                            path += encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
                        }
                        xhr.open( verb, this._url + path);
                        xhr.send();
                        break;

                    case 'POST':
                        xhr.open( verb, this._url + path );
                        xhr.send(data);
                        break;
                }
            })
        }
    }
}
