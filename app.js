var static = require('node-static'),
	http = require('http'),
	util = require('util'),
	url = require('url'),
	fs = require('fs');

// create static server for decks
var fileServer = new static.Server('./public');

var server = http.createServer(function (req, res) {

	var pathname = url.parse(req.url).pathname;
	console.log('pathname: '+pathname);

	req.addListener('end', function () {
		fileServer.serve(req, res);
	});

}).listen(8080, function() {
    console.log('Listening at: http://localhost:8080');
});


var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){

	socket.on('message', function(message){
		socket.broadcast.emit('message', message);
	});

	socket.on('disconnect', function(){
		console.log("Connection " + socket.id + " terminated.");
	});

});
 