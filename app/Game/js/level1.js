Level1 = function(screenWidth, screenHight, framework){

	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;
	this.black = new Color(0,0,0,1);
	this.red = new Color(255,0,0,1);
	this.floor = new Array();
	this.pickUps = new Array();
	this.backgroundOffset = 500
	this.groundImg = new Image()
	this.bgImg = new Image();
	this.levelLimitRight = 2700;

	this.points = 0;
	this.test = new Audio("Game/res/coin.wav")

	this.bgImg.src = "Game/img/forestbg.gif"
	this.groundImg.src = "Game/img/ground.png";

	this.logImg = new Image()
	this.logImg.src = "Game/img/log.png";
	this.signImg = new Image()
	this.signImg.src = "Game/img/info.png";
	this.millImg = new Image()
	this.millImg.src = "Game/img/saw2.png";
	this.toDeliver = 15;
	this.dialogSize = 0;

	this.deliveryPoint = new Rectangle(1800 + 519, this.screenHeight - 43 - 50, 90, 50);
	this.infoPoint = new Rectangle(100,  this.screenHeight - 43 - 50, 40, 50);

	//this.groundLvl - this.signImg.height + 6

	this.flash = 0;
	this.inverter = 1;
	this.name = "Level 1";
	this.signInfo =['Welcome to level 1!', 'On this level you are ', 'working at a saw mill.', 'Pick up logs and', 'deliver them to the ', 'sawmill to the far right.', 'Use the space bar', 'to make the delivery.']
	this.levelClear = false;

	this.groundLvl = this.screenHeight - 43;

 	this.Draw = function(ctx, pos){
		this.red.a = this.flash;
		ctx.lineWidth = 3;

		this.drawBackground(ctx, pos);
		this.drawSkyFloor(ctx, pos);
		this.drawPickups(ctx, pos);
		this.drawFloor(ctx, pos);
		this.drawPictures(ctx, pos);
		this.drawBorders(ctx, pos);
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
		var rand = 0;
		this.deliveryPoint.color = this.red;

		for(var i = 0; i < 7; i++){
			rand = Math.random() * 70;
			var test = Math.pow(-1,i);

			this.floor.push(new Rectangle((400 + test*171/2 + (35*test) ), 740 - 65 - (i*80), 171 ,2));
			this.pickUps.push(new Rectangle((400 + test*171/2 + (35*test) + rand*test) + 171/2, 740 - 58 - (i*80) - 30, 50 ,20));
		}

		for(var i = 0; i < 7; i++){
			rand = Math.random() * 6;
			var test = Math.pow(-1,i);
			this.floor.push(new Rectangle((this.screenHeight  + test*171/2 + (35*rand) ), 740 - 65 - (i*80), 171 ,2));
			this.pickUps.push(new Rectangle((this.screenHeight  + test*171/2 + (35*rand) + rand) + 171/2, 740 - 58 - (i*80) - 30, 50 ,20));
		}
			for(var i = 0; i < 7; i++){
			rand = Math.random() * 4;
			var test = Math.pow(-1,i);
			this.floor.push(new Rectangle((1200 + test*171/2 + (35*rand) ), 740 - 65 - (i*80), 171 ,2));
			this.pickUps.push(new Rectangle((1200 + test*171/2 + (35*rand) + rand) + 171/2, 740 - 58 - (i*80) - 30, 50 ,20));
		}


		for(var i = 0; i < this.floor.length; i++){
			this.floor[i].color = this.black;
		}
		for(var i = 0; i < this.pickUps.length; i++){
			this.pickUps[i].color = this.red;
		}
	};

//ADD spacebar Action here, dependent on lvl
	this.spacebarAction = function(player){

		if (this.deliveryPoint.Intersects(player.rect)){
			this.toDeliver -= this.points;
			this.points = 0;
		}
	};

	this.levelClearCheck = function(){
		if(this.toDeliver <= 0){
			this.levelClear = true;
		}

	};

	this.levelCollison = function(player){
		for(var i = 0; i < this.pickUps.length; i++){
			if(this.pickUps[i].Intersects(player.rect)){
				this.pickUps.RemoveAt(i);

				this.test.pause();
				this.test.currentTime = 0;
				this.test.play();

				this.points++;
			}
		}

	};

	//DRAW METHODS
	this.drawBackground = function(ctx, pos){
		ctx.drawImage(this.bgImg, - this.backgroundOffset + pos/1.09, -200)
		ctx.drawImage(this.bgImg, - this.backgroundOffset + this.bgImg.width + pos/1.09, -200)
	};

	this.drawSkyFloor = function(ctx, pos){
		for(var i = 1; i < this.floor.length; i++){
			if(this.floor[i].x < pos + this.screenWidth/2 + 172&& this.floor[i].x > pos - this.screenWidth/2 - 172){
				ctx.drawImage(this.groundImg, this.floor[i].x , this.floor[i].y);
			}
		}
	};

	this.drawPickups = function(ctx, pos){
		for(var i = 0; i < this.pickUps.length; i++){
			if(this.pickUps[i].x < pos + this.screenWidth/2 + 172 && this.pickUps[i].x > pos - this.screenWidth/2 - 172){
				ctx.drawImage(this.logImg, this.pickUps[i].x , this.pickUps[i].y);
			}
		}
	};

	this.drawFloor = function(ctx, pos){
		for(var i = 0; i < this.floor[0].width/this.groundImg.width; i++){
			ctx.drawImage(this.groundImg, this.floor[0].x + i*this.groundImg.width, this.floor[0].y);
		}
	};

	this.drawStatusWindow = function(ctx, pos){
		var borderWidth = 4;
		ctx.fillStyle = "#ffffff"
		ctx.fillRect((-this.screenWidth/2) + 10 + pos - (borderWidth/2), 10 - (borderWidth/2), 170 + borderWidth,102 + borderWidth);
		ctx.fillStyle = "#000000"
		ctx.fillRect((-this.screenWidth/2) + 10 + pos, 10,170,100);
		ctx.fillStyle = "#ffffff"
		ctx.fillText(this.name, -this.screenWidth/2 + 20 + pos, 35)
		ctx.fillText('Logs: '+ this.points, -this.screenWidth/2 + 20 + pos, 55)
	}

	this.drawPictures = function(ctx, pos){
		var text = 'Logs to deliver: '
		ctx.drawImage(this.millImg, 1800, this.groundLvl - this.millImg.height + 6);
		ctx.fillText(text, 2070, this.groundLvl - this.millImg.height + 6);
		ctx.fillText(this.toDeliver,2070 + 250, this.groundLvl - this.millImg.height + 6);
		ctx.drawImage(this.signImg, this.infoPoint.x - 5, this.infoPoint.y)
	};

	this.drawBorders = function(ctx, pos){
		this.deliveryPoint.DrawBoarder(ctx);

		if(this.flash > 0.95){
			this.inverter = -1;
		}else if(this.flash < 0.005){
			this.inverter = 1;
		}

		this.flash += 0.05*this.inverter;
	};



};
