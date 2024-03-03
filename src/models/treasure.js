import GameSprite from "./game-sprite";
export default class Treasure extends GameSprite {
    constructor(config) {
        super(config);
        this.id = config.id;
    }

    open() {
        this.createAnims("open", 1);
        this.sprite.anims.play(`${this.id}-${this.sprite.texture.key}-open`);
    }
}
