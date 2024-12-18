import { getPlayerProgress, updatePlayerProgress } from '../aws/progressService.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.mapWidth = 10;
    this.mapHeight = 8;
    this.tileSize = 64;
    this.tileSprites = []; 
    this.player = null;
    this.goal = null;
    this.cursors = null;
  }

  async create() {
    // Fetch player progress
    const progress = await getPlayerProgress();
    const currentLevel = progress.currentLevel || 1;
    console.log(`Player current level: ${currentLevel}`);

    // Create a simple tile-based map from code
    // We'll just fill the screen with grass tiles
    // The goal tile will be placed at a random position
    this.generateMap();

    // Place the player at the top-left corner
    this.player = this.physics.add.sprite(this.tileSize / 2, this.tileSize / 2, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.5);

    // Place a goal at a random tile (not too close to the player)
    const goalX = Phaser.Math.Between(3, this.mapWidth - 2) * this.tileSize + this.tileSize / 2;
    const goalY = Phaser.Math.Between(3, this.mapHeight - 2) * this.tileSize + this.tileSize / 2;
    this.goal = this.physics.add.sprite(goalX, goalY, 'goal').setScale(0.5);

    // Simple camera bounds
    this.cameras.main.setBounds(0, 0, this.mapWidth * this.tileSize, this.mapHeight * this.tileSize);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // Cursor keys for movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Overlap check for player and goal
    this.physics.add.overlap(this.player, this.goal, async () => {
      // Player reached the goal
      await updatePlayerProgress(currentLevel + 1);
      alert(`Level ${currentLevel} complete! Progress saved. Reloading...`);
      this.scene.restart();
    }, null, this);
  }

  update() {
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }

  generateMap() {
    // Just fill the scene with tiles
    // No collisions, just a background
    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        const tileSprite = this.add.sprite(
          x * this.tileSize + this.tileSize / 2,
          y * this.tileSize + this.tileSize / 2,
          'tile'
        );
        tileSprite.setDepth(-1);
        this.tileSprites.push(tileSprite);
      }
    }
  }
}
