import CharacterSprite from "./character-sprite.js";
export default class Enemy extends CharacterSprite {
    constructor(config) {
        super(config);
        this.speed = 50;
    }

    die() {
        super.die();
        this.removeFromUpdateList();
        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.destroy();
            },
        });
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.walk("up");
    }
}
