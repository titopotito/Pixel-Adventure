import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    preload() {}

    create() {
        const text = this.add.text(720 / 2, 480 / 2, "hello world");

        text.setOrigin(0.5);
    }
}
