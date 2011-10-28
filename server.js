var http = require("http");
var url = require("url");
var faye = require('Faye 0.6.6/faye-node');

var positionx = 0;
var positiony = 0;

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

  var client = new faye.Client('http://localhost:8888/faye');
  var subscription = client.subscribe('/teste', function(message) {
    console.log("Receive " + message);
  });
  
}

function sendMsg(){
  var client = new faye.Client('http://localhost:8888/faye');

  client.publish('/teste', {
    postit_id: '';
    x: positionx,
    y: positiony
  });

  positiony = positiony + 1;
  positionx = positionx + 1;

  setTimeout(sendMsg, 10);
}

exports.start = start;