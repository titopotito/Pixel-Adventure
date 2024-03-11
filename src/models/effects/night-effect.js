import Phaser from "phaser";

export default class NightEffect extends Phaser.GameObjects.Rectangle {
    constructor(scene) {
        super(scene, 0, 0, scene.sys.game.config.width * 16, scene.sys.game.config.height * 16, 0x000000, 0.5);
        this.scene = scene;
        this.setDepth(2);
        this.addToDisplayList();
        this.addToUpdateList();
    }

    flash(duration = 200) {
        this.fillColor = 0xffffff;
        this.scene.time.addEvent({ delay: duration, callback: () => (this.fillColor = 0x000000) });
    }
}
