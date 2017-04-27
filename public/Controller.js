define([], function () {

    function Controller (surface) {
        this.keys = {};

        var instance = this;
        surface.on('keydown', function(event){ instance.onKeyDown(event) });
        surface.on('keyup', function(event){ instance.onKeyUp(event) });

    }

    Controller.prototype.onKeyDown = function (event) {
        // THIS IS SPARTAAAA;
        this.keys[event.keyCode] = true;
    }

    Controller.prototype.onKeyUp = function (event) {
        this.keys[event.keyCode] = false;
    }


    return Controller;
});
