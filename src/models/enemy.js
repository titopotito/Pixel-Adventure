import GameSprite from "./game-sprite";
export default class Enemy extends GameSprite {
    constructor(config) {
        super(config);
        this.sprite.speed = 50;
        this.createAnimation("idle", 1);
        this.createAnimation("walk", 4);
        this.createAnimation("attack", 1);
    }
}
