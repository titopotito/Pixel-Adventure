import GameSprite from "./game-sprite.js";
export default class CharacterSprite extends GameSprite {
    constructor(config, stats = { level: 1, atk: 10, maxHP: 100 }) {
        super(config);
        this.body.collideWorldBounds = true;
        this.speed = 100;
        this.currentDirection = "down";
        this.level = stats.level;
        this.atk = stats.atk;
        this.maxHP = stats.maxHP;
        this.currentHP = 90;
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

    idle() {
        this.setVelocity(0, 0);
        this.anims.play(`${this.texture.key}-idle-${this.currentDirection}`, true);
    }

    walk(direction) {
        const velocityMap = {
            up: { x: 0, y: -this.speed },
            down: { x: 0, y: this.speed },
            left: { x: -this.speed, y: 0 },
            right: { x: this.speed, y: 0 },
        };
        this.setVelocity(velocityMap[direction].x, velocityMap[direction].y);
        this.anims.play(`${this.texture.key}-walk-${direction}`, true);
        this.currentDirection = direction;
    }

    attack() {
        this.anims.play(`${this.texture.key}-attack-${this.currentDirection}`);
    }

    die() {
        this.anims.play(`${this.texture.key}-die`);
    }

    receiveDamage(damage) {
        if (this.currentHP > damage) {
            this.currentHP -= damage;
        } else {
            this.currentHP = 0;
            this.die();
        }
    }

    receiveHealing(heal) {
        if (this.currentHP + heal < this.maxHP) {
            this.currentHP += heal;
        } else {
            this.currentHP = this.maxHP;
        }
    }
}