var fs = require('fs'),
    path = require('path'),    
    readline = require('readline'),
    stream = require('stream'),
    filePath = path.join(__dirname, 'start.html')
    ;


class File
{
    constructor(path)
    {
        this._path = path;
    }

    name()
    {
        var parts = this._path.split('/').pop().split('.');
        parts.pop();
        return parts.join('.')
    }

    extention()
    {
        return this._path.split('/').pop().split('.').pop()
    }

    content()
    {
        return new Promise(resolve => {
            fs.readFile(this._path, {encoding: 'utf-8'}, function(err,data){
                if (!err) {
                    resolve(data)
                } else {
                    resolve('')
                }
            });
        })
    }

    forEachLines(cb)
    {
        return new Promise(resolve=>{
            var instream = fs.createReadStream(this._path);
            var outstream = new stream();
            var rl = readline.createInterface(instream, outstream);
            rl.on('line', function (line) {
                cb(line);
            });
            
            rl.on('close', function (line) {
                resolve();
            });
        })
    }
}

module.exports = File;