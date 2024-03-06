import CharacterSprite from "./character-sprite.js";
export default class Enemy extends CharacterSprite {
    constructor(config) {
        super(config);
        this.speed = 50;
        this.body.pushable = false;
    }

    die() {
        super.die();
        this.setVelocity(0);
        this.removeFromUpdateList();
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

    chasePlayer() {
        if (!this.target) return;

        const distance = this.getdistanceFromTarget();
        if (distance.d < 80 && distance.d > 20) {
            if (Math.abs(distance.dx) > Math.abs(distance.dy) && distance.dx > 0) {
                this.walk("left");
            } else if (Math.abs(distance.dx) > Math.abs(distance.dy) && distance.dx < 0) {
                this.walk("right");
            } else if (Math.abs(distance.dx) < Math.abs(distance.dy) && distance.dy > 0) {
                this.walk("up");
            } else {
                this.walk("down");
            }
        } else if (distance.d < 20) {
            this.attack();
            this.setVelocity(0);
        } else {
            this.idle();
        }
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.chasePlayer();
    }
}
