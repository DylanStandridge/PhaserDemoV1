var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//variables to set up your score (starts at 0) and set up your health (starts at 3)
var score = 0;
var hp=3;
var enemycounter = 0;
gameover = true;
enemySpeeds= [.5, 1, 1.5, 2.5, 3];
var opp = [];
// variables used for sprites based on sprites.
var playerWidth=42, playerHeight=42, starcentx=13, starcenty=12;
// this is our preload. this will get called before it ever creates anything so it has references
// to the assets it will need. 
function preload() {
  //upload images to the game so the game knows they exist.
  // syntax:
  // game.load.image(Name, Location)
  
  game.load.image('square', 'assets/Images/square.png');
  game.load.image('firstaid', 'assets/Images/firstaid.png');
  game.load.image('star', 'assets/Images/star.png');
  game.load.image('enemy', 'assets/Images/enemy.png');

  cursors = game.input.keyboard.createCursorKeys();
}

// create function this gets called when we start the game to create startup assets. 
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //insert the pictures (Sprites) into our game object that we created upon startup.
  //assigns these object references into a variable for future reference.
  // syntax:
  // game.add.image(X coordinate, Y coordinate, Name of loaded Object)

  player = game.add.sprite(370, 270, 'square');
  hp1 = game.add.sprite(0, 0, 'firstaid');
  hp2 = game.add.sprite(20, 0, 'firstaid');
  hp3 = game.add.sprite(40, 0, 'firstaid');
	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.enableBody=true;
  player.body.collideWorldBounds = true;
  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
	  // this is a function call. this will call our star function so we can place the new objective.
  placeRandomStar();
  
  // This adds text to the game. THis will allow you to set up size, style, etc.
  gameText = game.add.text(700, 0, "0", {
          font: "28px Arial",
          fill: "#fff"
      });
	
      gameText.anchor.setTo(1, 0);

}


//this is the update function. this is where your game actually takes place
//the update is a loop meaning its continuously running until you make it stop (IE game over)
//notice this is constantly updating score, checking movement, and checking location
function update() {
  if (gameover){
      gameText.text = "Score: \t" + score;
      }
  else {
		player.kill()
        gameText.text= "Total Score:" + score;
		endText = game.add.text(350, 300, "0", {
					font: "28px Arial",
          fill: "#fff"
													})
				endText.text = "Game Over";
      }
      enemycounter++;
  game.physics.arcade.collide(player, star, collectStar);
  checkEnemyTime();
  movePlayer();
  moveEnemy();
}

// this is a function that adds an image to the game that is called star (defined in preload)
//it positions it at a random location based on Math.random
function placeRandomStar() {
      star = game.add.sprite(0, 0, 'star');
      game.physics.enable(star, Phaser.Physics.ARCADE);
      star.enableBody=true;
          star.position.x = Math.floor(Math.random() * 770);
          star.position.y = Math.floor(Math.random() * 570);
  }
function moveEnemy(){
  //move enemy based on players location
  for (i = 0; i < opp.length; i++){
        if ((player.position.x >= opp[i].position.x) && (player.position.y >= opp[i].position.y)){
    opp[i].position.x = opp[i].position.x + enemySpeeds[i]
    opp[i].position.y = opp[i].position.y + enemySpeeds[i]
      }
    else if ((player.position.x >= opp[i].position.x) && (player.position.y <= opp[i].position.y)){
    opp[i].position.x = opp[i].position.x + enemySpeeds[i]
    opp[i].position.y = opp[i].position.y - enemySpeeds[i]
      }
    else if ((player.position.x <= opp[i].position.x) && (player.position.y >= opp[i].position.y)){
    opp[i].position.x = opp[i].position.x - enemySpeeds[i]
    opp[i].position.y = opp[i].position.y + enemySpeeds[i]
      }
    else if ((player.position.x <= opp[i].position.x) && (player.position.y <= opp[i].position.y)){
    opp[i].position.x = opp[i].position.x - enemySpeeds[i]
    opp[i].position.y = opp[i].position.y - enemySpeeds[i]
      }
      game.physics.arcade.collide(player, opp[i], takeHP);
    }
}
    
  

function movePlayer(){
  if ((cursors.left.isDown && cursors.up.isDown))
  {
		direction = "upleft"
      //  Move to the left
      player.position.x = player.position.x - 3;
      player.position.y = player.position.y - 4;
  }
  else if ((cursors.left.isDown && cursors.down.isDown))
  {
		direction = "downleft"
      //  Move to the left
      player.position.x = player.position.x - 3;
      player.position.y = player.position.y + 4;
  }
  else if ((cursors.right.isDown && cursors.up.isDown))
  {
		direction = "upright"
      //  Move to the left
      player.position.x = player.position.x + 3;
      player.position.y = player.position.y - 4;
  }
  else if ((cursors.right.isDown && cursors.down.isDown))
  {
		direction = "downright"
      //  Move to the left
      player.position.x = player.position.x + 3;
      player.position.y = player.position.y + 4;
  }
  else if (cursors.left.isDown )
  {
		direction = "left"
      //  Move to the left
      player.position.x = player.position.x - 5;
  }
  else if (cursors.right.isDown )
  {
		direction = "right"
      //  Move to the right
       player.position.x = player.position.x + 5;
  }
  
  else if (cursors.up.isDown )
  {
		direction = "up"
      //  Move to the left
      player.position.y = player.position.y - 5;
  }
  else if (cursors.down.isDown)
  {
		direction = "down"
      //  Move to the right
       player.position.y = player.position.y + 5;
  }
	if (spaceKey.isDown){
		fire();
	}
}
function collectStar(){
            score++;
            star.destroy();
            placeRandomStar();
}
function checkEnemyTime(){
   if ((enemycounter==60) || (enemycounter==1800) || (enemycounter==3600) || (enemycounter==5400 || enemycounter==7200)){
      var randnum = Math.random() * 1400
      if (randnum > 800) {
        opp[opp.length] = game.add.sprite( 0, randnum - 800, 'enemy')
        game.physics.enable(opp[opp.length - 1], Phaser.Physics.ARCADE);
				opp[opp.length - 1].enableBody = true;
      }
      else {
        opp[opp.length] = game.add.sprite( randnum, 0, 'enemy') 
        game.physics.enable(opp[opp.length - 1], Phaser.Physics.ARCADE);
      }

  }
}
function takeHP(){
	switch(hp){
		case 1:
			gameover = false;
			hp1.destroy();
			resetEnemys();
			break;
		case 2:
			hp = hp - 1;
			hp2.destroy();
			resetEnemys();
			break;
		case 3:
			hp = hp - 1;
			hp3.destroy();
			resetEnemys();
			break;
		case 4:
			hp = hp- 1;
			hp4.destroy();
			resetEnemys();
			break;
		case 5:
			hp = hp- 1;
			hp5.destroy();
			resetEnemys();
			break;
	}
}
function resetEnemys(){
	  for (i = 0; i < opp.length; i++){
			opp[i].destroy();
			var randnum = Math.random() * 1400
      if (randnum > 800) {
        opp[i] = game.add.sprite( 0, randnum - 800, 'enemy')
        game.physics.enable(opp[i], Phaser.Physics.ARCADE);
      }
      else {
        opp[i] = game.add.sprite( randnum, 0, 'enemy') 
        game.physics.enable(opp[i], Phaser.Physics.ARCADE);
      }
		}
}
function fire(){
	
}