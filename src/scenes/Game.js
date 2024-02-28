import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
    }

    preload() {}

    create() {
        this.map = this.make.tilemap({ key: "TilesetFloor" });
        const tileset = this.map.addTilesetImage("TilesetFloor", "tileset-floor");

        this.map.createLayer("ground", tileset);

        const character = this.add.sprite(360 / 2, 240 / 2, "character", "walk-down-4.png");

        this.anims.create({
            key: "idle",
            frames: [{ key: "character", frame: "idle-right-1.png" }],
        });

        this.createAnimation("character", "idle", 1);
        this.createAnimation("character", "walk", 4);
        character.anims.play("character-walk-left");
    }

    createAnimation(spriteName, action, numberOfFrames = 1, suffix = ".png") {
        for (let direction of ["up", "down", "left", "right"]) {
            this.anims.create({
                key: `${spriteName}-${action}-${direction}`,
                frames: this.anims.generateFrameNames(spriteName, {
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
