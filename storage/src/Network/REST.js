var cors = require('cors')
var Network = require('./Network');
const express = require('express')


class REST extends Network
{
    constructor(server, host, port)
    {
        super(server, host, port);

        this._app = express(); 
        this._app.use(cors())

        
        this.bind();
    }

    start()
    {
        console.log("Start listening ["+this._host+":"+this._port+"]")
        this._app.listen(this._port)
    }

    stop()
    {

    }

    bind()
    {
        var prepare = function(callback, req, res){
            var date = new Date();
                date = [ date.getHours(), date.getMinutes(), date.getSeconds()]
                    .map(v=>'00'+v)
                    .map(v=>v.substring(v.length-2, v.length))
                    .join(':')
            console.log(date+ ' ' + decodeURI(req.originalUrl))
           return callback.apply(callback, Object.values(req.params));
        }

        var prepareName = function(callback, req, res){
            prepare(callback, req, res).then(function(data){
                res.send(JSON.stringify(data.map(v=>v.name())));
            });
        }

        var preparePlain = function(callback, req, res){
            prepare(callback, req, res).then(function(data){
                res.send(JSON.stringify(data));
            });
        }

        this._app.get('/'        , prepareName.bind(null , this.directories.bind(this)));
        this._app.get('/*/*/*/*' , preparePlain.bind(null , this.log.bind(this)));
        this._app.get('/*/*/*'   , prepareName.bind(null , this.logs.bind(this)));
        this._app.get('/*/*'     , prepareName.bind(null , this.boreholes.bind(this)));
        this._app.get('/*'       , prepareName.bind(null , this.projects.bind(this)));
    }

    directories()
    {
        return new Promise(r=>r(this._server.directories()));
    }

    projects(directory)
    {
        return new Promise(r=>{
            this.directories().then(directories=>{
               var d = directories.find(d=>directory == d.name())
               r(d ? d.projects() : [])
            })
        })
    }

    boreholes(directory, project)
    {
        return new Promise(r=>{
            this.projects(directory).then(projects=>{
               var p = projects.find(p=>project == p.name())
               r(p ? p.boreholes() : [])
            })
        })
    }

    logs(directory, project, borehole)
    {
        return new Promise(r=>{
            this.boreholes(directory, project).then(boreholes=>{
               var b = boreholes.find(b=>borehole == b.name())
               r(b ? b.logs() : [])
            })
        })
    }

    log(directory, project, borehole, log)
    {
        return new Promise(r=>{
            this.logs(directory, project, borehole).then(logs=>{
                var l = logs.find(l=>log == l.name())
            
               if(l)
               {
                    l.content().then(d=>r(d))
               }
               else
               {
                    r([]);
               }
            })
        })
    }

}

module.exports = REST;