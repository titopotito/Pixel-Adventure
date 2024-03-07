import CharacterSprite from "./character-sprite.js";
import GameSprite from "./game-sprite.js";

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

    attack() {
        super.attack();

        // Setting configuration for SlashEffect Sprite
        const slashConfig = { scene: this.scene, spriteName: "slash" };
        let angle = 0;
        if (this.currentDirection === "down") {
            slashConfig.positionX = this.x;
            slashConfig.positionY = this.y + this.height / 2;
            angle = 90;
        } else if (this.currentDirection === "up") {
            slashConfig.positionX = this.x;
            slashConfig.positionY = this.y - this.height / 2;
            angle = 270;
        } else if (this.currentDirection === "left") {
            slashConfig.positionX = this.x - this.width / 2;
            slashConfig.positionY = this.y;
            angle = 180;
        } else {
            slashConfig.positionX = this.x + this.width / 2;
            slashConfig.positionY = this.y;
        }

        // Creating SlashEffect Sprite and playing animation
        const slashEffect = new GameSprite(slashConfig);
        slashEffect.setRotation(Phaser.Math.DegToRad(angle));
        slashEffect.anims.playAfterDelay({ key: "slash-slash", frameRate: 20 }, 40);

        // Adding objects to collide with SlashEffect and making target take damage
        this.scene.physics.add.collider(slashEffect, this.target, (slash, target) => {
            target.takeDamage(this.atk);
        });

        // Destroy SlashEffect Sprite after 200ms
        this.scene.time.addEvent({
            delay: 200,
            callback: function () {
                slashEffect.destroy();
            },
        });
    }

    // set targets that will be hit by the adventurers attacks
    setAttackCollision(target) {
        this.target = target;
    }

    update(t, dt) {
        if (this.keyboardEventMap["walk-up"].isDown) {
            this.walk("up");
        } else if (this.keyboardEventMap["walk-down"].isDown) {
            this.walk("down");
        } else if (this.keyboardEventMap["walk-left"].isDown) {
            this.walk("left");
        } else if (this.keyboardEventMap["walk-right"].isDown) {
            this.walk("right");
        } else {
            // play idle animation only when not walking and not in attacking state
            if (!this.isAttacking) this.idle();
        }

        // If attack button is continually pressed down, sprite will only attack every 500ms
        if (this.scene.input.keyboard.checkDown(this.keyboardEventMap["attack"], 500)) {
            this.attack();

            // Attacking state will end after 200ms
            this.scene.time.addEvent({
                delay: 200,
                callback: () => {
                    this.isAttacking = false;
                },
            });
        }
    }
}
