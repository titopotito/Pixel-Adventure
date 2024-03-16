import Phaser from "phaser";
import Potion from "./potion";
import eventsCenter from "../events/events-center";

export default class TreasureChest extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.spriteName);
        config.scene.physics.add.existing(this);
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        this.body.pushable = false;
        this.isOpened = false;
        this.gold = Math.ceil(Math.random() * 10);
        this.hasHpPotion = this.randomTrueOrFalse();
        this.hasMpPotion = this.randomTrueOrFalse();
        this.addToDisplayList();
        this.addToUpdateList();
        this.setDepth(1);
    }

    randomTrueOrFalse() {
        if (Math.random() > 0.45) return true;
        return false;
    }

    open() {
        if (this.isOpened) return;

        this.isOpened = true;

        this.anims.play(`${this.texture.key}-open`);
        this.scene.sound.add("coin").play();
        this.removeFromUpdateList();
        this.scene.time.addEvent({ delay: 1000, callback: () => this.destroy() });

        eventsCenter.emit("gold-gained", this.gold);

        if (this.hasHpPotion) new Potion(this.scene, this.x, this.y, "hp-potion").startAnimation();
        if (this.hasMpPotion) new Potion(this.scene, this.x, this.y, "mp-potion").startAnimation();
    }
}
