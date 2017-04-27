define([], function () {
    function Player(startPos, colorValue, context) {
        var myPlayer;
        this.speed = 2;
        this.rotationSpeed = 0.05;
        this.context = context;

        this.x = startPos.x
        this.y = startPos.y
        this.radius = 10;

        this.angle = 0;
        this.color = colorValue;

    }

    Player.prototype.isColliding = function() {
        isPixelWhite = true;
<<<<<<< HEAD
        var imageData = this.context.getImageData(this.x, this.y,this.x +1, this.y + 1);
        var index;

        console.log(this.context);
        for (index = 0; index < imageData.data.length; index += 4) {
=======
       var imageData = this.context.getImageData();
        var index;

        console.log(this.context);
        for (index = 0; index < getImageData.data.length; index += 4) {
>>>>>>> e86b430bd197599635208abdb9c44c1527366b6c
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
