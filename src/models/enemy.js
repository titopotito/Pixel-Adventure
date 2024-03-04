import CharacterSprite from "./character-sprite.js";
export default class Enemy extends CharacterSprite {
    constructor(config) {
        super(config);
        this.speed = 50;
    }

    preUpdate(t, d) {
        super.preUpdate(t, d);
        this.walk("up");
    }
}
