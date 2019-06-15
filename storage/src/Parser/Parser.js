
class Parser
{
    constructor(file)
    {
        this._file = file;
        this._preload = false;
    }

    data()
    {
        return new Promise(resolve=>{
            var data = []
            if(this._preload)
            {
                this._file.content()
                    .then(content=>{
                        resolve(this.parse(content))
                    })
            }
            else
            {
                this._file.forEachLines((line)=>{
                    if(line.length > 2 && data.length < 200)
                    {
                        if(data.length === 0 || (data[data.length-1][0] != line[0]))
                            data.push(this.parse(line))
                    }
                   else  if(line.length > 1 && data.length < 10000 )
                    {
                        if(data.length === 0 || (data[data.length-1][0] != line[0]))
                            data.push(this.parse(line))
                    }
                })
                .then(()=>{
                    resolve(data.filter((v,i)=>{
                        return (v[0] != null) && !isNaN(v[0]) && ((i+1)==data.length || data[i+1][0] != data[i][0] )
                    }))
                })
            }
        })
    }

    parse(string)
    {
        return [];
    }
}

module.exports = Parser;
