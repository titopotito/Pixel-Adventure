import CharacterSprite from "./character-sprite.js";
import OverlapBody from "../body/overlap-body.js";
import eventsCenter from "../events/events-center.js";

export default class Adventurer extends CharacterSprite {
    constructor(config) {
        super(config);
        this.scene.cameras.main.startFollow(this, true);
        this.overlapBody = new OverlapBody({ ...config, character: this });
    }

    get keyboardKeyMap() {
        const keyboardKeyMap = {};
        keyboardKeyMap["walk-up"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W, true, true);
        keyboardKeyMap["walk-down"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S, true, true);
        keyboardKeyMap["walk-left"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true, true);
        keyboardKeyMap["walk-right"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true, true);
        keyboardKeyMap["attack"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyboardKeyMap["interact"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyboardKeyMap["skill1"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyboardKeyMap["skill2"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        return keyboardKeyMap;
    }

    interact(treasureChest) {
        if (this.scene.input.keyboard.checkDown(this.keyboardKeyMap["interact"], 100)) {
            treasureChest.open();
        }
    }

    attack() {
        super.attack();
        this.basicAttack.cast();
    }

    // set targets that will be hit by the adventurers attacks
    setTarget(target) {
        this.target = target;
    }

    setBasicAttack(basicAttack) {
        this.basicAttack = basicAttack;
    }

    setSkill1(skill) {
        this.skill1 = skill;
        this.skill1.keyCode = "keydown-K";
    }

    setSkill2(skill) {
        this.skill2 = skill;
        this.skill2.keyCode = "keydown-L";
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (!this.isAlive) return;

        if (this.keyboardKeyMap["walk-up"].isDown) {
            this.walk("up");
        } else if (this.keyboardKeyMap["walk-down"].isDown) {
            this.walk("down");
        } else if (this.keyboardKeyMap["walk-left"].isDown) {
            this.walk("left");
        } else if (this.keyboardKeyMap["walk-right"].isDown) {
            this.walk("right");
        } else {
            // play idle animation only when not walking and not in attacking state
            if (!this.isAttacking) this.idle();
        }

        // If attack button is continually pressed down, sprite will only attack every 500ms
        if (this.scene.input.keyboard.checkDown(this.keyboardKeyMap["attack"], 500)) {
            this.attack();
            eventsCenter.emit("keydown-J", 200);

            // Attacking state will end after 200ms
            this.scene.time.addEvent({
                delay: 200,
                callback: () => {
                    this.isAttacking = false;
                },
            });
        }

        if (this.scene.input.keyboard.checkDown(this.keyboardKeyMap["skill1"], 200)) {
            this.skill1.cast();
        }

        if (this.scene.input.keyboard.checkDown(this.keyboardKeyMap["skill2"], 200)) {
            this.skill2.cast();
        }
    }
}
