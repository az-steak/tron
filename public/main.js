require(['Controller', 'Player'], function (Controller, Player) {

    const RESOLUTION = {width:1920, height:1080}
    const BORDER_SIZE= 30;

    var socket;
    var controller;
    var canvas;
    var context;
    var player;
    var gameLoopInterval;

    socket = new io();
    controller = new Controller($('body'));

    canvas  = $(".whiteboard")[0];
    context = canvas.getContext('2d');


    /// Listeners


    socket.on("sendAvailableSpawn", spawn);
    socket.on("gameStart", startGame);
    socket.on("drawLine", drawLine);
    socket.on("reset", reset);

    // $("body").on('keydown',function(event){
    //     if(event.keyCode == 37){
    //         player.rotate(-1);
    //     } else if(event.keyCode == 39) {
    //         player.rotate(1);
    //     }
    // })


    function spawn (data) {
        drawBorder();
        // clearCanvas();
        var randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        player = new Player({x: data.spawn.x, y: data.spawn.y}, randomColor, context);

        var data = {
            x: player.x,
            y: player.y,
            width: player.radius,
            color: player.color
        };
        drawCircle();

        socket.emit("drawLine",data);
        socket.emit("spawned", data);

        console.log("Waitings!");
    }

    function startGame () {
        console.log("start!");
        clearCanvas();
        gameLoopInterval = setInterval(gameLoop, 10);
    }

    function gameLoop () {
        controllsCheck(); // smooth controls

        player.move();
        if(player.isColliding()){kill()};
        var data = {
            x: player.x,
            y: player.y,
            width: player.radius,
            color: player.color
        }
        socket.emit('drawLine', data);
    }

    function controllsCheck () {
        if (controller.keys[37]) { // left arrow
            player.rotate(-1);
        } else if (controller.keys[39]) { // right arrow
            player.rotate(1);
        }
    }

    function drawLine (data) {

        context.beginPath();
        context.arc(data.x-1, data.y-1, data.width, 0, 2 * Math.PI, false);
        context.fillStyle = data.color;
        context.fill();
        context.closePath();

        context.beginPath();
        context.arc(data.x, data.y, data.width / 2, 0, 2 * Math.PI, false);
        context.fillStyle = 'blue';
        context.fill();
        context.closePath();
    }
    function drawCircle () {
        context.beginPath();
        context.arc(player.x, player.y, player.radius * 2, 0, 2 * Math.PI, false);
        context.lineWidth = 5;
        context.strokeStyle = player.color;
        context.stroke();
        context.closePath();
    }
    function drawBorder() {
        context.fillStyle = "#111";
        context.fillRect(0, 0, RESOLUTION.width, BORDER_SIZE); // upBorder
        context.fillRect(0, RESOLUTION.height - BORDER_SIZE, RESOLUTION.width, RESOLUTION.height); // downBorder
        context.fillRect(0, 0, BORDER_SIZE, RESOLUTION.height); // leftBorder
        context.fillRect(RESOLUTION.width - BORDER_SIZE, 0, RESOLUTION.width + BORDER_SIZE, RESOLUTION.height); // rightBorder
    }
    function clearCanvas() {
        context.clearRect(0, 0, 1920, 1080);
        drawBorder();
    }

    function reset () {
        location.reload();
    }

    function kill(){
        socket.emit('died');
        clearInterval(gameLoopInterval);
    }
});
