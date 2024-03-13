import Phaser from "phaser";
import NightEffect from "../effects/night-effect";
import OverlapBody from "../body/overlap-body";
import eventsCenter from "../events/events-center";
import * as utilFns from "../utils/sprite-util-functions";

export default class HeavensJudgement {
    constructor(caster, keyCode = null) {
        this.caster = caster;
        this.scene = caster.scene;
        this.lastLightningStrikeTime = 0;
        this.delayBetweenLightningStrike = 2000;
        this.duration = 12000;
        this.range = { x: 240, y: 240 };
        this.cooldown = 20000;
        this.lastCastTime = 0;
        this.keyCode = keyCode;
    }

    static get name() {
        return "heaven-s-judgement";
    }

    static get spriteName() {
        return "lightning-sprite";
    }

    static get animationKey() {
        return "skill-lightning-cast";
    }

    static get dmgTable() {
        return {
            "lvl-1": 0.9,
            "lvl-2": 0.8,
            "lvl-3": 0.9,
            "lvl-4": 1.1,
            "lvl-5": 1.2,
            "lvl-6": 1.3,
            "lvl-7": 1.4,
            "lvl-8": 1.5,
            "lvl-9": 1.6,
            "lvl-10": 1.7,
        };
    }

    get isOnCooldown() {
        const dt = this.scene.time.now - this.lastCastTime;
        if (dt > this.cooldown) return false;
        return true;
    }

    get isLightningStrikeOnCooldown() {
        const dt = this.scene.time.now - this.lastLightningStrikeTime;
        if (dt > this.delayBetweenLightningStrike) return false;
        return true;
    }

    cast() {
        if (this.isOnCooldown) return;

        this.lastCastTime = this.scene.time.now;
        eventsCenter.emit(this.keyCode, this.cooldown);

        const nightEffect = new NightEffect(this.scene);
        const detectionRange = new OverlapBody({
            scene: this.scene,
            character: this.caster,
            positionX: this.caster.x,
            positionY: this.caster.y,
        });
        detectionRange.addToUpdateList();
        detectionRange.setBodySize(this.range.x, this.range.y);

        this.scene.physics.add.overlap(detectionRange, this.caster.target, (detectionRange, target) => {
            if (!this.isLightningStrikeOnCooldown) {
                this.lastLightningStrikeTime = this.scene.time.now;
                let lightningSprite = new Phaser.Physics.Arcade.Sprite(
                    this.scene,
                    target.x,
                    target.y,
                    HeavensJudgement.spriteName
                );
                lightningSprite.addToDisplayList();
                lightningSprite.setDepth(2);
                lightningSprite.setScale(1.5);
                lightningSprite.preFX.addGlow();
                lightningSprite.postFX.addGlow();
                nightEffect.flash(100);

                this.scene.physics.add.collider(lightningSprite, target, (lightningSprite, target) => {
                    target.takeDamage(this.caster.atk * HeavensJudgement.dmgTable["lvl-1"]);
                });

                utilFns.playAnimationForManyThenDestroy(
                    this.scene,
                    [lightningSprite],
                    HeavensJudgement.animationKey,
                    500
                );
            }
        });

        utilFns.destroyAfterDelay(this.scene, [nightEffect, detectionRange], this.duration);
    }
}
