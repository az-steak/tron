const EXPRESS = require('express');
const APP     = EXPRESS();
const HTTP    = require('http').Server(APP);
const IO      = require('socket.io')(HTTP);


IO.on('connection', onConnection)

function onConnection(socket) {
}


APP.use(EXPRESS.static('./public'));
HTTP.listen(3000);
console.log("server running");
