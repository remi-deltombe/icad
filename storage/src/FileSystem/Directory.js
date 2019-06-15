const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

var File = require('./File')

const isDirectory = function(source)
{
    return lstatSync(source).isDirectory()
}

const isFile = function(source)
{
    var result = lstatSync(source).isFile()
    var name = source.split('/').pop();
    result &= name.length > 0
    result &= name[0] != '.'
    return result
}

const getDirectories = function(source)
{
    return readdirSync(source).map(name => join(source, name)).filter(isDirectory)
}

const getFiles = function(source)
{
    return readdirSync(source).map(name => join(source, name)).filter(isFile)
}


class Directory
{
    constructor(path)
    {
        this._path        = path;
        this._directories = false;
        this._files       = false;
    }

    name()
    {
        return this._path.split('/').pop();
    }

    directories()
    {
        if(this._directories === false)
        {
            this._directories = getDirectories(this._path).map(p=>new Directory(p));
        }
        return this._directories;
    }
    files()
    {
        if(this._files === false)
        {
            this._files = getFiles(this._path).map(p=>new File(p));
        }
        return this._files;
    }
}

module.exports = Directory;