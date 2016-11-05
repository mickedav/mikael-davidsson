var canvas = document.getElementById("canvas");
var audio = document.getElementById("audio");
var ctx = canvas.getContext('2d');

var screenWidth = canvas.width;
var screenHeight = canvas.height;

ctx.fillstyle = "blue";
ctx.font="16px Arcade";
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

input.offset = new Vector2(GetLeft(canvas), GetTop(canvas));

//Game Init
var player = new Player();

player.SetPosition(player.offsetX);

var currentLevel = 0;

var level1 = new Level1(screenWidth, screenHeight);
var level2 = new Level2(screenWidth, screenHeight);
var lastLevel = new Last(screenWidth, screenHeight);

level1.Create(player);
level2.Create(player);
lastLevel.Create(player);

var levels = [level1, level2, lastLevel];

var level = levels[currentLevel];
level.collison = new Collision(level1, player);

var isInitialised = false;
function start(){
	if(!isInitialised){
		isInitialised = true;
		setInterval(function(){
			player.Update();
			level.levelCollison(player);
			level.levelClearCheck();

			if(!level.collison.CheckEnvironment()){
				player.jumpAvailable = false;
			}

			if(level.levelClear == true && currentLevel < levels.length){
				level.levelClear == false;
				delete levels[currentLevel];
				console.log('Loading next lvl')
				level = levels[currentLevel + 1];
				currentLevel++;
				player.resetPlayer();
			}
			//console.log(levels);
		}, 2);

		var Draw = setInterval(function(){
			ctx.save();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.translate((canvas.width/2) - player.offsetX, 0);

			level.Draw(ctx, player.rect.x);
			player.Draw(ctx);

			ctx.restore();

		}, 33);

	}



};
