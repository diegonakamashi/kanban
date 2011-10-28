var exec = require("child_process").exec;
var fs = require('fs');

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.write("You've sent " + postData );
  response.end();
}

function kanban(response, postData){
  console.log("Request Handler 'kanban' was called");  

  fs.readFile('public/html/kanban.html', function(error, content){
    if(error){
      response.writeHead(404, {"Content-Type": "text/plain"});      
      response.write("Página não encontrada " + content);
      response.end();
    }else{
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });  
}


exports.start = start;
exports.upload = upload;
exports.kanban = kanban;