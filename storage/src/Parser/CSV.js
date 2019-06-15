
var Parser = require('./Parser');

class CSV extends Parser
{
    parse(string)
    {
        return string.split(',').map(v=>(v.trim()));
        return string.split('\n').map(l=>l.split(',').map(v=>v.trim()));
    }
}

module.exports = CSV;
