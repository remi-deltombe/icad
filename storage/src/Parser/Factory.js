
var CSV = require('./CSV');
var JSON = require('./JSON');

class Factory
{
    for(file)
    {
        switch(file.extention())
        {
            case 'json': return new JSON(file);
            case 'csv': return new CSV(file);
        }
        return null;
    }
}

module.exports = Factory;