export default class BootScene extends Phaser.Scene {
    constructor() {
      super({ key: 'BootScene' });
    }
  
    preload() {
      // Could show a loading bar if desired.
    }
  
    create() {
      this.scene.start('PreloadScene');
    }
  }
  