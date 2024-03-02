import Phaser from "phaser";
import tilesetPNGUrl from "/public/tileset/tileset.png";
import tilesetJSONUrl from "/public/tileset/tileset.json";
import adventurerPNGUrl from "/public/adventurer/texture.png";
import adventurerJSONUrl from "/public/adventurer/texture.json";
import greenDemonPNGUrl from "/public/enemies/greendemon/texture.png";
import greenDemonJSONUrl from "/public/enemies/greendemon/texture.json";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.load.image("tileset", tilesetPNGUrl);
        this.load.tilemapTiledJSON("tileset", tilesetJSONUrl);
        this.load.atlas("adventurer", adventurerPNGUrl, adventurerJSONUrl);
        this.load.atlas("green-demon", greenDemonPNGUrl, greenDemonJSONUrl);
    }

    create() {
        this.scene.start("game");
    }
}
