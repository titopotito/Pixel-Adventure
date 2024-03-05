import CharacterSprite from "./character-sprite.js";
export default class Enemy extends CharacterSprite {
    constructor(config) {
        super(config);
        this.speed = 50;
    }

    die() {
        super.die();
        this.scene.time.addEvent({
            delay: 200,
            callback: () => {
                this.destroy();
            },
        });
    }

    preUpdate(t, d) {
        super.preUpdate(t, d);
        this.walk("up");
    }
}
