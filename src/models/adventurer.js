import CharacterSprite from "./character-sprite.js";
export default class Adventurer extends CharacterSprite {
    constructor(config) {
        super(config);
        this.scene.cameras.main.startFollow(this, true);
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
            keyboardEventMap[action] = this.scene.input.keyboard.addKey(walkingKeyCodes[action], true, true);
        }

        keyboardEventMap["attack"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
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
