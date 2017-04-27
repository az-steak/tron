define([], function () {
    function Player(startPos, colorValue, context) {
        var myPlayer;
        this.speed = 2;
        this.rotationSpeed = 0.05;
        this.context = context;

        this.x = startPos.x
        this.y = startPos.y

        this.angle = 0;
        this.color = colorValue;

    }

    Player.prototype.isColliding = function() {
        isPixelWhite = true;
       var imageData = this.context.getImageData();
        var index;

        console.log(this.context);
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
