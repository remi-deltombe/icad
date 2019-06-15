
namespace ICad.Storage
{
    /**
     * FakeStorage
     */
    export class FakeStorage extends ICad.Storage.AbstractStorage
    {
        _project : ICad.Model.Well.Project
        _boreholeA : ICad.Model.Well.Borehole
        _boreholeB : ICad.Model.Well.Borehole

        _promise : Promise<any> = null
        _loading : boolean = false
        _loaded : boolean = false
        _loadedCount : number = 0

        /**
         * 
        * @param {number | null} seed 
         */
        constructor(seed : number | null)
        {
            super()
            this.name = "Sample storage"

            var random = new ICad.Util.Random(1);
            this._project = new ICad.Model.Well.Project()

            this._project.uuid = Util.Unicity.uuid()
            this._project.name = 'project'
            
            this._boreholeA = new ICad.Model.Well.Borehole()
            this._boreholeA.uuid = Util.Unicity.uuid()
            this._boreholeA.name = 'borehole A'
            this._boreholeA._project = this._project
            this._project._boreholes.set(this._boreholeA.uuid, this._boreholeA)
            
            this._boreholeB = new ICad.Model.Well.Borehole()
            this._boreholeB.uuid = Util.Unicity.uuid()
            this._boreholeB.name = 'borehole B'
            this._boreholeB._project = this._project
            this._project._boreholes.set(this._boreholeB.uuid, this._boreholeB)
        }
        
        /**
         * 
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string, ICad.Model.Directory>>}  
         */
        async getDirectories(query : ICad.Storage.Query) : Promise<Map<string, ICad.Model.Directory>>
        {
            return null
        }
        
        /**
         * 
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string, ICad.Model.Well.Project>>}  
         */
        async getProjects(query : ICad.Storage.Query) : Promise<Map<string, ICad.Model.Well.Project>>
        {
            return new Map([[this._project.uuid, this._project]])
        }
        
        /**
         * 
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string, ICad.Model.Well.Borehole>>}  
         */
        async getBoreholes(query : ICad.Storage.Query) : Promise<Map<string, ICad.Model.Well.Borehole>>
        {
            return new Map([
                [this._boreholeA.uuid, this._boreholeA],
                [this._boreholeB.uuid, this._boreholeB]
            ])
        }
        
        /**
         * 
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Map<string, ICad.Model.Well.Log>>}  
         */
        async getLogs(query : ICad.Storage.Query) : Promise<Map<string, ICad.Model.Well.Log>>
        {
            if(!query.filter.borehole || 
            !(
                query.filter.borehole.uuid != this._boreholeA.uuid
                || query.filter.borehole.uuid != this._boreholeB.uuid
            ))
            {
                return
            }

            var borehole = query.filter.borehole.uuid === this._boreholeA.uuid ? this._boreholeA : this._boreholeB
            if(!this._loaded)
            {
                var that = this
                this._loading = true
                this._loaded = true

                this._promise = new Promise(resolver=>{
                    var promises = []
                    var urls = [
                        'http://localhost:5757/samples/3.csv'
                        ,'http://localhost:5757/samples/3.csv'
                        ,'http://localhost:5757/samples/3.csv'
                        ,'http://localhost:5757/samples/3.csv'
                        ,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        //,'http://localhost:5757/samples/3.csv'
                        ////,'http://localhost:5757/samples/1.csv'
                        //,'http://localhost:5757/samples/1.csv'
                        //,'http://10.0.0.167:5757/samples/3.csv'
                        //,'http://10.0.0.167:5757/samples/3.csv'
                        //,'http://10.0.0.167:5757/samples/3.csv'
                        //,'http://10.0.0.167:5757/samples/3.csv'
                        //,'http://10.0.0.167:5757/samples/3.csv'
                        //,'http://10.0.0.167:5757/samples/3.csv'
                        //,'http://10.0.0.167:5757/samples/3.csv'
                        //,'http://10.0.0.167:5757/samples/3.csv'
                        //,'http://10.0.0.167:5757/samples/3.csv'
                        //,'http://10.0.0.167:5757/samples/3.csv'
                        //,'http://10.0.0.167:5757/samples/1.csv'
                        //,'http://10.0.0.167:5757/samples/1.csv'
                        //,'http://10.0.0.167:5757/samples/1.csv'
                        //,'http://10.0.0.167:5757/samples/1.csv'
                        //,'http://10.0.0.167:5757/samples/1.csv'
                        //,'http://10.0.0.167:5757/samples/1.csv'
                        //,'http://10.0.0.167:5757/samples/1.csv'
                        //,'http://10.0.0.167:5757/samples/1.csv'
                        //,'http://10.1.2.105:5757/samples/1.csv'
                        //,'http://10.0.0.167:5757/samples/1.csv'
                        //,'../../samples/1.csv'
                        //,'../../samples/1.csv'
                        //,'../../samples/1.csv'
                        //,'../../samples/1.csv'
                        //,'../../samples/1.csv'
                    ]
                    for(var i=0; i<urls.length; ++i)
                    {
                        promises.push(this.loadLog(urls[i]))
                    }
                    Promise.all(promises).then(logs=>{
                        that._loading = false
                        resolver(borehole.logs)
                    })
                })
            }
            return this._loading ? this._promise : borehole.logs
        }
        
