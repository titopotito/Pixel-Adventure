import Phaser from "phaser";
import * as utilFns from "../utils/sprite-util-functions";

export default class Flamethrower {
    constructor(caster) {
        this.caster = caster;
        this.scene = caster.scene;
        this.duration = 6000;
        this.cooldown = 6000;
        this.offsetFromCaster = 16;
        this.lastCastTime = 0;
        this.isOnCastState = false;
    }

    static get name() {
        return "flamethrower";
    }

    static get spriteName() {
        return "fire-sprite";
    }

    static get animationKey() {
        return "skill-fire-cast";
    }

    static get dmgTable() {
        return {
            "lvl-1": 0.3,
            "lvl-2": 0.4,
            "lvl-3": 0.5,
            "lvl-4": 0.6,
            "lvl-5": 0.7,
            "lvl-6": 0.8,
            "lvl-7": 0.9,
            "lvl-8": 1.0,
            "lvl-9": 1.1,
            "lvl-10": 1.2,
        };
    }

    get isOnCooldown() {
        const dt = this.scene.time.now - this.lastCastTime;
        if (dt > this.cooldown) return false;
        return true;
    }

    cast() {
        if (!this.isOnCastState && !this.isOnCooldown) {
            this.isOnCastState = true;
            this.lastCastTime = this.scene.time.now;
        } else if (this.isOnCastState) {
            const position = utilFns.getSpawnPosition(this.caster, this.offsetFromCaster);
            const fireSprite = new Phaser.Physics.Arcade.Sprite(
                this.scene,
                position.x,
                position.y,
                Flamethrower.spriteName
            );
            this.scene.physics.add.overlap(fireSprite, this.caster.target, (fireSprite, target) => {
                target.takeDamage(this.caster.atk * Flamethrower.dmgTable["lvl-1"]);
            });
            utilFns.playAnimationForManyThenDestroy(this.scene, [fireSprite], Flamethrower.animationKey, 1000);
            utilFns.rotateBaseOnCharacterDirection(this.caster, fireSprite, 90);
            utilFns.setVelocityBaseOnCharacterDirection(this.caster, fireSprite, 100);
            utilFns.increaseSizeOvertime(fireSprite, 0.05);
            fireSprite.setBodySize(16);
            fireSprite.setDepth(2);

            this.scene.time.addEvent({
                delay: this.duration,
                callback: () => (this.isOnCastState = false),
            });
        }
    }
}
