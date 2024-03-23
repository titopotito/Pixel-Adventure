import Character from "./character.js";
import OverlapBody from "../body/overlap-body.js";
import BasicAttack from "../skills/basic-attack.js";
import HeavensJudgement from "../skills/heaven-s-judgement";
import Flamethrower from "../skills/flamethrower";
import FreezingField from "../skills/freezing-field";
import PlanetBefall from "../skills/planet-befall";
import eventsCenter from "../events/events-center.js";

export default class Adventurer extends Character {
    constructor(config) {
        super(config);
        this.scene.cameras.main.startFollow(this, true);
        this.overlapBody = new OverlapBody({ ...config, character: this });
        this.maxMP = 100;
        this.currentMP = this.maxMP;
        this.inventory = null;
        this.basicAttack = new BasicAttack(this, "slash-slash");
        this.skills = {
            "heaven-s-judgement": new HeavensJudgement(this),
            flamethrower: new Flamethrower(this),
            "freezing-field": new FreezingField(this),
            "planet-befall": new PlanetBefall(this),
        };

        this.init();
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
        keyboardKeyMap["useItem1"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyboardKeyMap["useItem2"] = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        return keyboardKeyMap;
    }
    init() {
        this.setSkill1(this.skills[FreezingField.name]);
        this.setSkill2(this.skills[Flamethrower.name]);
    }

    interact(treasureChest) {
        if (this.scene.input.keyboard.checkDown(this.keyboardKeyMap["interact"], 1000)) {
            treasureChest.open();
        }
    }

    attack() {
        super.attack();
        this.basicAttack.cast();
        this.scene.sound.add("slash").play();
    }

    consumeMP(cost) {
        this.currentMP -= cost;
    }

    hasEnoughMP(cost) {
        if (this.currentMP >= cost) return true;
        else {
            console.log("not enough MP");
            return false;
        }
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
            eventsCenter.emit("keydown-J-start-cooldown", 100);

            // Attacking state will end after 200ms
            this.scene.time.addEvent({
                delay: 200,
                callback: () => {
                    this.isAttacking = false;
                },
            });
        }

        if (this.scene.input.keyboard.checkDown(this.keyboardKeyMap["skill1"], 200)) {
            if (!this.skill1.isOnCooldown && this.hasEnoughMP(this.skill1.mpCost)) {
                this.consumeMP(this.skill1.mpCost);
                this.skill1.cast();
            }
        }

        if (this.scene.input.keyboard.checkDown(this.keyboardKeyMap["skill2"], 200)) {
            if (!this.skill2.isOnCooldown && this.hasEnoughMP(this.skill2.mpCost)) {
                this.consumeMP(this.skill2.mpCost);
                this.skill2.cast();
            }
        }
    }
}