        /**
         * 
        * @param {ICad.Storage.Query} query 
        * @return {Promise<Model.Well.TraceCollection>}  
         */
        async getTraces(query : ICad.Storage.Query) : Promise<Model.Well.TraceCollection>
        {
            if(query._filter.log && this._boreholeA.logs.has(query._filter.log.uuid))
            {
                return this._boreholeA.logs.get(query._filter.log.uuid).traces
            }
            if(query._filter.log && this._boreholeB.logs.has(query._filter.log.uuid))
            {
                return this._boreholeB.logs.get(query._filter.log.uuid).traces
            }
            return new Model.Well.TraceCollection()
        }

        private async loadLog(url)
        {
            var that = this
            return new Promise(resolver=>{
                Util.Ajax.get(url).then(csv=>{
                    var log = new Model.Well.Log()

                    log.uuid = Util.Unicity.uuid()
                    log.name = '#'+that._loadedCount+ ' - ' + url.split('/').pop()

                    log.borehole = that._loadedCount % 2 ? that._boreholeA : that._boreholeB
                    log.borehole.logs.set(log.uuid, log)

                    var lineSeparator = '\n'
                    var valueSeparator = ','

                    var width = 0
                    var height = 0
                    for(var i=0; i<csv.length && csv[i] != lineSeparator; ++i)
                    {
                        if(csv[i] === valueSeparator) ++width
                    }
                    for(var i=0; i<csv.length; ++i)
                    {
                        if(csv[i] === lineSeparator) ++height
                    }
                    var length = width * height
                    var data = new Array(length)
                    var uuid = new Array(height).fill(0).map(v=>Util.Unicity.uuid())
                    var references = new Array(height)
                    var reference = true
                    for(var i=0, k=0, j=0, r=0; i<csv.length; ++i)
                    {
                        switch(csv[i])
                        {
                            case lineSeparator:
                            case valueSeparator:
                            {
                                var s = ''
                                for(;k<i; ++k) s+= csv[k]
                                if(reference)
                                {
                                    references[r] = parseFloat(s)// % 255
                                    ++r
                                }
                                else
                                {
                                    data[j] = parseFloat(s)// % 255
                                    ++j
                                } 
                                reference = csv[i] === lineSeparator
                            }
                            case ' ':
                                k = i + 1;
                                break;
                        }
                    }
                    var collection = new ICad.Model.Well.TraceCollection()
                    collection._log = log
                    collection._uuid = uuid
                    collection._references = references
                    collection._data.data = data
                    collection._data.height = height
                    collection._data.width = width

                    log.traces = collection

                    that._loadedCount++
                    resolver()
                })

            })
        }
    }
}
