
var Project = require('./Project')

class Directory
{
    constructor(directory)
    {
        this._directory = directory;
        this._projects = [];
        directory.directories().forEach(d=>this._projects.push(new Project(d)));
    }

    name()      { return this._directory.name(); }
    projects() { return this._projects; }

    project(name) {
        for(var i=0; i<this._projects.length; ++i)
            if(name == this._projects[i].name())
                return this._projects[i];
        return null;
    }
}

module.exports = Directory;