Weapon = function(nbr_projectiles, projectile_speed, projectile_size, max_projectiles, width, height){
  this.width = width;
  this.height = height;

  this.nbr_projectiles = nbr_projectiles;
  this.projectile_speed = projectile_speed;
  this.projectile_size = projectile_size;
  this.max_projectiles = max_projectiles;
  this.active_projectiles = 0;

  this.Projectiles = [];
  this.toBeremoved = [];

  this.fire = function(x, y, projectile_angle){
    if(this.Projectiles.length <= this.max_projectiles){
      var new_projectile = new Polygon(x, y, this.projectile_size, 7, projectile_angle);
      this.Projectiles.push(new_projectile);
    }
  }

  this.Update = function(){
    this.updatePosition();
    this.checkProjectiles();
  }

  this.updatePosition = function(){
    for(i = 0; i < this.Projectiles.length; i++){

      var scale_x = Math.cos((this.Projectiles[i].alpha * Math.PI)/ 180);
      var scale_y = Math.sin((this.Projectiles[i].alpha * Math.PI)/ 180);

      var velocity_x = this.projectile_speed * scale_x;
      var velocity_y = this.projectile_speed * scale_y;

      this.Projectiles[i].x += velocity_x;
      this.Projectiles[i].y += velocity_y;

      if(this.Projectiles[i].x < 0 || this.Projectiles[i].x > this.width || this.Projectiles[i].y < 0 || this.Projectiles[i].y > this.height){
        this.Projectiles.RemoveAt(i);
      }

    }
  }

  this.checkProjectiles = function(){

  }

  this.Draw = function(ctx){
    if(this.Projectiles.length > 0){
      for(i = 0; i < this.Projectiles.length; i++){
        this.Projectiles[i].Draw(ctx);
      }
    }
  }

};
