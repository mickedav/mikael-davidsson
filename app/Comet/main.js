var canvas = document.getElementById("canvas");
var audio = document.getElementById("audio");
var ctx = canvas.getContext('2d');


var screenWidth = canvas.width;
var screenHeight = canvas.height;

ctx.font="16px Arcade";

console.log(ctx.font);
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";

//INIT
var player;
var collision;
var level;
var game;

var init = function () {
	player = new Player('Lives', screenWidth, screenHeight, 15);
	level = new Level(1, screenWidth, screenHeight);
	level.generateEnemies();
	collision = new Collision(level.Enemies, player)
}


init();


function start() {
	console.log(game);
	if (!game) {
		game = setInterval(function () {
			ctx.save();
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			collision.checkPlayer();
			collision.checkProjectiles();

			level.Update();
			level.Draw(ctx);

			player.Update();
			player.Draw(ctx);

			player.weapon.Update();
			player.weapon.Draw(ctx);

			player.Draw
			ctx.restore();

			if (player.gameOver) {
				clearInterval(game);
				game = null;
				init();
				start();
			}
		}, 33);
	}
}