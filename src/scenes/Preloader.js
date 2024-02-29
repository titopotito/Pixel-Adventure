import Phaser from "phaser";
import tilesetPNGUrl from "/public/tileset/tileset.png";
import tilesetJSONUrl from "/public/tileset/tileset.json";
import characterPNGUrl from "/public/character/texture.png";
import characterJSONUrl from "/public/character/texture.json";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.load.image("tileset", tilesetPNGUrl);
        this.load.tilemapTiledJSON("tileset", tilesetJSONUrl);
        this.load.atlas("character", characterPNGUrl, characterJSONUrl);
    }

    create() {
        this.scene.start("game");
    }
}
