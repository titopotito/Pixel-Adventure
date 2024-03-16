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

    useItem(number) {
        const slot = this.slots[number - 1];
        if (slot.item.length === 0) return;

        slot.item.pop().use();
        slot.textQuantity.text = slot.item.length;

        if (slot.item.length === 0) {
            slot.textQuantity.destroy();
            slot.textBorder.destroy();
            slot.itemSprite.destroy();
            slot.textQuantity = null;
            slot.textBorder = null;
            slot.itemSprite = null;
            slot.type = null;
        }
    }

    createInventory() {
        return [
            {
                item: [],
                type: null,
                itemSprite: null,
                textQuantity: null,
                textBorder: null,

                // background
                sprite: this.scene.add
                    .sprite(this.x, this.y, "inv-border")
                    .setDepth(3)
                    .setScrollFactor(0, 0)
                    .setOrigin(0),
            },
            {
                item: [],
                type: null,
                itemSprite: null,
                textQuantity: null,
                textBorder: null,

                // background
                sprite: this.scene.add
                    .sprite(this.x + 22, this.y, "inv-border")
                    .setDepth(3)
                    .setScrollFactor(0, 0)
                    .setOrigin(0),
            },
        ];
    }

    findItemAndAdd(newItem) {
        for (let slot of this.slots) {
            if (slot.item.length !== 0 && Object.values(slot).includes(newItem.type)) {
                slot.item.push(newItem);
                slot.textQuantity.text = slot.item.length;
                return slot;
            }
        }

        return null;
    }

    addNewItem(newItem) {
        for (let slot of this.slots) {
            if (slot.item.length === 0) {
                slot.item.push(newItem);
                slot.type = newItem.type;

                slot.itemSprite = this.scene.add
                    .sprite(slot.sprite.x, slot.sprite.y, newItem.type)
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
                    .text(slot.sprite.x + 20, slot.sprite.y + 21, 1, { fontSize: 8, color: "0x000000" })
                    .setDepth(5)
                    .setScrollFactor(0, 0)
                    .setOrigin(0.5);

                return slot;
            }
        }
    }
}
