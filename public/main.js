require(['Controller'], function (Controller) {

    var socket;
    var controller;

    socket = new io();
    controller = new Controller($('body'));
    setInterval(controllsCheck, 10);


    function controllsCheck () {
        
    }

});
