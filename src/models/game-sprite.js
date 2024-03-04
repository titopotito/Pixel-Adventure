import Phaser from "phaser";
export default class GameSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.positionX, config.positionY, config.spriteName);
        config.scene.physics.add.existing(this);
        this.addToDisplayList();
        this.addToUpdateList();
        this.id = config.id;
        this.setDepth(1);
        this.body.collideWorldBounds = true;
    }

    createAnims(action, numberOfFrames = 1, repeat = 1, suffix = ".png") {
        this.scene.anims.create({
            key: `${this.id}-${this.texture.key}-${action}`,
            frames: this.anims.generateFrameNames(`${this.texture.key}`, {
                start: 1,
                end: numberOfFrames,
                prefix: `${action}-`,
                suffix: suffix,
            }),
            repeat: repeat,
            frameRate: 5,
        });
    }

    createAnimsWithDirection(action, numberOfFrames = 1, repeat = -1, suffix = ".png") {
        for (let direction of ["up", "down", "left", "right"]) {
            this.scene.anims.create({
                key: `${this.id}-${this.texture.key}-${action}-${direction}`,
                frames: this.anims.generateFrameNames(`${this.texture.key}`, {
                    start: 1,
                    end: numberOfFrames,
                    prefix: `${action}-${direction}-`,
                    suffix: suffix,
                }),
                repeat: repeat,
                frameRate: 5,
            });
        }
    }
}
