import GameSprite from "./game-sprite";
export default class Adventurer extends GameSprite {
    constructor(config) {
        super(config);
        this.sprite.scene.cameras.main.startFollow(this.sprite, true);
        this.createAnimation("idle", 1);
        this.createAnimation("walk", 4);
        this.createAnimation("attack", 1);
    }

    get keyboardEventMap() {
        const keyboardEventMap = {};
        const walkingKeyCodes = {
            "walk-up": Phaser.Input.Keyboard.KeyCodes.W,
            "walk-down": Phaser.Input.Keyboard.KeyCodes.S,
            "walk-left": Phaser.Input.Keyboard.KeyCodes.A,
            "walk-right": Phaser.Input.Keyboard.KeyCodes.D,
        };

        for (let action in walkingKeyCodes) {
            keyboardEventMap[action] = this.sprite.scene.input.keyboard.addKey(walkingKeyCodes[action], true, true);
        }

        keyboardEventMap["attack"] = this.sprite.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        return keyboardEventMap;
    }

    updateAnimation() {
        if (this.keyboardEventMap["walk-up"].isDown) {
            this.walk("up");
        } else if (this.keyboardEventMap["walk-down"].isDown) {
            this.walk("down");
        } else if (this.keyboardEventMap["walk-left"].isDown) {
            this.walk("left");
        } else if (this.keyboardEventMap["walk-right"].isDown) {
            this.walk("right");
        } else {
            this.idle();
        }

        if (this.keyboardEventMap["attack"].isDown) {
            this.attack();
        }
    }
}

// this.greendemon = this.physics.add.sprite(17 * 16, 14 * 16, "green-demon", "idle-left-1.png");
// this.greendemon.setDepth(1);
// this.updateAnimation("green-demon", "walk", 4);
// this.greendemon.anims.play("green-demon-walk-right");
