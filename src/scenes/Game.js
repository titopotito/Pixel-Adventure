import Phaser from "phaser";
import Adventurer from "../models/adventurer.js";
import Enemy from "../models/enemy.js";
import Treasure from "../models/treasure.js";

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
            spriteInitialFrame: "idle-down-1.png",
            id: 1,
        });

        const tilesetMap = this.make.tilemap({ key: "tileset" });
        const tilesetImageMap = tilesetMap.addTilesetImage("tileset", "tileset");
        const LAYERS = ["ground", "water", "water-side", "objects", "environment"];
        LAYERS.map((layer) => {
            let item = tilesetMap.createLayer(layer, tilesetImageMap);
            item.setCollisionByProperty({ collision: true });
            this.physics.add.collider(this.adventurer.sprite, item);
        });

        const greenDemonLayer = tilesetMap.getObjectLayer("green-demon");
        greenDemonLayer.objects.forEach((greenDemonObj) => {
            let config = {
                scene: this,
                positionX: greenDemonObj.x,
                positionY: greenDemonObj.y,
                spriteName: "green-demon",
                spriteInitialFrame: "idle-down-1.png",
                id: greenDemonObj.id,
            };
            let greenDemon = new Enemy(config);
        });

        const treasureChestLayer = tilesetMap.getObjectLayer("treasure-chest");
        treasureChestLayer.objects.forEach((treasureChestObj) => {
            let config = {
                scene: this,
                positionX: treasureChestObj.x,
                positionY: treasureChestObj.y,
                spriteName: "treasure-chest",
                spriteInitialFrame: "close-1.png",
                id: treasureChestObj.id,
            };
            let treasureChest = new Treasure(config);
        });
    }

    update() {
        this.adventurer.updateAnimation();
    }
}
