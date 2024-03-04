import GameSprite from "./game-sprite";
export default class Treasure extends GameSprite {
    constructor(config) {
        super(config);
        this.body.pushable = false;
    }

    open() {
        this.createAnims("open", 1);
        this.anims.play(`${this.id}-${this.sprite.texture.key}-open`);
    }
}
