import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from './utils/consts.js';

import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [BootScene, PreloadScene, GameScene]
};

new Phaser.Game(config);

// Amazon Q Developer could have been used to:
// - Generate boilerplate Phaser code
// - Suggest AWS SDK integration code
// - Optimize code structure and scene transitions
