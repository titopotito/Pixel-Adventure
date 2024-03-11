export default class OverlapBody extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.positionX, config.positionY, "adventurer-overlap-body");
        config.scene.physics.add.existing(this);
        this.character = config.character;
        this.setBodySize(32, 32);
        this.addToUpdateList();
    }

    preUpdate(t, dt) {
        this.x = this.character.x;
        this.y = this.character.y;
    }
}
