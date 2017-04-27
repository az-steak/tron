function Player(startPos, colorValue){
    var myPlayer;
    var speed = 10;
    this.Pos = {
        x: startPos.x,
        y: startPos.y
    }

    this.angle = 0;

    
}

Player.prototype.move = function(){
    this.x += Math.cos(this.angle) * speed;
    this.y += Math.sin(this.angle) * speed;
    
}

Player.prototype.rotate = function(angle, rotationSpeed){
    angle += 
}
    

return Player();