import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
    }

    preload() {}

    create() {
        this.character = this.physics.add.sprite(15 * 16, 14 * 16, "character", "idle-down-1.png");
        this.character.setDepth(1);
        this.createAnimation("character", "idle", 1);
        this.createAnimation("character", "walk", 4);
        this.cameras.main.startFollow(this.character, true);

        this.tilesetMap = this.make.tilemap({ key: "tileset" });
        const tilesetImageMap = this.tilesetMap.addTilesetImage("tileset", "tileset");

        const LAYERS = ["ground", "water", "water-side", "objects", "environment"];
        LAYERS.map((layer) => {
            let item = this.tilesetMap.createLayer(layer, tilesetImageMap);
            item.setCollisionByProperty({ collision: true });
            this.physics.add.collider(this.character, item);
            let debugGraphics = this.add.graphics().setAlpha(0.7);
            item.renderDebug(debugGraphics, {
                tileColor: null,
                collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
                faceColor: new Phaser.Display.Color(48, 39, 37, 255),
            });
        });

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
