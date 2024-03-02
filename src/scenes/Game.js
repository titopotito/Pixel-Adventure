import Phaser from "phaser";
import Adventurer from "../game_objects/adventurer.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
    }

    preload() {}

    create() {
        this.adventurer = new Adventurer({
            scene: this,
            positionX: 15 * 16,
            positionY: 14 * 16,
            spriteName: "adventurer",
        });

        // ADDING MAP
        const tilesetMap = this.make.tilemap({ key: "tileset" });
        const tilesetImageMap = tilesetMap.addTilesetImage("tileset", "tileset");
        const LAYERS = ["ground", "water", "water-side", "objects", "environment"];
        LAYERS.map((layer) => {
            let item = tilesetMap.createLayer(layer, tilesetImageMap);
            item.setCollisionByProperty({ collision: true });
            this.physics.add.collider(this.adventurer.sprite, item);
        });
    }

    update() {
        this.adventurer.playAnimation();
    }
}

// let debugGraphics = this.add.graphics().setAlpha(0.7);
// item.renderDebug(debugGraphics, {
//     tileColor: null,
//     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
//     faceColor: new Phaser.Display.Color(48, 39, 37, 255),
// });
