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
        this.character = this.physics.add.sprite(360 / 2, 240 / 2, "character", "idle-down-1.png");

        this.createAnimation("character", "idle", 1);
        this.createAnimation("character", "walk", 4);
        this.character.anims.play("character-walk-left");

        this.currentDirection = "down";
        this.keyEventMap = {};
        const keyCodes = {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        };

        for (let direction in keyCodes) {
            let keyEvent = this.input.keyboard.addKey(keyCodes[direction], true, true);
            keyEvent.on("up", (e) => {
                this.currentDirection = `${direction}`;
            });
            this.keyEventMap[`${direction}`] = keyEvent;
        }
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

    update() {
        if (this.keyEventMap.up.isDown) {
            this.character.setVelocity(0, -100);
            this.character.anims.play("character-walk-up", true);
        } else if (this.keyEventMap.down.isDown) {
            this.character.setVelocity(0, 100);
            this.character.anims.play("character-walk-down", true);
        } else if (this.keyEventMap.left.isDown) {
            this.character.setVelocity(-100, 0);
            this.character.anims.play("character-walk-left", true);
        } else if (this.keyEventMap.right.isDown) {
            this.character.setVelocity(100, 0);
            this.character.anims.play("character-walk-right", true);
        } else {
            this.character.setVelocity(0, 0);
            this.character.anims.play(`character-idle-${this.currentDirection}`, true);
        }
    }
}
