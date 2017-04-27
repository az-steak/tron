

var socket;
var controller;

function main () {
    socket = new io();
    controller = new Controller($('.whiteboard'));

}


main();
