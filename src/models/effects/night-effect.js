import Phaser from "phaser";

const MAP_DIMENSION = { x: 200, y: 200 };

export default class NightEffect extends Phaser.GameObjects.Rectangle {
    constructor(scene) {
        super(scene, 0, 0, MAP_DIMENSION.x * 16, MAP_DIMENSION.y * 16, 0x000000, 0.5);
        this.scene = scene;
        this.setDepth(2);
        this.addToDisplayList();
        this.addToUpdateList();
        this.setOrigin(0, 0);
    }

    flash(duration = 200) {
        this.fillColor = 0xffffff;
        this.scene.time.addEvent({ delay: duration, callback: () => (this.fillColor = 0x000000) });
    }
}
