namespace ICad.Model.Well
{
    /**
     * Trace
     */
    export class TraceCollection extends ICad.Model.AbstractModelCollection<Trace>
    {
        _data : Math.Matrix<any> = new Math.Matrix()
        _references : Array<number> = []
        _log : Log = null
        _uuid : Array<string> = []

        add(model: Trace) 
        {
            throw 'Method add should be implemented'
        }

        /**
         *
         */
        withUUID(uuid: string) : Trace
        {
            return null
        }

        /**
         *
         */
        atReference(reference: number) : Trace
        {
            /*
            var index = this._references.findIndex(v=>v==reference)
            if(index !== -1) return new Trace(this, index);
            */
            var diff = this._references.map(v=>abs(v-reference))
            var index = 0
            diff.forEach((v, i)=>{
                if(v<diff[index]) index = i
            })

            /*
            var a = index;
            var b = index;
            if(index == 0) b++;
            else if(index == (diff.length-1)) b--;
            else if(diff[index+1] > diff[index-1]) b--;
            else b++;

            var rf = this._references[a];
            var rt = this._references[b];
            */

            var collection = new TraceCollection();
            collection.data = new ICad.Math.Matrix();
            collection.references = [reference]
            collection.log = this.log
            collection.uuid = [null]

            collection.data.data = this.data.line(index);
            collection.data.width = this._data.width;
            collection.data.height = this._data.height;
            //collection.data.map((v, x)=>map(reference, rf, rt, this.data.at(x, a), this.data.at(x, b)));

            return new Trace(collection, 0)
        }

        get log() : Log
        {
            return this._log;
        }


        get data() : Math.Matrix<any>
        {
            return this._data;
        }

        get top() : number
        {
            return this._references[0];
        }

        get bottom() : number
        {
            return this._references[this._references.length-1];
        }

        set data(data : Math.Matrix<any>)
        {
            this._data = data;
        }

        set references(references : Array<number>)
        {
            this._references = references;
        }

        set log(log : Log)
        {
            this._log = log;
        }

        set uuid(uuid : Array<string>)
        {
            this._uuid = uuid;
        }
    }
}
