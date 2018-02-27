var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('square', 'assets/Images/square.png');
  cursors = game.input.keyboard.createCursorKeys();
}

function create() {
  player = game.add.image(370, 270, 'square');
}

function update() {
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
}