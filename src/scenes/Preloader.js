import Phaser from "phaser";
import tilesetFloorPNGUrl from "/public/tiles/TilesetFloor.png";
import map1JSONUrl from "/public/tiles/map1.json";
import characterPNGUrl from "/public/character/texture.png";
import characterJSONUrl from "/public/character/texture.json";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.load.image("tileset-floor", tilesetFloorPNGUrl);
        this.load.tilemapTiledJSON("TilesetFloor", map1JSONUrl);

        this.load.atlas("character", characterPNGUrl, characterJSONUrl);
    }

    create() {
        this.scene.start("game");
    }
}
