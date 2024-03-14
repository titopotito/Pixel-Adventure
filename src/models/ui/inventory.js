import eventsCenter from "../events/events-center";

export default class Inventory {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.slots = this.createInventory();

        eventsCenter.on("add-item", (newItem) => {
            const item = this.findItemAndAdd(newItem);
            if (item === null) this.addNewItem(newItem);
        });
    }

    createInventory() {
        return [
            {
                sprite: this.scene.add
                    .sprite(this.x, this.y, "inv-border")
                    .setDepth(3)
                    .setScrollFactor(0, 0)
                    .setOrigin(0),
                item: null,
                quantity: null,
                textQuantity: null,
                textBorder: null,
                itemSprite: null,
            },
            {
                sprite: this.scene.add
                    .sprite(this.x + 22, this.y, "inv-border")
                    .setDepth(3)
                    .setScrollFactor(0, 0)
                    .setOrigin(0),
                item: null,
                quantity: null,
                textQuantity: null,
                textBorder: null,
                itemSprite: null,
            },
        ];
    }

    findItemAndAdd(newItem) {
        for (let slot of this.slots) {
            if (slot.item !== null && Object.values(slot).includes(newItem.item)) {
                slot.quantity += newItem.quantity;
                slot.textQuantity.text = slot.quantity;
                return slot;
            }
        }

        return null;
    }

    addNewItem(newItem) {
        for (let slot of this.slots) {
            if (slot.item === null) {
                slot.item = newItem.item;
                slot.quantity = newItem.quantity;
                slot.itemSprite = this.scene.add
                    .sprite(slot.sprite.x, slot.sprite.y, newItem.key)
                    .setDepth(4)
                    .setScrollFactor(0, 0)
                    .setOrigin(0);
                slot.textBorder = this.scene.add
                    .rectangle(slot.sprite.x + 20, slot.sprite.y + 20, 7, 7, "0xffffff")
                    .setDepth(5)
                    .setScrollFactor(0, 0)
                    .setOrigin(0.5)
                    .setStrokeStyle(1, "0x000000", 1);
                slot.textQuantity = this.scene.add
                    .text(slot.sprite.x + 20, slot.sprite.y + 21, slot.quantity, { fontSize: 8, color: "0x000000" })
                    .setDepth(5)
                    .setScrollFactor(0, 0)
                    .setOrigin(0.5);

                return;
            }
        }
    }
}
