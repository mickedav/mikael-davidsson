Player = function(name, screenWidth, screenHeight, size){

  this.width = screenWidth;
  this.height = screenHeight;

  this.start_location_x = this.width/2;
  this.start_location_y = this.height/2;

  this.x = this.start_location_x;
  this.y = this.start_location_y;

  this.death_timer = 2000;
  this.targateble = true;
  this.dead = false;
  this.gameOver = false;

  this.name = name;
  this.size = size;
  this.rotate_speed = 10;
  this.angle = 0;
  this.velocity = 0;
  this.acceleration = 0.5;
  this.MAX_VELOCITY = 10

  this.lifes = 5;

  this.blink_var = 0.9
  this.blink_inverter = -1;
  this.blink_speed = 0.1;

  this.default_nbrProjectiles = 1;
  this.default_projectileSpeed = this.MAX_VELOCITY + 4;
  this.default_projectileSize = 3;
  this.default_maxProjectiles = 100;
  this.default_fireRate = 200; //In milliseconds

  this.start_fireTimer = 0;
  this.current_fireTimer = 0;

  this.start_deathTimer = 0;
  this.current_deathTimer = 0;



  this.ship_back = new Polygon(this.x, this.y, this.size, 3, 0);
  this.ship_back.rotate_on_bounce = true;
  this.weapon = new Weapon(this.default_nbrProjectiles, this.default_projectileSpeed, this.default_projectileSize, this.default_maxProjectiles, this.width, this.height);

  this.Draw = function(ctx){
    this.ship_back.Draw(ctx);
    this.drawPlayerInfo(ctx);
  }

  this.Update = function(){
    this.checkInput();
    this.ship_back.checkBounds(this.width, this.height);
    this.ship_back.checkAngle();
    this.ship_back.Rotate();
    this.updateAngle();
    this.updatePosition();
    this.checkIfDead();
    this.checkIfTargateble();
    this.checkGameOver();
  }

  this.checkFireRate = function(){
    this.current_fireTimer = new Date().getTime();
    var timer = this.current_fireTimer - this.start_fireTimer;
    if(timer > this.default_fireRate){
      return true
    }else{
      return false
    }
  }

  this.updateAngle = function(){
    this.angle = this.ship_back.alpha;
  }

  this.death = function(){
    this.start_deathTimer = new Date().getTime();
    this.targateble = false;
    this.dead = true;
    this.resetPlayer();
    this.lifes--;
  }

  this.resetWeapons = function(){

  }

  this.resetPlayer = function(){
    this.x = this.start_location_x;
    this.y = this.start_location_y;

    this.ship_back.x = this.start_location_x;
    this.ship_back.y = this.start_location_y;

    this.velocity_x = 0;
    this.velocity_y = 0;

  }

// Update functions
  this.checkInput = function(){
    if(input.left){
      this.ship_back.UpdateAlpha(-this.rotate_speed);
    }

    if(input.right){
      this.ship_back.UpdateAlpha(this.rotate_speed);
    }

    if(input.up){
      if(this.velocity < this.MAX_VELOCITY){
        this.velocity += this.acceleration;
      }
    }else if(this.velocity > 0){
      this.velocity -= this.acceleration;
    }

    if(input.space){
      if(this.checkFireRate()){
        this.start_fireTimer = new Date().getTime();
        this.weapon.fire(this.x, this.y, this.angle);
      }
    }
  }

  this.updatePosition = function(){
    if(this.velocity > 0){
      var scale_x = Math.cos((this.angle * Math.PI)/ 180);
      var scale_y = Math.sin((this.angle * Math.PI)/ 180);

      var velocity_x = this.velocity * scale_x;
      var velocity_y = this.velocity * scale_y;

      this.ship_back.x += velocity_x;
      this.ship_back.y += velocity_y;

      this.x += velocity_x;
      this.y += velocity_y;
    }
  }

  this.checkIfDead = function(){
    if(this.dead)
    this.current_deathTimer = new Date().getTime();
    var timer = this.current_deathTimer - this.start_deathTimer;
    if(timer > this.death_timer){
      this.dead = false;
      this.targateble = true;
    }
  }

  this.checkIfTargateble = function(){

    if(!this.targateble){
      this.ship_back.rgb_r = 255;
      this.ship_back.rgb_g = 0;
      this.ship_back.rgb_b = 0;

      if(this.blink_var <= 0.4){
        this.blink_inverter = 1;
      }

      if(this.blink_var >= 1){
        this.blink_inverter = -1;
      }

      this.blink_var += this.blink_speed * this.blink_inverter;

      this.ship_back.rgb_a = this.blink_var ;

    }else {
      this.blink_var = 0.9;
      this.ship_back.rgb_a = this.blink_var;
      this.ship_back.rgb_r = 255;
      this.ship_back.rgb_g = 255;
      this.ship_back.rgb_b = 255;
    }
  }

  this.drawPlayerInfo = function(ctx){
    ctx.font = '15px Arial';
    ctx.fillText(this.name, 10, 20);

    for(i = 0; i < this.lifes; i++){
      ctx.font = '30px Arial';
      ctx.fillText('*', 10 + (i * 10), 50);
    }
  }

  this.checkGameOver = function(){
    if(this.lifes <= 0){
      this.gameOver = true;
    }
  }
};
