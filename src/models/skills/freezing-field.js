import Phaser from "phaser";
import * as utilFns from "../utils/sprite-util-functions";

export default class FreezingField {
    constructor(caster) {
        this.caster = caster;
        this.scene = caster.scene;
        this.offsetFromCaster = 32;
        this.cooldown = 5000;
        this.lastCastTime = 0;
    }

    static get name() {
        return "freezing-field";
    }

    static get spriteName() {
        return "ice-sprite";
    }

    static get animationKey() {
        return "skill-ice-cast";
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
        if (this.isOnCooldown) return;

        this.lastCastTime = this.scene.time.now;

        const spawnPositions = this.getIceSpawnPositions();
        const duration = 400;

        const iceSprites = spawnPositions.map((position) => {
            let iceSprite = new Phaser.Physics.Arcade.Sprite(
                this.scene,
                position.x,
                position.y,
                FreezingField.spriteName
            );
            iceSprite.setDepth(2);
            this.scene.physics.add.collider(iceSprite, this.caster.target, (iceSprite, target) => {
                target.takeDamage(this.caster.atk * FreezingField.dmgTable["lvl-1"]);
                target.freeze();
            });
            return iceSprite;
        });

        utilFns
            .playAnimationForManyThenDestroy(this.scene, iceSprites.slice(0, 3), FreezingField.animationKey, duration)
            .then((sprites) => {
                return utilFns.playAnimationForManyThenDestroy(
                    this.scene,
                    iceSprites.slice(3, 6),
                    FreezingField.animationKey,
                    duration
                );
            })
            .then((sprites) => {
                return utilFns.playAnimationForManyThenDestroy(
                    this.scene,
                    iceSprites.slice(6, 9),
                    FreezingField.animationKey,
                    duration
                );
            });
    }

    getIceSpawnPositions() {
        const OFFSET = this.offsetFromCaster;
        if (this.caster.currentDirection === "down") {
            return [
                { x: this.caster.x, y: this.caster.y + OFFSET },
                { x: this.caster.x + OFFSET, y: this.caster.y + OFFSET },
                { x: this.caster.x - OFFSET, y: this.caster.y + OFFSET },

                { x: this.caster.x, y: this.caster.y + OFFSET * 2 },
                { x: this.caster.x + OFFSET, y: this.caster.y + OFFSET * 2 },
                { x: this.caster.x - OFFSET, y: this.caster.y + OFFSET * 2 },

                { x: this.caster.x, y: this.caster.y + OFFSET * 3 },
                { x: this.caster.x + OFFSET, y: this.caster.y + OFFSET * 3 },
                { x: this.caster.x - OFFSET, y: this.caster.y + OFFSET * 3 },
            ];
        } else if (this.caster.currentDirection === "left") {
            return [
                { x: this.caster.x - OFFSET, y: this.caster.y },
                { x: this.caster.x - OFFSET, y: this.caster.y - OFFSET },
                { x: this.caster.x - OFFSET, y: this.caster.y + OFFSET },

                { x: this.caster.x - OFFSET * 2, y: this.caster.y },
                { x: this.caster.x - OFFSET * 2, y: this.caster.y - OFFSET },
                { x: this.caster.x - OFFSET * 2, y: this.caster.y + OFFSET },

                { x: this.caster.x - OFFSET * 3, y: this.caster.y },
                { x: this.caster.x - OFFSET * 3, y: this.caster.y - OFFSET },
                { x: this.caster.x - OFFSET * 3, y: this.caster.y + OFFSET },
            ];
        } else if (this.caster.currentDirection === "up") {
            return [
                { x: this.caster.x, y: this.caster.y - OFFSET },
                { x: this.caster.x + OFFSET, y: this.caster.y - OFFSET },
                { x: this.caster.x - OFFSET, y: this.caster.y - OFFSET },

                { x: this.caster.x, y: this.caster.y - OFFSET * 2 },
                { x: this.caster.x + OFFSET, y: this.caster.y - OFFSET * 2 },
                { x: this.caster.x - OFFSET, y: this.caster.y - OFFSET * 2 },

                { x: this.caster.x, y: this.caster.y - OFFSET * 3 },
                { x: this.caster.x + OFFSET, y: this.caster.y - OFFSET * 3 },
                { x: this.caster.x - OFFSET, y: this.caster.y - OFFSET * 3 },
            ];
        } else if (this.caster.currentDirection === "right") {
            return [
                { x: this.caster.x + OFFSET, y: this.caster.y },
                { x: this.caster.x + OFFSET, y: this.caster.y - OFFSET },
                { x: this.caster.x + OFFSET, y: this.caster.y + OFFSET },

                { x: this.caster.x + OFFSET * 2, y: this.caster.y },
                { x: this.caster.x + OFFSET * 2, y: this.caster.y - OFFSET },
                { x: this.caster.x + OFFSET * 2, y: this.caster.y + OFFSET },

                { x: this.caster.x + OFFSET * 3, y: this.caster.y },
                { x: this.caster.x + OFFSET * 3, y: this.caster.y - OFFSET },
                { x: this.caster.x + OFFSET * 3, y: this.caster.y + OFFSET },
            ];
        }
    }
}