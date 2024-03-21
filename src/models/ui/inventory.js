import eventsCenter from "../events/events-center";
import GoldCounter from "./gold-counter";

const SPACING = 30;
const INVENORY_WIDTH = 188;
const INVENTORY_HEIGHT = 179;
const OFFSET_X = 18;
const OFFSET_Y = 29;

export default class Inventory {
    constructor(scene) {
        this.scene = scene;
        this.x = scene.sys.game.config.width / 2;
        this.y = scene.sys.game.config.height / 2;
        this.focus = 0;

        this.initialVisibility = false;

        this.sprite = scene.add
            .sprite(this.x, this.y, "inventory")
            .setOrigin(0.5, 0.5)
            .setScrollFactor(0, 0)
            .setVisible(this.initialVisibility)
            .setDepth(4);

        this.gold = new GoldCounter(scene, this.x + INVENORY_WIDTH / 2 - 22, this.y + INVENTORY_HEIGHT / 2 - 3);

        this.firstItemX = this.x - INVENORY_WIDTH / 2 + OFFSET_X;
        this.firstItemY = this.y - INVENTORY_HEIGHT / 2 + OFFSET_Y;

        this.list = this.createInventory(this.firstItemX, this.firstItemY, 6, 5);

        this.highlightBorder = scene.add
            .sprite(this.firstItemX, this.firstItemY, "inventory-border-highlight")
            .setScrollFactor(0, 0)
            .setDepth(4)
            .setVisible(false);

        eventsCenter.on("add-item", (newItem) => {
            const foundItem = this.findItemAndAdd(newItem);
            if (foundItem === null) this.addNewItem(newItem);
        });
    }

    createInventory(initialX, initialY, lengthX, lengthY) {
        const list = [];

        for (let i = 0; i < lengthY; i++) {
            for (let j = 0; j < lengthX; j++) {
                let x = initialX + SPACING * j;
                let y = initialY + SPACING * i;
                let slot = {
                    x: x,
                    y: y,
                    name: null,
                    item: null,
                    isStackable: null,
                    sprite: null,
                    textBorder: null,
                    textQuantity: null,
                };
                list.push(slot);
            }
        }

        return list;
    }

    clearSlot(slot) {
        if (slot.isStackable === false) slot.item.destroy();
        slot.sprite.destroy();
        slot.textQuantity.destroy();
        slot.textBorder.destroy();
        slot.name = null;
        slot.item = null;
        slot.isStackable = null;
        slot.sprite = null;
        slot.textQuantity = null;
        slot.textBorder = null;
    }

    findItemAndUpdate(name) {
        for (let slot of this.list) {
            if (slot.name === name && slot.isStackable === true) {
                slot.item.pop().destroy();
                slot.textQuantity.text = slot.item.length;
                if (slot.item.length === 0) this.clearSlot(slot);
                return slot;
            }
        }
    }

    useItem(number) {
        let slot = this.list[number];
        let itemName = slot.name;

        if (slot.item === null) return;

        if (slot.isStackable === false) slot.item.use();
        else {
            slot.item.pop().use();
            slot.textQuantity.text = slot.item.length;

            if (slot.item.length === 0) {
                this.clearSlot(slot);
            }
            return itemName;
        }
    }

    findItemAndAdd(newItem) {
        for (let slot of this.list) {
            if (Object.values(slot).includes(newItem.name)) {
                if (newItem.isStackable === false) slot.item = newItem;
                else {
                    slot.item.push(newItem);
                    slot.textQuantity.text = slot.item.length;
                }
                return slot;
            }
        }

        return null;
    }

    toggleVisibility() {
        if (this.sprite.visible === false) {
            this.sprite.setVisible(true);
            this.gold.text.setVisible(true);
            this.highlightBorder.setVisible(true);
            this.list.forEach((slot) => {
                if (slot.item !== null) {
                    slot.sprite.setVisible(true);
                    slot.textBorder.setVisible(true);
                    slot.textQuantity.setVisible(true);
                }
            });
        } else {
            this.sprite.setVisible(false);
            this.gold.text.setVisible(false);
            this.highlightBorder.setVisible(false);
            this.list.forEach((slot) => {
                if (slot.item !== null) {
                    slot.sprite.setVisible(false);
                    slot.textBorder.setVisible(false);
                    slot.textQuantity.setVisible(false);
                }
            });
        }
    }

    addNewItem(newItem) {
        for (let slot of this.list) {
            if (slot.item === null) {
                slot.name = newItem.name;

                if (newItem.isStackable === false) slot.item = newItem;
                else {
                    const textPositionOffset = { x: 10, y: 10 };

                    slot.item = [newItem];

                    slot.isStackable = newItem.isStackable;

                    slot.sprite = this.scene.add
                        .sprite(slot.x, slot.y, newItem.name)
                        .setDepth(4)
                        .setScrollFactor(0, 0)
                        .setVisible(this.initialVisibility);

                    slot.textBorder = this.scene.add
                        .rectangle(slot.x + textPositionOffset.x, slot.y + textPositionOffset.y, 7, 7, "0xffffff")
                        .setDepth(5)
                        .setScrollFactor(0, 0)
                        .setOrigin(0.5)
                        .setStrokeStyle(1, "0x000000", 1)
                        .setVisible(this.initialVisibility);

                    slot.textQuantity = this.scene.add
                        .text(slot.x + textPositionOffset.x, slot.y + textPositionOffset.y, 1, {
                            fontSize: 8,
                            color: "0x000000",
                        })
                        .setDepth(5)
                        .setScrollFactor(0, 0)
                        .setOrigin(0.5)
                        .setVisible(this.initialVisibility);
                }

                return slot;
            }
        }
    }
}
