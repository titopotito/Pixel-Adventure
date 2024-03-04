import Phaser from "phaser";
export default class GameSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.positionX, config.positionY, config.spriteName);
        config.scene.physics.add.existing(this);
        this.addToDisplayList();
        this.addToUpdateList();
        this.setDepth(1);
        this.body.collideWorldBounds = true;
    }
}
