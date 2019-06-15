
var Log = require('./Log')

class Borehole
{
    constructor(directory)
    {
        this._directory = directory;
        this._logs = [];

        var files = {}

        directory.files().forEach(f=>{
            var name = f.name();
            var data = files[name] ? files[name] : { data : null, config : null}
            switch(f.extention())
            {
                case 'csv'  : data.data = f;   break;
                case 'json' : data.config = f; break;
            }
            files[name] = data;
        });

        for(var name in files)
        {
            var log = new Log(files[name].config, files[name].data);
            this._logs.push(log)
        }

    }

    name()      { return this._directory.name(); }
    logs() { return this._logs; }


    log(name) {
        for(var i=0; i<this._logs.length; ++i)
            if(name == this._logs[i].name())
                return this._logs[i];
        return null;
    }
}

module.exports = Borehole;