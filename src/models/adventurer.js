import CharacterSprite from "./character-sprite.js";
import OverlapBody from "./overlap-body.js";
import AttackEffect from "./attack-effect.js";

export default class Adventurer extends CharacterSprite {
    constructor(config) {
        super(config);
        this.scene.cameras.main.startFollow(this, true);
        this.overlapBody = new OverlapBody({ ...config, character: this });
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
        keyboardEventMap["interact"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        return keyboardEventMap;
    }

    interact(treasure) {
        if (this.keyboardEventMap["interact"].isDown) {
            treasure.open();
        }
    }

    attack() {
        super.attack();

        // Creating SlashEffect Sprite and playing animation
        const slashEffect = new AttackEffect(this, "slash");
        slashEffect.play();

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

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.isAlive) return;

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

        this.overlapBody.preUpdate(t, dt);
    }
}
