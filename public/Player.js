define([], function () {
    function Player(startPos, colorValue) {
        var myPlayer;
        this.speed = 2;
        this.rotationSpeed = 0.05;

        this.x = startPos.x
        this.y = startPos.y

        this.angle = 0;

    }

    Player.prototype.CollisionManager = function() {
        isPixelWhite = true;
        var myCanvas = document.getElementsByClassName("whiteboard")[0];
        var context = myCanvas.getContext('2d');
        var imageData = context.getImageData(this.x - 5, this.y - 5, this.x + 5, this.y + 5);
        var index;
        for (index = 0; index < getImageData.data.length; index += 4) {
            if (imageData.data[index] != 255 || imageData.data[index + 1] != 255 || imageData.data[index + 2] != 255) {
                return true;
                console.log(isPixelWhite)
            }
        }

        return false;

    }

    Player.prototype.move = function () {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

    }

    Player.prototype.rotate = function (rotationDir) {
        this.angle += this.rotationSpeed * rotationDir
    }

    return Player;
});
