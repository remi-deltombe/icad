
namespace ICad.Util
{
    export class Ajax
    {
        /**
         *
         */
        static async get(url : string, args? : object) : Promise<string>
        {
            return Ajax.query('GET', url, args)
        }

        /**
         *
         */
        static async post(url : string, args? : object) : Promise<string>
        {
            return Ajax.query('POST', url, args)
        }

        /**
         *
         */
        static async put(url : string, args? : object) : Promise<string>
        {
            return Ajax.query('PUT', url, args)
        }

        /**
         *
         */
        static async delete(url : string, args? : object) : Promise<string>
        {
            return Ajax.query('DELETE', url, args)
        }

        /**
         *
         */
        private static async query(method : string, url : string, args? : object) : Promise<string>
        {
            var promise =  new Promise<string>(function(resolver){
                var xhr = new XMLHttpRequest();
                xhr.addEventListener( 'load',  function() {
                    resolver(this.responseText);
                });
                xhr.open( method, url);
                xhr.send();
            })

            return promise
            
        }
    }
}
