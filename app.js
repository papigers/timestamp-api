var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendfile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/:time', function(req, res){
  var time = req.params.time;
  var date = undefined;
  
  if(isNaN(time))
    date = new Date(time);
  else
    date = new Date(time*1000);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var nat = !isNaN(date.getTime()) ? months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() : null;
  var obj = {
    "unix": !isNaN(date.getTime()) ? date.getTime()/1000 : null,
    "natural": nat
  };
  res.json(obj);
});     

var port = 3000;
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
console.log("Server listening on port: ", port);
