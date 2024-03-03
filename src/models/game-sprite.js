import Phaser from "phaser";
export default class GameSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.positionX, config.positionY, config.spriteName);
        this.sprite = config.scene.physics.add.sprite(
            config.positionX,
            config.positionY,
            config.spriteName,
            config.spriteInitialFrame
        );
        this.id = config.id;
        this.sprite.setDepth(1);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.pushable = false;
    }

    createAnims(action, numberOfFrames = 1, repeat = 1, suffix = ".png") {
        this.sprite.scene.anims.create({
            key: `${this.id}-${this.sprite.texture.key}-${action}`,
            frames: this.sprite.anims.generateFrameNames(`${this.sprite.texture.key}`, {
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
            this.sprite.scene.anims.create({
                key: `${this.id}-${this.sprite.texture.key}-${action}-${direction}`,
                frames: this.sprite.anims.generateFrameNames(`${this.sprite.texture.key}`, {
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
