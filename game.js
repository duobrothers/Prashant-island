// Create the Phaser game instance
let game; // Declare game variable

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Initialize the game instance after selection
function startGame() {
    game = new Phaser.Game(config);
    document.getElementById('selection-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
}

document.getElementById('mobileBtn').addEventListener('click', () => {
    // Set mobile specific settings if needed
    startGame();
});

document.getElementById('pcBtn').addEventListener('click', () => {
    // Set PC specific settings if needed
    startGame();
});

// Preload assets like images and sprites
function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('npc', 'assets/npc.png');
}

// Create the game world, player, and NPC
function create() {
    // Add player sprite
    player = this.physics.add.sprite(400, 300, 'player');
    player.setCollideWorldBounds(true);

    // Add NPC sprite (AI)
    npc = this.physics.add.sprite(200, 200, 'npc');
    npc.setCollideWorldBounds(true);

    // Input controls
    cursors = this.input.keyboard.createCursorKeys();

    // NPC AI Text (for interaction feedback)
    text = this.add.text(10, 10, 'NPC says: Hello!', { fontSize: '16px', fill: '#FFF' });

    // AI Behavior - NPC will follow the player with basic AI
    this.time.addEvent({
        delay: 100,
        callback: npcFollowPlayer,
        callbackScope: this,
        loop: true
    });
}

// Update the game frame
function update() {
    // Player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
    } else {
        player.setVelocityY(0);
    }

    // Update AI interaction text
    if (Phaser.Math.Distance.Between(player.x, player.y, npc.x, npc.y) < 50) {
        text.setText('NPC says: Let’s compete!');
    } else {
        text.setText('NPC says: Hello!');
    }
}

// AI Logic - NPC follows the player
function npcFollowPlayer() {
    const distance = Phaser.Math.Distance.Between(player.x, player.y, npc.x, npc.y);

    if (distance > 100) {
        this.physics.moveToObject(npc, player, 100);
    } else {
        npc.setVelocity(0);
    }
}

