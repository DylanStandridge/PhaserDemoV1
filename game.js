var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var score = 0;

function preload() {
  game.load.image('square', 'assets/Images/square.png');
  game.load.image('firstaid', 'assets/Images/firstaid.png');
  game.load.image('star', 'assets/Images/star.png');

  cursors = game.input.keyboard.createCursorKeys();
}

function create() {
  player = game.add.image(370, 270, 'square');
  hp = game.add.image(0, 0, 'firstaid');
  hp1 = game.add.image(20, 0, 'firstaid');
  hp2 = game.add.image(40, 0, 'firstaid');
  star = game.add.image(200, 200, 'star');
  star.position.x = Math.floor(Math.random() * 13) * 40;
  star.position.y = Math.floor(Math.random() * 10) * 40;
  gameText = game.add.text(150, 0, "0", {
          font: "28px Arial",
          fill: "#fff"
      });
      gameText.anchor.setTo(1, 0);

}

function update() {
      gameText.text = score;
  if (cursors.left.isDown)
  {
      //  Move to the left
      player.position.x = player.position.x - 5;
  }
  else if (cursors.right.isDown)
  {
      //  Move to the right
       player.position.x = player.position.x + 5;
  }
  
  else if (cursors.up.isDown)
  {
      //  Move to the left
      player.position.y = player.position.y - 5;
  }
  else if (cursors.down.isDown)
  {
      //  Move to the right
       player.position.y = player.position.y + 5;
  }
  if (boxHitsStar()) {
            score++;
            star.destroy();
            placeRandomStar();
}
}

function boxHitsStar(){
   // traverse the linked list, starting at the tail
      var collides = false;
      var numTimes = 0;
          if (((star.position.x + 13) < (player.position.x + 42) && ((star.position.x + 13) > player.position.x )) &&
              ((star.position.y + 12) < (player.position.y + 42) && ((star.position.y + 12) > player.position.y) ) ){
              collides = true;
          }
      
      return collides;
  
}

function placeRandomStar() {
      if (star !== undefined) star.destroy();
      star = game.add.image(0, 0, 'star');
      do {
          star.position.x = Math.floor(Math.random() * 13) * 40;
          star.position.y = Math.floor(Math.random() * 10) * 40;
      } while (boxHitsStar());
  }