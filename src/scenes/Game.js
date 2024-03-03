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
        const TILE_SIZE = { w: 16, h: 16 };
        const CHARACTER_STARTING_POSITION = { x: 15, y: 14 };
        this.physics.world.bounds.width = this.sys.config.width * TILE_SIZE.w;
        this.physics.world.bounds.height = this.sys.config.height * TILE_SIZE.h;

        const TILESET_MAP = this.make.tilemap({ key: "tileset" });
        const TILESET_MAP_IMAGE = TILESET_MAP.addTilesetImage("tileset", "tileset");
        const LAYERS = ["ground", "water", "water-side", "objects", "environment"];

        this.adventurer = new Adventurer({
            scene: this,
            positionX: CHARACTER_STARTING_POSITION.x * TILE_SIZE.w,
            positionY: CHARACTER_STARTING_POSITION.y * TILE_SIZE.h,
            spriteName: "adventurer",
            spriteInitialFrame: "idle-down-1.png",
            id: 1,
        });

        const greenDemonLayer = TILESET_MAP.getObjectLayer("green-demon");
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
            this.physics.add.collider(this.adventurer.sprite, greenDemon.sprite);
        });

        const treasureChestLayer = TILESET_MAP.getObjectLayer("treasure-chest");
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
            this.physics.add.collider(this.adventurer.sprite, treasureChest.sprite);
        });

        LAYERS.forEach((layer) => {
            let item = TILESET_MAP.createLayer(layer, TILESET_MAP_IMAGE);
            item.setCollisionByProperty({ collision: true });
            this.physics.add.collider(this.adventurer.sprite, item);
        });
    }

    update() {
        this.adventurer.updateAnimation();
    }
}
