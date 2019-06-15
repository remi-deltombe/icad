
var REST = require('./Network/REST');
var WebSocket = require('./Network/WebSocket');
var FS = {
    Directory : require('./FileSystem/Directory'),
    File      : require('./FileSystem/File')
}
var Model = {
    Directory : require('./Model/Directory'),
    Project   : require('./Model/Project'),
    Borehole  : require('./Model/Borehole'),
    Log       : require('./Model/Log'),
}

class Server
{
    constructor(config)
    {
        this._config = config;
        this._networks = [];
        this._directories = [];
        this._intervalRefresh = false;
        this.init();
    }

    init()
    {
        var network   = this._config.network || [];
        var rest      = network.REST || false;
        var websocket = network.websocket || false;

        if(rest) 
            this._networks.push(new REST(this, rest.host, rest.port));
        if(websocket) 
            this._networks.push(new WebSocket(this, websocket.host, websocket.port));
    }

    start()
    {
        this.refresh();
        this._networks.forEach(n=>n.start());

        if(this._config.refresh)
            this._intervalRefresh = setInterval(this.refresh.bind(this), parseInt(this._config.refresh));
    }

    stop()
    {
        this._networks.forEach(n=>n.stop());

        if(this._intervalRefresh)
            clearInterval(this._intervalRefresh);
    }

    refresh()
    {
        var directoryPaths = this._config.datadir || [];
        this._directories = [];
        directoryPaths.forEach(p=>{
            this._directories.push(new Model.Directory(new FS.Directory(p)));
        })
    }

    directories() { return this._directories; }
}

module.exports = Server;