
Array.prototype.RemoveAt = function(position){
	this.splice(position, 1);
};


Polygon = function(x, y, radius, sides, startAngle){
	this.x = x;
	this.y = y;
	this.r = radius;
	this.n = sides;
	this.alpha = startAngle;
	this.rotation_angle = startAngle;
	this.angleSpeed = 1;
	this.inverter = 1;

	this.connected_angles = false;

	this.rgb_r = 255;
	this.rgb_g = 255;
	this.rgb_b = 255;
	this.rgb_a = 0.9;
	this.Color = 'rgba('+this.rgb_r+','+this.rgb_g+','+this.rgb_b+','+this.rgb_a+')';

	this.Draw = function(ctx){
		this.Color = 'rgba('+this.rgb_r+','+this.rgb_g+','+this.rgb_b+','+this.rgb_a+')';
		ctx.fillStyle = this.Color;
		ctx.strokeStyle = this.Color;

		if (sides < 3){
			return;
		}
		var a = (Math.PI * 2)/this.n;
		ctx.save();
		ctx.beginPath();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation_angle * this.angleSpeed * this.inverter * Math.PI / 180);
		ctx.moveTo(this.r,0);

		for (var i = 1; i < sides; i++) {
			ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
		}
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	};

	this.Rotate = function(turn){
		if(this.connected_angles){
			this.rotation_angle +=  turn;
		}else{
			this.rotation_angle = this.alpha;
		}

		if (this.rotation_angle >= 360) this.rotation_angle = 0;
	}

	this.UpdateAlpha = function(turn){
		this.alpha +=  turn;
		if (this.alpha >= 360) this.alpha = 0;
	}


	this.checkBounds = function(width, height){
		if(this.x <= 0 + this.r || this.x >= width - this.r){
			this.alpha -=  2 * (this.alpha - 270);
			if(this.rotate_on_bounce){
				this.rotation_angle = this.alpha;
			}
		}

		if(this.y <= 0 + this.r || this.y >= height - this.r){
			this.alpha +=  2*(360 - this.alpha);
			if(this.rotate_on_bounce){
				this.rotation_angle = this.alpha;
			}
		}

		
	}

	this.checkAngle = function(){
		if(this.alpha >= 360){
			this.alpha -= 360
		}
		if(this.alpha < 0){
			this.alpha += 360
		}
	}
};

Collision = function(Enemies, Player){
	this.Enemies = Enemies;
	this.Player = Player;
	this.checkPlayer = function(){
		for(i = 0; i < Enemies.length; i++){
			if(this.Player.targateble){
				a = Math.pow(this.Player.x - this.Enemies[i].x, 2);
				b = Math.pow(this.Player.y - this.Enemies[i].y, 2);
				d = Math.sqrt(a + b);
				if(d - this.Player.size < this.Enemies[i].r){
					this.Player.death();
				}
			}
		}
	}

	this.checkProjectiles = function(){
		if(this.Player.weapon.Projectiles.length > 0){
			for(i = 0; i < this.Enemies.length; i++){
				for(j = 0; j < this.Player.weapon.Projectiles.length; j++){
					a = Math.pow(this.Player.weapon.Projectiles[j].x - this.Enemies[i].x, 2);
					b = Math.pow(this.Player.weapon.Projectiles[j].y - this.Enemies[i].y, 2);
					d = Math.sqrt(a + b);
					if(d - this.Player.weapon.projectile_size < this.Enemies[i].r){
						this.Enemies[i].toBeRemoved = true;
						this.Player.weapon.Projectiles.RemoveAt(j);
					}
				}
			}
		}
	}
};

Input = function(){
	this.space = false;
	this.left = false;
	this.right = false;
	this.up = false;
	this. down = false;
};

var input = new Input();

document.documentElement.onkeydown = function(e){
	var keycode;
	if(window.event){
		keycode = window.event.keyCode;
	}else if(e){
		keycode = e.which;
	}

	switch(keycode){
		case 32:
			input.space = true;
			break;
		case 37:
			input.left = true;
			break;
		case 38:
			input.up = true;

			break;
		case 39:
			input.right = true;
			break;
		case 40:
			input.down = true;
			break;
	}
};

document.documentElement.onkeyup = function(e){
	var keycode;
	if(window.event){
		keycode = window.event.keyCode;
	}else if(e){
		keycode = e.which;
	}

	switch(keycode){
		case 32:
			input.space = false;
			break;
		case 37:
			input.left = false;
			break;
		case 38:
			input.up = false;
			break;
		case 39:
			input.right = false;
			break;
		case 40:
			input.down = false;
			break;
	}
};
