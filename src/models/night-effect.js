import Phaser from "phaser";

export default class NightEffect extends Phaser.GameObjects.Rectangle {
    constructor(config) {
        super(
            config.scene,
            config.x,
            config.y,
            config.scene.sys.game.config.width + 100,
            config.scene.sys.game.config.height + 100,
            0x000000,
            0.5
        );
        this.focus = config.character;
        this.scene = config.scene;
        this.setDepth(2);
        this.addToDisplayList();
        this.addToUpdateList();
    }

    flash(duration = 200) {
        this.fillColor = 0xffffff;
        this.scene.time.addEvent({ delay: duration, callback: () => (this.fillColor = 0x000000) });
    }

    preUpdate(t, dt) {
        this.x = this.focus.x;
        this.y = this.focus.y;
    }
}
