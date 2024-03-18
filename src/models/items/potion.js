import Phaser from "phaser";
import eventsCenter from "../events/events-center";

export default class Potion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name = "hp-potion") {
        super(scene, x, y, name);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.name = name;
        this.isStackable = true;
        this.setDepth(4);
        this.setScale(0.5);
        this.addToDisplayList();
    }

    use() {
        const healing = 20;
        const manaRecovery = 20;

        this.scene.sound.add("recover").play();

        if (this.name === "hp-potion") {
            this.scene.adventurer.receiveHealing(healing);
            this.destroy(true);
        }

        if (this.name === "mp-potion") {
            this.scene.adventurer.receiveMana(manaRecovery);
            this.destroy(true);
        }
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
                    eventsCenter.emit("add-item", this);
                    this.scene.sound.add("potion").play();
                    this.body.destroy();
                    this.removeFromDisplayList();
                });
            },
        });
    }
}

// TO DO - ENABLE USE OF POTIONS
