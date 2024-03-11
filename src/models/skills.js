const SKILL_TABLE = {
    flamethrower: {
        stats: {
            "lvl-1": { dmg: 0.3 },
            "lvl-2": { dmg: 0.4 },
            "lvl-3": { dmg: 0.5 },
            "lvl-4": { dmg: 0.6 },
            "lvl-5": { dmg: 0.7 },
            "lvl-6": { dmg: 0.8 },
            "lvl-7": { dmg: 0.9 },
            "lvl-8": { dmg: 1.0 },
            "lvl-9": { dmg: 1.1 },
            "lvl-10": { dmg: 1.2 },
        },
        cooldown: 1000,
        duration: 5000,
    },
    "freezing-field": {
        stats: {
            "lvl-1": { dmg: 0.3 },
            "lvl-2": { dmg: 0.4 },
            "lvl-3": { dmg: 0.5 },
            "lvl-4": { dmg: 0.6 },
            "lvl-5": { dmg: 0.7 },
            "lvl-6": { dmg: 0.8 },
            "lvl-7": { dmg: 0.9 },
            "lvl-8": { dmg: 1.0 },
            "lvl-9": { dmg: 1.1 },
            "lvl-10": { dmg: 1.2 },
        },
        cooldown: 5000,
    },
    "heaven-s-judgement": {
        stats: {
            "lvl-1": { dmg: 0.9 },
            "lvl-2": { dmg: 0.8 },
            "lvl-3": { dmg: 0.9 },
            "lvl-4": { dmg: 1.1 },
            "lvl-5": { dmg: 1.2 },
            "lvl-6": { dmg: 1.3 },
            "lvl-7": { dmg: 1.4 },
            "lvl-8": { dmg: 1.5 },
            "lvl-9": { dmg: 1.6 },
            "lvl-10": { dmg: 1.7 },
        },
        cooldown: 100,
        duration: 10000,
    },
    rock: {
        "lvl-1": { dmg: 1 },
        "lvl-2": { dmg: 1.1 },
        "lvl-3": { dmg: 1.2 },
        "lvl-4": { dmg: 1.3 },
        "lvl-5": { dmg: 1.4 },
        "lvl-6": { dmg: 1.5 },
        "lvl-7": { dmg: 1.6 },
        "lvl-8": { dmg: 1.7 },
        "lvl-9": { dmg: 1.8 },
        "lvl-10": { dmg: 1.9 },
    },
    "planet-befall": {
        stats: {
            "lvl-1": { dmg: 1 },
            "lvl-2": { dmg: 1.1 },
            "lvl-3": { dmg: 1.2 },
            "lvl-4": { dmg: 1.3 },
            "lvl-5": { dmg: 1.4 },
            "lvl-6": { dmg: 1.5 },
            "lvl-7": { dmg: 1.6 },
            "lvl-8": { dmg: 1.7 },
            "lvl-9": { dmg: 1.8 },
            "lvl-10": { dmg: 1.9 },
        },
        cooldown: 5000,
    },
    plant: {
        stats: {
            "lvl-1": { dmg: 1, healing: 25 },
            "lvl-2": { dmg: 1.1, healing: 25 },
            "lvl-3": { dmg: 1.2, healing: 25 },
            "lvl-4": { dmg: 1.3, healing: 25 },
            "lvl-5": { dmg: 1.4, healing: 25 },
            "lvl-6": { dmg: 1.5, healing: 25 },
            "lvl-7": { dmg: 1.6, healing: 25 },
            "lvl-8": { dmg: 1.7, healing: 25 },
            "lvl-9": { dmg: 1.8, healing: 25 },
            "lvl-10": { dmg: 1.9, healing: 25 },
        },
        cooldown: 20,
    },
};

import Phaser from "phaser";
import OverlapBody from "./overlap-body";
import NightEffect from "./night-effect";

export default class Skill {
    constructor(skillName, caster) {
        this.caster = caster;
        this.scene = caster.scene;
        this.skillName = skillName;
        this.skillTable = SKILL_TABLE;
        this.delayBetweenLightningStrike = 2000;
        this.lastLightningStrikeTime = 0;
        this.setStats();
    }

    get isLightningStrikeOnCooldown() {
        const dt = this.scene.time.now - this.lastLightningStrikeTime;
        if (dt > this.delayBetweenLightningStrike) return false;
        return true;
    }

    cast() {
        if (this.skillName === "freezing-field") {
            this.freezingField();
        } else if (this.skillName === "planet-befall") {
            this.planetBefall();
        } else if (this.skillName === "flamethrower") {
            this.flamethrower();
        } else if (this.skillName === "heaven-s-judgement") {
            this.heavensJudgement();
        }
    }

    setStats() {
        this.cooldown = this.skillTable[this.skillName].cooldown;
        this.skillDamage = this.skillTable[this.skillName].stats["lvl-1"].dmg;
    }

    heavensJudgement() {
        const nightEffect = new NightEffect({
            scene: this.scene,
            x: this.caster.x,
            y: this.caster.y,
            character: this.caster,
        });

        const detectionRange = new OverlapBody({
            scene: this.scene,
            character: this.caster,
            positionX: this.caster.x,
            positionY: this.caster.y,
        });
        detectionRange.addToUpdateList();
        detectionRange.setBodySize(240, 240);

        this.scene.physics.add.overlap(detectionRange, this.caster.target, (detectionRange, target) => {
            if (!this.isLightningStrikeOnCooldown) {
                this.lastLightningStrikeTime = this.scene.time.now;
                let lightningSprite = new Phaser.Physics.Arcade.Sprite(
                    this.scene,
                    target.x,
                    target.y,
                    "lightning-sprite"
                );
                lightningSprite.addToDisplayList();
                lightningSprite.setDepth(2);
                lightningSprite.setScale(1.5);
                lightningSprite.preFX.addGlow();
                lightningSprite.postFX.addGlow();
                nightEffect.flash(100);

                this.scene.physics.add.collider(lightningSprite, target, (lightningSprite, target) => {
                    target.takeDamage(this.caster.atk * this.skillDamage);
                });
                this.playAnimationForManyThenDestroy([lightningSprite], "skill-lightning-cast", 500);
            }
        });

        this.destroyAfterDelay([nightEffect, detectionRange], this.skillTable[this.skillName].duration);
    }

