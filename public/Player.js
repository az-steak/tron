define([], function () {
    function Player(startPos, colorValue) {
        var myPlayer;
        var speed = 10;


        this.Pos = {
            x: startPos.x,
            y: startPos.y
        }

        this.angle = 0;


    }
    /*function canvasId(){
        var myCanvas = document.getElementsByClassName("whiteboard");
        var context = myCanvas.getContext('2d');
        var imageData = context.getImageData(x, y, myCanvas.width, myCanvas.height);
        var index;
        for(index = 0; index < imageData.data.length; index += 4){
    
        }
    }
    
    Player.prototype.collisionManager = function(acutalPos) {
        if(actualPos.x && actualPos.y )
    }*/

    Player.prototype.move = function () {
        this.x += Math.cos(this.angle) * speed;
        this.y += Math.sin(this.angle) * speed;

    }

    Player.prototype.rotate = function (angle, rotationSpeed, inputRotation) {
        this.angle += rotationSpeed * inputRotation
    }

    return Player();
});
