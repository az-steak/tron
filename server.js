const EXPRESS = require('express');
const APP     = EXPRESS();
const HTTP    = require('http').Server(APP);
const IO      = require('socket.io')(HTTP);

const RESOLUTION = {x:1920, y:1080};
const SPAWNS_COUNT = 20;

var gameMakingTimeout;

var playerNumber = 0;
var deadPlayers = 0;
var firstConnection = true;
var connectionAllowed = true;

var spawns = [];
var players = [];
generateSpawns();


IO.on('connection', onConnection);

function onConnection(socket) {
    if (!connectionAllowed){
        return;
    }
    playerNumber++;
    console.log("Connected");

    if (playerNumber==2 && firstConnection) {
        firstConnection = false;
        gameMakingTimeout = setTimeout(startGame, 5000);
    }

    socket.on('drawLine',function(data){
        IO.emit('drawLine', data);
    });

    socket.on('disconnect', onDisconnection);
    loadPlayers(socket);
    socket.on('spawned', savePlayer);
    socket.on('died', playerKilled)
    sendSpawn(socket);
}

function playerKilled () {
    deadPlayers++;
    checkEnd();
}

function checkEnd () {
    if (deadPlayers == playerNumber-1) {
        setTimeout(resetGame, 3000);
    }
}

function loadPlayers(socket){
    for(var i in players) {
        socket.emit('drawLine', players[i]);
    }
}

function savePlayer(data) {
    players.push(data);
}

function generateSpawns () {
    spawns = []
    for (var angle = 0; angle < Math.PI*2 ; angle += (Math.PI*2) / SPAWNS_COUNT) {
        var spawn = {
            x: RESOLUTION.x / 2 + (RESOLUTION.x * 0.3 * Math.cos(angle)),
            y: RESOLUTION.y / 2 + (RESOLUTION.y * 0.3 * Math.sin(angle)),
        };
        spawns.push(spawn);
    }
}

function sendSpawn(socket) {
    var data = {
        spawn: spawns.splice(parseInt(Math.random()*spawns.length),1)[0]
    }
    socket.emit('sendAvailableSpawn', data);
}

function onDisconnection() {
    playerNumber--;
    console.log("disconnection");

    if (playerNumber <= 0){
        console.log("no more players, game reset");
        resetGame();
    } else{
        checkEnd();
    }
}

function resetGame () {
    playerNumber = 0;
    deadPlayers  = 0;
    IO.emit("reset");
    generateSpawns();
    clearTimeout(gameMakingTimeout);
    firstConnection   = true;
    connectionAllowed = true;
    players = [];
}

function startGame(){
    // IO.off('connection');
    connectionAllowed = false;
    IO.emit('gameStart');
}


APP.use(EXPRESS.static('./public'));
HTTP.listen(3000);
console.log("server running");
