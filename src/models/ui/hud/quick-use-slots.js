import InventoryWindow from "../window/inventory-window";

const WIDTH = 28;
const HEIGHT = 88;
const OFFSET_X = 14;
const OFFSET_Y = 14;

export default class QuickUseSlots extends InventoryWindow {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.x = 16;
        this.y = 84;
        this.initialVisibility = true;
        this.firstItemX = this.x - WIDTH / 2 + OFFSET_X;
        this.firstItemY = this.y - HEIGHT / 2 + OFFSET_Y;
        this.sprite = scene.add
            .sprite(this.x, this.y, "quick-use-slots")
            .setOrigin(0.5, 0.5)
            .setScrollFactor(0, 0)
            .setDepth(4);

        this.list = this.createInventory(this.firstItemX, this.firstItemY, 1, 3);
    }
}
