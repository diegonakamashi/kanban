var http = require("http");
var url = require("url");
var faye = require('Faye 0.6.6/faye-node');

var FAYE_PATH = '/faye_channel';
var FAYE_PATH_UPDATE = '/faye_channel_update';

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+ postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });

  }

  bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
  });
  

  server = http.createServer(onRequest);
  bayeux.attach(server);
  
  server.listen(8888);
  console.log("Server has started.");

  var client = bayeux.getClient();
  client.subscribe(FAYE_PATH, function(message) {
    console.log("Server -- Receive message ");
    client.publish(FAYE_PATH_UPDATE, message);
  }).callback(function() {
  console.log('Subscription is now active!');
}); 
  
}


exports.start = start;