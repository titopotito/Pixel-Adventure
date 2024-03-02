export default class Adventurer extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.positionX, config.positionY, config.spriteName);

        this.sprite = config.scene.physics.add.sprite(
            config.positionX,
            config.positionY,
            config.spriteName,
            "idle-down-1.png"
        );

        this.sprite.setDepth(1);
        this.sprite.scene.cameras.main.startFollow(this.sprite, true);
        this.sprite.currentDirection = "down";
        this.keyEventMap = {};
        const keyCodes = {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        };

        for (let direction in keyCodes) {
            let keyEvent = this.sprite.scene.input.keyboard.addKey(keyCodes[direction], true, true);
            keyEvent.on("up", (e) => {
                this.sprite.currentDirection = `${direction}`;
            });
            this.keyEventMap[`${direction}`] = keyEvent;
        }

        this.sprite.attackKey = config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

        this.createAnimation("idle", 1);
        this.createAnimation("walk", 4);
        this.createAnimation("attack", 1);
    }

    createAnimation(action, numberOfFrames = 1, suffix = ".png") {
        for (let direction of ["up", "down", "left", "right"]) {
            this.sprite.scene.anims.create({
                key: `${this.sprite.texture.key}-${action}-${direction}`,
                frames: this.sprite.anims.generateFrameNames(this.sprite.texture.key, {
                    start: 1,
                    end: numberOfFrames,
                    prefix: `${action}-${direction}-`,
                    suffix: suffix,
                }),
                repeat: -1,
                frameRate: 5,
            });
        }
    }

    playAnimation() {
        if (this.keyEventMap.up.isDown) {
            this.sprite.setVelocity(0, -100);
            this.sprite.anims.play(`${this.sprite.texture.key}-walk-up`, true);
            this.sprite.currentDirection = "up";
        } else if (this.keyEventMap.down.isDown) {
            this.sprite.setVelocity(0, 100);
            this.sprite.anims.play(`${this.sprite.texture.key}-walk-down`, true);
            this.sprite.currentDirection = "down";
        } else if (this.keyEventMap.left.isDown) {
            this.sprite.setVelocity(-100, 0);
            this.sprite.anims.play(`${this.sprite.texture.key}-walk-left`, true);
            this.sprite.currentDirection = "left";
        } else if (this.keyEventMap.right.isDown) {
            this.sprite.setVelocity(100, 0);
            this.sprite.anims.play(`${this.sprite.texture.key}-walk-right`, true);
            this.sprite.currentDirection = "right";
        } else {
            this.sprite.setVelocity(0, 0);
            this.sprite.anims.play(`${this.sprite.texture.key}-idle-${this.sprite.currentDirection}`, true);
        }

        if (this.sprite.attackKey.isDown) {
            this.sprite.anims.play(`${this.sprite.texture.key}-attack-${this.sprite.currentDirection}`);
        }
    }
}

// this.greendemon = this.physics.add.sprite(17 * 16, 14 * 16, "green-demon", "idle-left-1.png");
// this.greendemon.setDepth(1);
// this.createAnimation("green-demon", "walk", 4);
// this.greendemon.anims.play("green-demon-walk-right");