    flamethrower() {
        const OFFSET = 16;
        const position = this.getSpawnPosition(OFFSET);
        let fireSprite = new Phaser.Physics.Arcade.Sprite(this.scene, position.x, position.y, "fire-sprite");
        fireSprite.setDepth(2);
        this.scene.physics.add.overlap(fireSprite, this.caster.target, (fireSprite, target) => {
            target.takeDamage(this.caster.atk * this.skillDamage);
        });
        this.rotateBaseOnCharacterDirection(fireSprite, 90);
        this.playAnimationForManyThenDestroy([fireSprite], "skill-fire-cast", 1000);
        this.setVelocityBaseOnCharacterDirection(fireSprite, 100);
        this.increaseSizeOvertime(fireSprite, 0.05);
    }

    planetBefall() {
        const OFFSET = 68;
        const position = this.getSpawnPosition(OFFSET);
        let rock2Sprite = new Phaser.Physics.Arcade.Sprite(this.scene, position.x, position.y, "rock2-sprite");
        rock2Sprite.setScale(4);
        rock2Sprite.setDepth(2);
        this.scene.time.addEvent({
            delay: 800,
            callback: () => {
                this.scene.physics.add.collider(rock2Sprite, this.caster.target, (rock2Sprite, target) => {
                    target.takeDamage(this.caster.atk * this.skillDamage);
                });
            },
        });
        this.playAnimationForManyThenDestroy([rock2Sprite], "skill-rock2-cast", 1100);
    }

    freezingField() {
        const spawnPositions = this.getIceSpawnPositions();

        const iceSprites = spawnPositions.map((position) => {
            let iceSprite = new Phaser.Physics.Arcade.Sprite(this.scene, position.x, position.y, "ice-sprite");
            iceSprite.setDepth(2);
            this.scene.physics.add.collider(iceSprite, this.caster.target, (iceSprite, target) => {
                target.takeDamage(this.caster.atk * this.skillDamage);
                target.freeze();
            });
            return iceSprite;
        });

        this.playAnimationForManyThenDestroy(iceSprites.slice(0, 3), "skill-ice-cast", 400)
            .then((sprites) => {
                return this.playAnimationForManyThenDestroy(iceSprites.slice(3, 6), "skill-ice-cast", 400);
            })
            .then((sprites) => {
                return this.playAnimationForManyThenDestroy(iceSprites.slice(6, 9), "skill-ice-cast", 400);
            });
    }

    getSpawnPosition(offset) {
        if (this.caster.currentDirection === "down") {
            return { x: this.caster.x, y: this.caster.y + offset };
        } else if (this.caster.currentDirection === "left") {
            return { x: this.caster.x - offset, y: this.caster.y };
        } else if (this.caster.currentDirection === "up") {
            return { x: this.caster.x, y: this.caster.y - offset };
        } else if (this.caster.currentDirection === "right") {
            return { x: this.caster.x + offset, y: this.caster.y };
        }
    }

    // gets the spawn position of the icicles
    getIceSpawnPositions() {
        const OFFSET = 32;
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

    // method for destroying an array of Phaser GameObjects after a given delay
    destroyAfterDelay(gameObject, delay) {
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                gameObject.forEach((gameObject) => gameObject.destroy());
            },
        });
    }

    //  create body for sprites > play animation > destroy sprite after delay
    playAnimationForManyThenDestroy(sprites, animationKey, delay, delayBeforeNextAnimation = 100) {
        return new Promise((resolve, reject) => {
            sprites.forEach((sprite) => {
                // Add a body and display each sprite object
                this.scene.physics.add.existing(sprite);
                sprite.addToDisplayList();
                sprite.visible = true;
            });

            this.scene.anims.play(animationKey, sprites);

            // delay by 100ms before returning the promise
            this.scene.time.addEvent({
                delay: delayBeforeNextAnimation,
                callback: () => {
                    resolve(sprites);

                    // delay by another 400ms before destroying each sprite needed to play-out the whole animation
                    this.destroyAfterDelay(sprites, delay - delayBeforeNextAnimation);
                },
            });
        });
    }

    increaseSizeOvertime(sprite, increment) {
        this.scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, () => {
            sprite.scale += increment;
        });
    }

    setVelocityBaseOnCharacterDirection(sprite, speed) {
        let velocity = { x: speed, y: 0 };
        if (this.caster.currentDirection === "down") {
            velocity = { x: 0, y: speed };
        } else if (this.caster.currentDirection === "up") {
            velocity = { x: 0, y: -speed };
        } else if (this.caster.currentDirection === "left") {
            velocity = { x: -speed, y: 0 };
        }
        sprite.setVelocity(velocity.x, velocity.y);
    }

    rotateBaseOnCharacterDirection(sprite, offset) {
        let angle = 0 + offset;
        if (this.caster.currentDirection === "down") {
            angle = 90 + offset;
        } else if (this.caster.currentDirection === "up") {
            angle = 270 + offset;
        } else if (this.caster.currentDirection === "left") {
            angle = 180 + offset;
        }
        sprite.setRotation(Phaser.Math.DegToRad(angle));
    }
}
