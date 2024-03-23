import Phaser from "phaser";

export default class InventoryWindow extends Phaser.Scene {
    constructor() {
        super("inventory-window");
    }

    init(data) {
        this.inventory = data.inventory;
        this.quickUseSlots = data.quickUseSlots;
    }

    preload() {}

    create() {
        this.sound.add("menu");

        this.input.keyboard.on("keydown-RIGHT", () => {
            this.inventory.focus += 1;
            if (this.inventory.focus >= 30) this.inventory.focus -= 6;
            this.inventory.highlightBorder.x = this.inventory.list[this.inventory.focus].x;
            this.inventory.highlightBorder.y = this.inventory.list[this.inventory.focus].y;
            this.sound.play("menu");
        });

        this.input.keyboard.on("keydown-DOWN", () => {
            this.inventory.focus += 6;
            if (this.inventory.focus >= 30) this.inventory.focus -= 30;
            this.inventory.highlightBorder.x = this.inventory.list[this.inventory.focus].x;
            this.inventory.highlightBorder.y = this.inventory.list[this.inventory.focus].y;
            this.sound.play("menu");
        });

        this.input.keyboard.on("keydown-LEFT", () => {
            this.inventory.focus -= 1;
            if (this.inventory.focus < 0) this.inventory.focus += 6;
            this.inventory.highlightBorder.x = this.inventory.list[this.inventory.focus].x;
            this.inventory.highlightBorder.y = this.inventory.list[this.inventory.focus].y;
            this.sound.play("menu");
        });

        this.input.keyboard.on("keydown-UP", () => {
            this.inventory.focus -= 6;
            if (this.inventory.focus < 0) this.inventory.focus += 30;
            this.inventory.highlightBorder.x = this.inventory.list[this.inventory.focus].x;
            this.inventory.highlightBorder.y = this.inventory.list[this.inventory.focus].y;
            this.sound.play("menu");
        });

        this.input.keyboard.on("keydown-ENTER", () => {
            if (this.inventory.sprite.visible === false) return;
            let itemName = this.inventory.useItem(this.inventory.focus);
            this.quickUseSlots.findItemAndUpdate(itemName);
        });

        this.input.keyboard.on("keydown-O", () => {
            this.inventory.toggleVisibility();
            this.scene.pause("inventory-window");
        });
    }

    update(t, dt) {}
}
