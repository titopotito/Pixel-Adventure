const SKILL_TABLE = {
    fire: {
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
    lightning: {
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

export default class Skill {
    constructor(skillName, caster, target = null) {
        this.caster = caster;
        this.scene = caster.scene;
        this.skillName = skillName;
        this.target = target;
        this.skillTable = SKILL_TABLE;
        this.setStats();
    }

    cast() {
        if (this.skillName === "freezing-field") {
            this.iceSkill();
        }
    }

    setStats() {
        this.cooldown = this.skillTable[this.skillName].cooldown;
        this.skillDamage = this.skillTable[this.skillName].stats["lvl-1"].dmg;
    }

    iceSkill() {
        const spawnPositions = this.getSpawnPositions();

        const iceSprites = spawnPositions.map((position) => {
            let iceSprite = new Phaser.Physics.Arcade.Sprite(this.caster.scene, position.x, position.y, "ice-sprite");
            this.scene.physics.add.collider(iceSprite, this.caster.target, (slash, target) => {
                target.takeDamage(this.caster.atk * this.skillDamage);
                target.freeze();
            });
            return iceSprite;
        });

        this.playAnimationForManyThenDestroy(iceSprites.slice(0, 3), "skill-ice-cast")
            .then((sprites) => {
                return this.playAnimationForManyThenDestroy(iceSprites.slice(3, 6), "skill-ice-cast");
            })
            .then((sprites) => {
                return this.playAnimationForManyThenDestroy(iceSprites.slice(6, 9), "skill-ice-cast");
            });
    }

    // gets the spawn position of the icicles
    getSpawnPositions() {
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

    // method for destroying an array of sprites after a given delay
    destroyManyAfterDelay(sprites, delay) {
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                sprites.forEach((sprite) => sprite.destroy());
            },
        });
    }

    //  create body for sprites > play animation > destroy sprite after delay
    playAnimationForManyThenDestroy(sprites, animationKey) {
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
                delay: 100,
                callback: () => {
                    resolve(sprites);

                    // delay by another 400ms before destroying each sprite needed to play-out the whole animation
                    this.destroyManyAfterDelay(sprites, 400);
                },
            });
        });
    }
}
