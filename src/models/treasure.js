import GameSprite from "./game-sprite";
export default class Treasure extends GameSprite {
    constructor(config) {
        super(config);
        this.body.pushable = false;
    }

    open() {
        this.anims.play(`${this.texture.key}-open`);
        console.log("opened");
        this.removeFromUpdateList();
    }
}
