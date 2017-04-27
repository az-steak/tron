define([], function () {

    const BOOST_DISTANCE = 3;

    function Player(startPos, colorValue, context) {
        var myPlayer;
        this.normalSpeed = 2
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


        var targetFront = {
            x: this.x + Math.cos(this.angle) * this.radius * 1.4,
            y: this.y + Math.sin(this.angle) * this.radius * 1.4
        };
        var imageDataFront = this.context.getImageData(targetFront.x, targetFront.y, 1, 1);

        var targetLeft = {
            x: this.x + Math.cos(this.angle + Math.PI*0.5) * this.radius * BOOST_DISTANCE,
            y: this.y + Math.sin(this.angle + Math.PI*0.5) * this.radius * BOOST_DISTANCE
        };
        var imageDataLeft = this.context.getImageData(targetLeft.x, targetLeft.y, 1, 1);
        var targetRight = {
            x: this.x + Math.cos(this.angle - Math.PI*0.5) * this.radius * BOOST_DISTANCE,
            y: this.y + Math.sin(this.angle - Math.PI*0.5) * this.radius * BOOST_DISTANCE
        };
        var imageDataRight = this.context.getImageData(targetRight.x, targetRight.y, 1, 1);

        if (isHittingTrail(imageDataFront)) {
            return true;
        }

        if (isHittingTrail(imageDataRight) || isHittingTrail(imageDataLeft)) {
            this.speed *= 1.02;
        } else if(this.speed > this.normalSpeed){
            this.speed *= 0.98;
        }


        return false;
    }

    function isHittingTrail (imageData) {
        for (var index = 0; index < imageData.data.length; index += 4) {
            if (imageData.data[index] != 0 || imageData.data[index + 1] != 0 || imageData.data[index + 2] != 0) {
                return true;
            }
        }
    }

    Player.prototype.move = function () {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

    }

    Player.prototype.rotate = function (rotationDir) {
        this.angle += Math.PI * 0.5 * rotationDir;
    }

    return Player;
});
