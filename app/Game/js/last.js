Last = function(screenWidth, screenHight, framework){

	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;
	this.black = new Color(0,0,0,1);
	this.red = new Color(255,0,0,1);
	this.floor = new Array();

	this.backgroundOffset = 500
	this.groundImg = new Image()
	this.bgImg = new Image();

	this.test = new Audio("Game/res/coin.wav")
	this.groundImg.src = "Game/img/groundFactory.png";

	this.signImg = new Image()
	this.signImg.src = "Game/img/info.png";

	this.bgImg = new Image()
	this.bgImg.src = "Game/img/lastbg.jpg";


	this.bgImg2 = new Image()
	this.bgImg2.src = "Game/img/clouds.png";

	this.dialogSize = 0;

	this.levelLimitRight = 2700;



	this.flash = 0;
	this.inverter = 1;
	this.name = "Level X";
	this.signInfo =['Welcome to the Level X!', 'This is the "last" level.', 'What will happen on ', 'this level has not yet', 'been decided.'];

	this.groundLvl = this.screenHeight - 43;

	this.Draw = function(ctx, pos){
		this.red.a = this.flash;
		ctx.lineWidth = 3;
		this.drawBackground(ctx, pos);
		this.drawFloor(ctx, pos);
		this.drawPictures(ctx, pos);
		this.drawStatusWindow(ctx, pos);

		if(this.infoPoint.Intersects(player.rect) && this.dialogSize < 10){
			this.dialogSize += 2
		}

		if(this.dialogSize > 0 && this.infoPoint.Intersects(player.rect) == false){
			this.dialogSize -= 2
		}

		if(this.dialogSize > 0){
			drawInfoSign(ctx, pos);
		}

	};

	this.Create = function(player){
		this.collison = new Collision(this, player);
		this.floor.push(new Rectangle(-this.screenHeight , this.groundLvl, 3600 ,20));
		this.infoPoint = new Rectangle(600,  this.screenHeight - 43 - 50, 40, 50);
		var rand = 0;
	};

//ADD spacebar Action here, dependent on lvl
	this.spacebarAction = function(player){

	};

	this.levelClearCheck = function(){

	};

	this.levelCollison = function(player){

	};

	//DRAW METHODS
	this.drawBackground = function(ctx, pos){
		ctx.drawImage(this.bgImg, - this.backgroundOffset + pos/1.09, 0)
		ctx.drawImage(this.bgImg, - this.backgroundOffset + this.bgImg.width + pos/1.09, 0)
		ctx.drawImage(this.bgImg2, - this.backgroundOffset + pos/1.16, 0)
		ctx.drawImage(this.bgImg2, - this.backgroundOffset + this.bgImg.width + pos/1.16, 0)
	};

	this.drawFloor = function(ctx, pos){
		for(var i = 0; i < this.floor[0].width/this.groundImg.width; i++){
			ctx.drawImage(this.groundImg, this.floor[0].x + i*this.groundImg.width, this.floor[0].y);
		}
	};

	this.drawStatusWindow = function(ctx, pos){
		var borderWidth = 4;
		ctx.fillStyle = "#ffffff";
		ctx.fillRect((-this.screenWidth/2) + 10 + pos - (borderWidth/2), 10 - (borderWidth/2), 170 + borderWidth,102 + borderWidth);
		ctx.fillStyle = "#000000"
		ctx.fillRect((-this.screenWidth/2) + 10 + pos, 10,170,100);
		ctx.fillStyle = "#ffffff";
		ctx.fillText(this.name, -this.screenWidth/2 + 20 + pos, 35);
		ctx.fillText('Objective: ', -this.screenWidth/2 + 20 + pos, 55);
		ctx.fillText('Unknown', -this.screenWidth/2 + 20 + pos, 75)
	}

	this.drawPictures = function(ctx, pos){
		ctx.drawImage(this.signImg, this.infoPoint.x - 5, this.infoPoint.y)
	};

	this.drawBorders = function(ctx, pos){

	};

};
