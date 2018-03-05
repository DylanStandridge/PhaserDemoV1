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
  //insert the pictures (Sprites) into our game object that we created upon startup.
  //assigns these object references into a variable for future reference.
  // syntax:
  // game.add.image(X coordinate, Y coordinate, Name of loaded Object)

  player = game.add.image(370, 270, 'square');
  hp1 = game.add.image(0, 0, 'firstaid');
  hp2 = game.add.image(20, 0, 'firstaid');
  hp3 = game.add.image(40, 0, 'firstaid');
  
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
      gameText.text = "Score:" + score;
      }
  else {
        gameText.text= "Game Over"
      }
      enemycounter++;
  if ((cursors.left.isDown && cursors.up.isDown))
  {
      //  Move to the left
      player.position.x = player.position.x - 3;
      player.position.y = player.position.y - 4;
  }
  else if ((cursors.left.isDown && cursors.down.isDown))
  {
      //  Move to the left
      player.position.x = player.position.x - 3;
      player.position.y = player.position.y + 4;
  }
  else if ((cursors.right.isDown && cursors.up.isDown))
  {
      //  Move to the left
      player.position.x = player.position.x + 3;
      player.position.y = player.position.y - 4;
  }
  else if ((cursors.right.isDown && cursors.down.isDown))
  {
      //  Move to the left
      player.position.x = player.position.x + 3;
      player.position.y = player.position.y + 4;
  }
  else if (cursors.left.isDown )
  {
      //  Move to the left
      player.position.x = player.position.x - 5;
  }
  else if (cursors.right.isDown )
  {
      //  Move to the right
       player.position.x = player.position.x + 5;
  }
  
  else if (cursors.up.isDown )
  {
      //  Move to the left
      player.position.y = player.position.y - 5;
  }
  else if (cursors.down.isDown)
  {
      //  Move to the right
       player.position.y = player.position.y + 5;
  }
  if (player.position.x > 758) {
    player.position.x = player.position.x - 5;
  }
  if(player.position.y > 558) {
    player.position.y = player.position.y - 5;
  }
  if ( player.position.y < 2) {
    player.position.y = player.position.y + 5;
  }
  if (player.position.x < 2){
    player.position.x = player.position.x + 5;
  }
  if (boxHitsStar()) {
            score++;
            star.destroy();
            placeRandomStar();
}
  if ((enemycounter==60) || (enemycounter==1800) || (enemycounter==3600) || (enemycounter==5400 || enemycounter==7200)){
      var randnum = Math.random() * 1400
      if (randnum > 800) {
        opp[opp.length] = game.add.image( 0, randnum - 800, 'enemy') 
      }
      else {
        opp[opp.length] = game.add.image( randnum, 0, 'enemy') 

      }

  }
  moveEnemy()
}

//this is checking to see if our player has hit the star notice it uses a range of 42 for the player to outline the sprite
// it also only checks to see if you have hit the center of the star being that this sprite is a 26x24
function boxHitsStar(){
      var collides = false;
      var numTimes = 0;
 // this is a conditional statment to check where the player is hitting. 
          if (((star.position.x + starcentx) < (player.position.x + playerWidth) && ((star.position.x + starcentx) > player.position.x )) &&
              ((star.position.y + starcenty) < (player.position.y + playerHeight) && ((star.position.y + starcenty) > player.position.y) ) ){
              collides = true;
          }
      //returns a true false value
      return collides;
  
}
// this is a function that adds an image to the game that is called star (defined in preload)
//it positions it at a random location based on Math.random
function placeRandomStar() {
      star = game.add.image(0, 0, 'star');
      do {
          star.position.x = Math.floor(Math.random() * 770);
          star.position.y = Math.floor(Math.random() * 570);
      } while (boxHitsStar());
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
    if (((opp[i].position.x) < (player.position.x + playerWidth) && ((opp[i].position.x + starcentx) > player.position.x )) &&
              ((opp[i].position.y + starcenty) < (player.position.y + playerHeight) && ((opp[i].position.y + starcenty) > player.position.y) )){
        player.destroy();
        gameover = false;
    }
}
    
  
}
