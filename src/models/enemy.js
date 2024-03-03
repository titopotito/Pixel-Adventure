import CharacterSprite from "./character-sprite.js";
export default class Enemy extends CharacterSprite {
    constructor(config) {
        super(config);
        this.sprite.speed = 50;
    }
}
