import Phaser from "phaser";
import eventsCenter from "../events/events-center";

export default class Potion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type = "hp") {
        super(scene, x, y, `${type}-potion`);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.type = type;
        this.setDepth(4);
        this.setScale(0.5);
        this.addToDisplayList();
    }

    startAnimation() {
        const randPosition = Phaser.Math.RandomXY({ x: 16, y: 16 }, 16);
        this.scene.tweens.add({
            targets: this,
            x: this.x + randPosition.x,
            y: this.y + randPosition.y,
            duration: 500,
            ease: "Power1",
            onComplete: () => {
                this.scene.physics.add.overlap(this.scene.adventurer, this, () => {
                    eventsCenter.emit("add-item", {
                        item: `${this.type}-potion`,
                        quantity: 1,
                        key: `${this.type}-potion`,
                    });
                    this.destroy();
                });
            },
        });
    }
}
