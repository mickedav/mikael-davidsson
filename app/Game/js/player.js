
Player = function(){

	this.offsetX = 0;
	this.offsetY = 0;
	this.rect = new Rectangle(0, 300, 12, 50);
	//this.rect.color = new Color(0, 0, 0, 1);
	this.speed = 1.2;
	this.gravity = 1.1;

	this.animation = new Animation(64, 64, 0, 0, 36, "Game/img/walk.png", 12, 4, 9);

	this.moving = false;
	this.jumping = false;
	this.jumpAvailable = false;
	this.JUMP_MAX = 3.5;
	this.jumpVelocity = 0;
	this.points = 0;
	this.jumpSpeed = 0.065;


	this.SetPosition = function(x, y, mod){

		if(mod == null || !mod){
			if(x != null){
				this.rect.x = x + this.offsetX;
			}
			if(y != null){
				this.rect.y = y;
			}
		}else{
			if(x != null){
				this.rect.x = this.rect.x + x + this.offsetX;
			}
			if (y != null) {
				this.rect.y += y;
			}
		}
	};

	this.Update = function(){
		var previousPosition = new Vector2(player.x + this.offsetX, player.y);

		this.moving = false;

		if(input.left && this.rect.x > -200){
			this.animation.SetRow(1);
			this.rect.x -= this.speed;
			this.moving = true;
		}else if(input.right && this.rect.x < level.levelLimitRight){
			this.animation.SetRow(3);
			this.rect.x += this.speed;
			this.moving = true;
		}else{
			this.animation.SetRow(2);
		}

		if(input.up){
			this.Jump();
		}

		if(input.space){
			level.spacebarAction(this);
		}

		if(this.jumping){

			this.rect.y -= this.jumpVelocity;
			this.jumpVelocity -= this.jumpSpeed;

			if(this.jumpVelocity <= 0){
				this.jumping = false;
				this.jumpAvailable = true;
			}
		}else{
			this.rect.y += this.gravity;
		}


		this.animation.position.Set(this.rect.x , this.rect.y);
		this.offsetX = this.rect.x;

		if(this.moving){
			this.animation.Update();
		}else{
			this.animation.SetColumn(0)
		}


	};

	this.Jump = function(){
		if(this.jumpAvailable){
			this.jumpVelocity = this.JUMP_MAX;
			this.jumping = true;
		}
	};

	this.Draw = function(ctx){
		this.animation.Draw(ctx);
	};

	this.resetPlayer = function(){
		this.offsetX = 0;
		this.offsetY = 200;
		this.SetPosition(0,0);
		this.speed = 1.2;
		this.gravity = 1.1;
	}
};
