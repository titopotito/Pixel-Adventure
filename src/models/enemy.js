import CharacterSprite from "./character-sprite.js";
import AttackEffect from "./attack-effect.js";

export default class Enemy extends CharacterSprite {
    constructor(config) {
        super(config);
        this.body.pushable = false;
        this.speed = 50;
        this.attackCooldownTime = 2000;
        this.lastAttackTime = 0;
        this.attackRange = 24;
        this.detectionRange = 80;
        this.atk = 1;
    }

    die() {
        super.die();
        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.destroy();
            },
        });
    }

    setTarget(player) {
        this.target = player;
    }

    getdistanceFromTarget() {
        const dx = this.x - this.target.x;
        const dy = this.y - this.target.y;
        const d = Math.sqrt(dx ** 2 + dy ** 2);
        const distance = { dx, dy, d };
        return distance;
    }

    attack() {
        // play attack animation and scratch effect then enter attacking state
        super.attack();
        const scratchEffect = new AttackEffect(this, "scratch", 0.5);
        scratchEffect.play();

        // set scratch effect to collide with target
        this.scene.physics.add.collider(scratchEffect, this.target, (scratch, target) => {
            target.takeDamage(this.atk);
        });

        // prevent enemy sprite from moving while attack animation is playing
        this.setVelocity(0);

        // record time of this attack
        this.lastAttackTime = this.scene.time.now;

        // Attacking state will end after 200ms and then temporarily enter idle mode
        this.scene.time.addEvent({
            delay: 200,
            callback: () => {
                scratchEffect.destroy();
                this.isAttacking = false;
                this.idle();
            },
        });
    }

    chasePlayer() {
        if (!this.target) return;

        const distance = this.getdistanceFromTarget();

        // chase enemy if it is in detection range
        if (distance.d < this.detectionRange && distance.d > this.attackRange) {
            if (Math.abs(distance.dx) > Math.abs(distance.dy) && distance.dx > 0) {
                this.walk("left");
            } else if (Math.abs(distance.dx) > Math.abs(distance.dy) && distance.dx < 0) {
                this.walk("right");
            } else if (Math.abs(distance.dx) < Math.abs(distance.dy) && distance.dy > 0) {
                this.walk("up");
            } else {
                this.walk("down");
            }
        }
        // if target is attack range:
        // do attack if attack is not on cooldown
        // do nothing if attack is on cooldown
        else if (distance.d <= this.attackRange) {
            if (!this.isAttackOnCooldown) {
                this.attack();
            } else {
                // do nothing during cooldown time
                this.scene.time.addEvent({
                    delay: this.attackCooldownTime,
                });
            }
        }
        // play idle animation if target is not in detection and attack range
        else {
            this.idle();
        }
    }

    get isAttackOnCooldown() {
        const dt = this.scene.time.now - this.lastAttackTime;
        if (dt > this.attackCooldownTime) {
            return false;
        }
        return true;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.chasePlayer();
    }
}
