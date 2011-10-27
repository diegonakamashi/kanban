var http = require("http");
var url = require("url");
var faye = require('Faye 0.6.6/faye-node');

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

  var client = new faye.Client('http://localhost:8888/faye');

  client.publish('/email/new', {
  text:       'New email has arrived!',
  inboxSize:  34
});

  server = http.createServer(onRequest);
  bayeux.attach(server);
  server.listen(8888);
  console.log("Server has started.");
}

exports.start = start;