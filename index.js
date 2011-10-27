require.paths.unshift(__dirname + "/vendor");//Adiciona o diretório vendor no começo do __dirname

var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/kanban'] = requestHandlers.kanban;

server.start(router.route, handle);