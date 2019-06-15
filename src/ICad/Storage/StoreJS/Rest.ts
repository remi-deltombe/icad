namespace ICad.Storage.StoreJS
{
    /**
     * FakeStorage
     */
    export class Rest extends ICad.Storage.AbstractStorage
    {
        /** */
        _ajax : ICad.Network.Ajax

        /**
         * 
        * @param {number | null} seed 
         */
        constructor(url)
        {
            super()
            this._name = url;//"StoreJS [" + url.split('/').pop().split(':').shift() + "]";
            this._ajax = new ICad.Network.Ajax(url);
        }
        
        /**
         * 
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string, ICad.Model.Directory>>}  
         */
        async getDirectories(query : ICad.Storage.Query) : Promise<Map<string, ICad.Model.Directory>>
        {
            var names = await this._ajax.get('/');
            var result = new Map();

            for(var i=0; i<names.length; ++i)
            {
                var directory = new ICad.Model.Directory();
                directory.name = names[i];
                result.set(directory.uuid, directory);
            }
            return result
        }
        
        /**
         * 
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string, ICad.Model.Well.Project>>}  
         */
        async getProjects(query : ICad.Storage.Query) : Promise<Map<string, ICad.Model.Well.Project>>
        {
            var result = new Map();
            var directories = await this.getDirectories(query);
            var iterator = directories.entries();
            for(var value of iterator)
            {
                var directory = value[1]
                var projects = await this._ajax.get('/'+directory.name);
                for(var i=0; i<projects.length; ++i)
                {
                    var project = new ICad.Model.Well.Project();
                    project.name = projects[i];
                    project.directory = directory;
                    result.set(project.uuid, project);
                }
            }

            return result;
        }
        
        /**
         * 
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string, ICad.Model.Well.Borehole>>}  
         */
        async getBoreholes(query : ICad.Storage.Query) : Promise<Map<string, ICad.Model.Well.Borehole>>
        {
            var project = query.parent as ICad.Model.Well.Project;
            var names = await this._ajax.get('/'+project.directory.name+'/'+project.name);
            var result = new Map();

            for(var i=0; i<names.length; ++i)
            {
                var borehole = new ICad.Model.Well.Borehole();
                borehole.name = names[i];
                borehole.project = project;
                project.boreholes.set(borehole.uuid, borehole);
                result.set(borehole.uuid, borehole);
            }
            return result
        }
        
        /**
         * 
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string, ICad.Model.Well.Log>>}  
         */
        async getLogs(query : ICad.Storage.Query) : Promise<Map<string, ICad.Model.Well.Log>>
        {
            var borehole = query.parent as ICad.Model.Well.Borehole;
            var names = await this._ajax.get('/'+borehole.project.directory.name+'/'+borehole.project.name+'/'+borehole.name);
            var result = new Map();

            for(var i=0; i<names.length; ++i)
            {
                var log = new ICad.Model.Well.Log();
                log.name = names[i];
                log.borehole = borehole;
                borehole.logs.set(log.uuid, log);
                result.set(log.uuid, log);
            }
            return result
        }
        
        /**
         * 
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Model.Well.TraceCollection>}  
         */
        async getTraces(query : ICad.Storage.Query) : Promise<Model.Well.TraceCollection>
        {
            var log = query.parent as ICad.Model.Well.Log;
            var result = new ICad.Model.Well.TraceCollection();
            var infos = await this._ajax.get('/'+log.borehole.project.directory.name+'/'+log.borehole.project.name+'/'+log.borehole.name+'/'+log.name);
            var data = infos.data ? infos.data : [];

            var height = data.length
            var width = data[0].length
            var matrix = new ICad.Math.Matrix();
            var references = new Array();

            matrix.allocate(width-1, height)
            var i=0;
            var _min : any = false;
            var _max : any = false;
            data.forEach(r=>r.forEach((v,j)=>{
                if(j==0)
                    references.push(parseFloat(v))
                else
                {
                    if(v[0] == '#')
                    {
                        var color = new ICad.Math.Color.Color();
                        color.fromString(v);
                        matrix.data[i++] = color;
                    }
                    else
                    {
                        var data = parseFloat(v)
                        matrix.data[i++] = data
                        _min = _min === false ? data : min(_min, data);
                        _max = _max === false ? data : max(_max, data);
                    }
                }
            }))
            result.data = matrix;
            result.references = references
            result.uuid = new Array(matrix.height).fill(0).map(v=>ICad.Util.Unicity.uuid())
            result.log = log
            log.traces = result;


            log.display.min = 0;//infos.min ? infos.min : false;
            log.display.max = 0;//infos.max ? infos.max : false;
            
            if(infos.min)
            {
                log.display.min = infos.min as number;
            }
            else if(_min !== false)
            {
                log.display.min = _min as number;
            }
            if(infos.max)
            {
                log.display.max = infos.max as number;
            }
            else if(_max !== false)
            {
                log.display.max = _max as number;
            }
            if(infos.colors)
            {
                infos.colors.forEach((v,i)=>{
                    var color = new Math.Color.Color();
                    color.fromString(v);
                    log.display.colors[i] = color;
                })
            }
            
            return result
        }
    }
}
