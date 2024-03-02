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

        this.reddemon = this.physics.add.sprite(17 * 16, 14 * 16, "spirit", "idle-left-1.png");
        this.reddemon.setDepth(1);
        this.createAnimation("idle", 1);
        this.createAnimation("walk", 4);
        this.reddemon.anims.play("spirit-walk-up");

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

    createAnimation(action, numberOfFrames = 1, suffix = ".png") {
        for (let direction of ["up", "down", "left", "right"]) {
            this.reddemon.anims.create({
                key: `spirit-${action}-${direction}`,
                frames: this.reddemon.anims.generateFrameNames("spirit", {
                    start: 1,
                    end: numberOfFrames,
                    prefix: `${action}-${direction}-`,
                    suffix: suffix,
                }),
                repeat: -1,
                frameRate: 5,
            });
        }
    }
}

// let debugGraphics = this.add.graphics().setAlpha(0.7);
// item.renderDebug(debugGraphics, {
//     tileColor: null,
//     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
//     faceColor: new Phaser.Display.Color(48, 39, 37, 255),
// });
