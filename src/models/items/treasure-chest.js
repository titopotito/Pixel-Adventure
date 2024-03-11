import Phaser from "phaser";

export default class TreasureChest extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.spriteName);
        config.scene.physics.add.existing(this);
        this.scene = config.scene;
        this.body.pushable = false;
        this.addToDisplayList();
        this.addToUpdateList();
        this.setDepth(1);
    }

    open() {
        this.anims.play(`${this.texture.key}-open`);
        this.removeFromUpdateList();
        this.scene.time.addEvent({ delay: 1000, callback: () => this.destroy() });
    }
}
