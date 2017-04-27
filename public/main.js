require(['Controller'], function (Controller) {

    var socket;
    var controller;
    var canvas;
    var context;

    socket = new io();
    controller = new Controller($('body'));

    canvas  = $(".whiteboard")[0];
    context = canvas.getContext('2d');


    /// Listeners

    setInterval(controllsCheck, 10);

    socket.on("drawLine",drawLine);

    function controllsCheck () {

    }

    function drawLine (data) {
        context.beginPath();

        context.arc(data.endPos[0], data.endPos[1], data.width, 0, 2 * Math.PI, false);
        context.fillStyle = data.color;
        context.fill();

        context.closePath();
    }

});
