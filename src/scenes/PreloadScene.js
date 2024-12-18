import { TILE_URL, PLAYER_URL, GOAL_URL } from '../utils/consts.js';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Load images from public URLs
    this.load.image('tile', TILE_URL);
    this.load.image('player', PLAYER_URL);
    this.load.image('goal', GOAL_URL);
  }

  create() {
    this.scene.start('GameScene');
  }
}
    