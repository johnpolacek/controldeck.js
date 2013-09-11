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
	}).resume();

}).listen(process.env.PORT || 8080, function() {
    console.log('Listening at: http://localhost:' + (process.env.PORT || 8080));
});


var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){

	socket.on('message', function(message){
		socket.broadcast.emit('message', message);
	});

	socket.on('key down', function(data){
		socket.broadcast.emit('key down', data);
	});

	socket.on('key up', function(data){
		socket.broadcast.emit('key up', data);
	});

	socket.on('flowtime minimap complete', function(data){
		socket.broadcast.emit('flowtime minimap complete', data);
	});

	socket.on('navigate', function(data){
		socket.broadcast.emit('navigate', data);
	});

	socket.on('disconnect', function(){
		console.log("Connection " + socket.id + " terminated.");
	});

});
 
