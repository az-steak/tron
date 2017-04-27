require(['Controller', 'Player'], function (Controller, Player) {

    var socket;
    var controller;
    var canvas;
    var context;
    var player;

    socket = new io();
    controller = new Controller($('body'));

    canvas  = $(".whiteboard")[0];
    context = canvas.getContext('2d');

    var randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    player = new Player({x: 500, y: 500}, randomColor, context);

    /// Listeners


    socket.on("gameStart", startGame)
    socket.on("drawLine",drawLine);
    socket.emit("drawLine",{
        x: player.x,
        y: player.y,
        width: 10,
        color: player.color
    });
    console.log("Waitings!");


    function startGame () {
        console.log("start!");
        setInterval(gameLoop, 10);
    }

    function gameLoop () {
        controllsCheck();
        if(player.isColliding()){kill()};
    }

    function controllsCheck () {
        if (controller.keys[37]) { // left arrow
            player.rotate(-1);
        } else if (controller.keys[39]) { // right arrow
            player.rotate(1);
        }
        player.move();

        // console.log(player.Pos);
        var data = {
            x: player.x,
            y: player.y,
            width: 10,
            color: player.color
        }
        socket.emit('drawLine', data);
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

    function kill(){
        console.log("You Dieded")
    }
});
