const EXPRESS = require('express');
const APP     = EXPRESS();
const HTTP    = require('http').Server(APP);
const IO      = require('socket.io')(HTTP);

var gameMakingTimeout;

var playerNumber = 0;
var firstConnection = true;
var connectionAllowed = true;


IO.on('connection', onConnection);

function onConnection(socket) {
    if (firstConnection) {
        firstConnection = false;
        gameMakingTimeout = setTimeout(startGame, 10000);
    }
    if (!connectionAllowed){
        return;
    }

    playerNumber++;
    socket.on('drawLine',function(data){
        IO.emit('drawLine', data);
    });
    socket.on('disconnect', onDisconnection);
}
function onDisconnection() {
    playerNumber--;
    console.log("disconnection");

    if (playerNumber <= 0){
        console.log("no more players, game reset");
        clearTimeout(gameMakingTimeout);
        firstConnection = true;
        connectionAllowed = true;
    }
}

function startGame(){
    // IO.off('connection');
    connectionAllowed = false;
    IO.emit('gameStart');
}


APP.use(EXPRESS.static('./public'));
HTTP.listen(3000);
console.log("server running");
