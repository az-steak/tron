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

    player = new Player({x: 500, y: 500}, 'red');

    /// Listeners

    setInterval(controllsCheck, 10);


    socket.on("drawLine",drawLine);

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
            color: 'red'
        }
        drawLine(data);
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

});
