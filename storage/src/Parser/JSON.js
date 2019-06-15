
var Parser = require('./Parser');

class _JSON extends Parser
{
    constructor(file)
    {
        super(file)
        this._preload = true;
    }
    parse(string)
    {
        return JSON.parse(string);
    }
}

module.exports = _JSON;
