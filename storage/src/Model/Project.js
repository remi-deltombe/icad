
var Borehole = require('./Borehole')

class Project
{
    constructor(directory)
    {
        this._directory = directory;
        this._boreholes = [];
        directory.directories().forEach(d=>this._boreholes.push(new Borehole(d)));
    }

    name()      { return this._directory.name(); }
    boreholes() { return this._boreholes; }

    borehole(name) {
        for(var i=0; i<this._boreholes.length; ++i)
            if(name == this._boreholes[i].name())
                return this._boreholes[i];
        return null;
    }
}

module.exports = Project;