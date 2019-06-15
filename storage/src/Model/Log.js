
var ParserFactory = require('./../Parser/Factory');
var parserFactory = new ParserFactory()

class Log
{
    constructor(fileConfig, fileData)
    {
        this._fileConfig = fileConfig;
        this._fileData = fileData;
        this._content = false;
    }

    name()      { return this._fileData.name(); }

    content()
    { 
        return new Promise(async r=>{
            if(this._content == false)
            {
                this._content = {}
                if(this._fileConfig)
                {
                    this._content = await parserFactory.for(this._fileConfig).data();

                }
                if(this._fileData)
                {
                    this._content.data = await parserFactory.for(this._fileData).data();
                }
                /*
                this(this._fileConfig) ? parserFactory.for(this._fileConfig).data() : {}
                parserFactory.for(this._fileData).data().then(data=>{
                    this._content.data = data;
                    r(this._content)
                });
                */
            }
            r(this._content)
        })
    }
}

module.exports = Log;