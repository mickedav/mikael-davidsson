Enemy = function(x, y, width, height, angle, r, speed){

  if(r == undefined){
    this.r = 50;
  }else{
    this.r = r;
  }

  if(speed == undefined){
    this.speed = 1.3;
  }else{
    this.speed = speed;
  }

  this.x = x;
  this.y = y;

  this.width = width;
  this.height = height;

  this.xTest = 1;
  this.yTest = 1;
  this.n = 5;

  this.rotate_speed = 10;
  this.velocity = speed;
  this.angle = angle;

  this.toBeRemoved = false;
  if(this.x > this.width || this.x < 0){
    this.x = 100;
  }

  if(this.y > this.height || this.y < 0){
    this.y = 100;
  }
  this.enemyPoly = new Polygon(this.x, this.y, this.r, this.n, this.angle);

  this.Draw = function(ctx){
    this.enemyPoly.Draw(ctx);
  }

  this.Update = function(ctx){
    this.enemyPoly.checkAngle();
    this.updateAngle();
    this.r = this.enemyPoly.r;
    this.updatePosition();
    this.enemyPoly.checkBounds(this.width, this.height);
  }

  this.updatePosition = function(){
    if(this.velocity > 0){
      var scale_x = Math.cos((this.angle * Math.PI)/ 180);
      var scale_y = Math.sin((this.angle * Math.PI)/ 180);

      var velocity_x = this.velocity * scale_x;
      var velocity_y = this.velocity * scale_y;

      this.enemyPoly.x += velocity_x;
      this.enemyPoly.y += velocity_y;

      this.x += velocity_x;
      this.y += velocity_y;
    }
  }

  this.updateAngle = function(){
    this.enemyPoly.Rotate(-1);
    this.angle = this.enemyPoly.alpha;
  }


};
