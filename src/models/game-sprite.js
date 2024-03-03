export default class GameSprite {
    constructor(config, stats = { level: 1, atk: 10, maxHP: 100 }) {
        this.sprite = config.scene.physics.add.sprite(
            config.positionX,
            config.positionY,
            config.spriteName,
            "idle-down-1.png"
        );

        this.sprite.setDepth(1);
        this.sprite.speed = 100;
        this.sprite.currentDirection = "down";

        this.level = stats.level;
        this.atk = stats.atk;
        this.maxHP = stats.maxHP;
        this.currentHP = this.maxHP;

        console.log(this);
    }

    get stats() {
        return {
            level: this.level,
            atk: this.atk,
            maxHP: this.maxHP,
        };
    }

    set stats(stats) {
        this.level = stats.level;
        this.atk = stats.atk;
        this.maxHP = stats.maxHP;
    }

    receiveDamage(damage) {
        if (this.currentHP > damage) {
            this.currentHP -= damage;
        } else {
            this.currentHP = 0;
            this.die();
        }
    }

    die() {}

    receiveHealing(heal) {
        if (this.currentHP + heal < this.maxHP) {
            this.currentHP += heal;
        } else {
            this.currentHP = this.maxHP;
        }
    }

    idle() {
        this.sprite.setVelocity(0, 0);
        this.sprite.anims.play(`${this.sprite.texture.key}-idle-${this.sprite.currentDirection}`, true);
    }

    walk(direction) {
        const velocityMap = {
            up: { x: 0, y: -this.sprite.speed },
            down: { x: 0, y: this.sprite.speed },
            left: { x: -this.sprite.speed, y: 0 },
            right: { x: this.sprite.speed, y: 0 },
        };
        this.sprite.setVelocity(velocityMap[direction].x, velocityMap[direction].y);
        this.sprite.anims.play(`${this.sprite.texture.key}-walk-${direction}`, true);
        this.sprite.currentDirection = direction;
    }

    attack() {
        this.sprite.anims.play(`${this.sprite.texture.key}-attack-${this.sprite.currentDirection}`);
    }

    createAnimation(action, numberOfFrames = 1, suffix = ".png") {
        for (let direction of ["up", "down", "left", "right"]) {
            this.sprite.scene.anims.create({
                key: `${this.sprite.texture.key}-${action}-${direction}`,
                frames: this.sprite.anims.generateFrameNames(this.sprite.texture.key, {
                    start: 1,
                    end: numberOfFrames,
                    prefix: `${action}-${direction}-`,
                    suffix: suffix,
                }),
                repeat: -1,
                frameRate: 5,
            });
        }
    }
}

// this.greendemon = this.physics.add.sprite(17 * 16, 14 * 16, "green-demon", "idle-left-1.png");
// this.greendemon.setDepth(1);
// this.updateAnimation("green-demon", "walk", 4);
// this.greendemon.anims.play("green-demon-walk-right");
