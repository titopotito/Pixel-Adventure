import Phaser from "phaser";

const FROZEN_COLOR = "0x0000FF";

export default class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(config, stats = { level: 1, atk: 5, maxHP: 100 }) {
        super(config.scene, config.x, config.y, config.spriteName);
        config.scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.speed = 100;
        this.currentDirection = "down";
        this.level = 1;
        this.atk = 5;
        this.maxHP = 100;
        this.currentHP = this.maxHP;
        this.isAttacking = false;
        this.isAlive = true;
        this.isFrozen = false;
        this.addToDisplayList();
        this.addToUpdateList();
        this.setDepth(1);
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
        if (!this.isAttacking) {
            this.anims.play(`${this.texture.key}-walk-${direction}`, true);
        }
        this.currentDirection = direction;
    }

    attack() {
        this.anims.play(`${this.texture.key}-attack-${this.currentDirection}`);
        this.isAttacking = true;
    }

    die() {
        this.isAlive = false;
        this.setVelocity(0);
        this.anims.play(`${this.texture.key}-die`);
        this.removeFromUpdateList();
    }

    takeDamage(damage) {
        if (this.currentHP > damage) {
            this.currentHP -= damage;
        } else {
            this.currentHP = 0;
            this.isAlive = false;
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

    receiveMana(mana) {
        if (this.currentMP + mana < this.maxMP) {
            this.currentMP += mana;
        } else {
            this.currentMP = this.maxMP;
        }
    }

    freeze() {
        this.isFrozen = true;
        this.setVelocity(0);
        this.setTint(FROZEN_COLOR);
        this.scene.time.addEvent({
            delay: 4000,
            callback: () => {
                this.isFrozen = false;
                this.setTint();
            },
        });
    }
}
