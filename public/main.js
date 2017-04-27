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
            player.rotate(1);
        } else if (controller.keys[39]) { // right arrow
            player.rotate(-1);
        }
    }

    function drawLine (data) {
        context.beginPath();

        context.arc(data.endPos[0], data.endPos[1], data.width, 0, 2 * Math.PI, false);
        context.fillStyle = data.color;
        context.fill();

        context.closePath();
    }

});
