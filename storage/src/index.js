var Server = require('./Server');

var args = process.argv.slice(2);
var config = {}

if(args.length != 1) die();

config = require(args[0])

var server = new Server(config);
server.start();