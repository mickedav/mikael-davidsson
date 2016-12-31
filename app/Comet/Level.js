Level = function(difficulty, width, height){

  this.width = width;
  this.height = height;
  this.difficulty = difficulty;
  this.Enemies = [];

  this.first_x = 100;
  this.first_y = 100;

  this.zoneWidth = 100;
  this.zoneHeight = 100;
  this.numberAdded = 0;

  this.generateEnemies = function(){
    var number_added = 0;
    var current_row = 1;
    for(i = 0; i < this.difficulty; i++){
      if(number_added > 4){
        current_row++;
        number_added = 0;
      }
      var newEnemy = new Enemy(this.first_x + (i * this.zoneWidth), this.first_y + (this.zoneHeight * current_row), this.width, this.height, this.randomAngle(), 40, this.randomSpeed())
      this.Enemies.push(newEnemy);
    }
  }

  this.Update = function(){
    for(i = 0; i < this.Enemies.length; i++){
      this.Enemies[i].Update();

    }

    for(i = 0; i < this.Enemies.length; i++){
      if(this.Enemies[i].toBeRemoved == true){
        var currentSize = this.Enemies[i].enemyPoly.r;
        var currentSpeed = this.Enemies[i].speed;
        if(currentSize > 10){
          var currentX = this.Enemies[i].enemyPoly.x;
          var currentY = this.Enemies[i].enemyPoly.y;
          var seperation = 50;
          this.Enemies.RemoveAt(i);

          var newEnemy1 = new Enemy(currentX - seperation, currentY, this.width, this.height, this.randomAngle(), currentSize - 10, currentSpeed + 1)
          var newEnemy2 = new Enemy(currentX, currentY - seperation, this.width, this.height, this.randomAngle(), currentSize - 10, currentSpeed + 1)

          this.Enemies.push(newEnemy1);
          this.Enemies.push(newEnemy2);

        }else{
          this.Enemies.RemoveAt(i);
        }
      }
    }
    this.checkLevelClear();
  }

  this.Draw = function(ctx){
    for(i = 0; i < this.Enemies.length; i++){
      this.Enemies[i].Draw(ctx);
    }
    this.drawLevelInfo(ctx);
  }

  this.checkLevelClear = function(){
    if(this.Enemies.length <= 0){
      this.difficulty++;
      this.generateEnemies();
    }
  }

  this.drawLevelInfo = function(ctx){
    ctx.font = '20px Arial';
    ctx.fillText('Level: ', this.width/2 - 40,  30)
    ctx.fillText(this.difficulty, this.width/2 + 20,  31);
  }
  this.resetLevel = function(){
    this.Enemies = [];
    this.difficulty = 1;
    this.generateEnemies();
  }

  this.randomAngle = function(){
    return Math.random() * 360;
  }

  this.randomSpeed = function(){
    return Math.random() * 10;
  }

}
