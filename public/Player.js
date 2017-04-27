define([], function () {
    function Player(startPos, colorValue) {
        var myPlayer;
        this.speed = 2;
        this.rotationSpeed = 0.05;

        this.x = startPos.x
        this.y = startPos.y

        this.angle = 0;
        this.color = colorValue;


    }
    /*
    function canvasId(){
        var myCanvas    = document.getElementsByClassName("whiteboard");
        var context     = myCanvas.getContext('2d');
        var imageData   = context.getImageData(x, y, myCanvas.width, myCanvas.height);
        if(imageData.data[index] == 255 && imageData.data[index + 1] == 255 && imageData.data[index + 2] == 255){}

    }

    Player.prototype.collisionManager = function(acutalPos) {
        if(actualPos.x && actualPos.y )
    }*/

    Player.prototype.move = function () {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

    }

    Player.prototype.rotate = function (rotationDir) {
        this.angle += this.rotationSpeed * rotationDir
    }

    return Player;
});
