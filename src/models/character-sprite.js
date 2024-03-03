import GameSprite from "./game-sprite.js";
export default class CharacterSprite extends GameSprite {
    constructor(config, stats = { level: 1, atk: 10, maxHP: 100 }) {
        super(config);
        this.sprite.speed = 100;
        this.sprite.currentDirection = "down";
        this.level = stats.level;
        this.atk = stats.atk;
        this.maxHP = stats.maxHP;
        this.currentHP = this.maxHP;

        this.createAnimsWithDirection("idle", 1);
        this.createAnimsWithDirection("walk", 4, -1);
        this.createAnimsWithDirection("attack", 1);
        this.createAnims("die", 1);
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
        this.sprite.setVelocity(0, 0);
        this.sprite.anims.play(`${this.id}-${this.sprite.texture.key}-idle-${this.sprite.currentDirection}`, true);
    }

    walk(direction) {
        const velocityMap = {
            up: { x: 0, y: -this.sprite.speed },
            down: { x: 0, y: this.sprite.speed },
            left: { x: -this.sprite.speed, y: 0 },
            right: { x: this.sprite.speed, y: 0 },
        };
        this.sprite.setVelocity(velocityMap[direction].x, velocityMap[direction].y);
        this.sprite.anims.play(`${this.id}-${this.sprite.texture.key}-walk-${direction}`, true);
        this.sprite.currentDirection = direction;
    }

    attack() {
        this.sprite.anims.play(`${this.id}-${this.sprite.texture.key}-attack-${this.sprite.currentDirection}`);
    }

    die() {
        this.sprite.anims.play(`${this.id}-${this.sprite.texture.key}-die`);
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
