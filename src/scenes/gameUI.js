import Phaser from "phaser";
import EnemyHealthBar from "../models/ui/enemy-health-bar";
import UIBar from "../models/ui/ui-bar";
import HudBtn from "../models/ui/hud-btns";
import GoldCounter from "../models/ui/gold-counter";
import Inventory from "../models/ui/inventory";
import QuickUseSlots from "../models/ui/quick-use-slots";

export default class GameUI extends Phaser.Scene {
    constructor() {
        super("gameUI");
    }

    init(data) {
        this.data = data;
    }

    preload() {}

    create() {
        const TILE_SIZE = { w: 16, h: 16 };
        this.physics.world.bounds.width = this.sys.game.config.width * TILE_SIZE.w;
        this.physics.world.bounds.height = this.sys.game.config.height * TILE_SIZE.h;
        this.cameras.main.startFollow(this.data.adventurer, true);

        this.inventory = new Inventory(this);

        this.quickUseSlots = new QuickUseSlots(this);

        this.portrait = this.add.sprite(0, 0, "adventurer-portrait").setDepth(3).setScrollFactor(0, 0).setOrigin(0);

        this.skill2Btn = new HudBtn(this, 334, 180, "fire-logo", "keydown-L");
        this.skill1Btn = new HudBtn(this, 300, 214, "ice-logo", "keydown-K");
        this.atkBtn = new HudBtn(this, 334, 214, "basic-atk-logo", "keydown-J");
        this.atkBtn.setDisplaySize(30);

        this.adventurerHpBar = new UIBar(this, this.data.adventurer, 40, 2, "health-bar");
        this.adventurerManaBar = new UIBar(this, this.data.adventurer, 40, 16, "mana-bar");

        this.greenDemonsHpBarGroup = [];
        this.data.greenDemonsGroup.children.each((greenDemon) => {
            this.greenDemonsHpBarGroup.push(
                new EnemyHealthBar(this, greenDemon, { scale: 0.3, offsetX: 0, offsetY: -16 })
            );
        });

        this.setUpKeyboardEventListeners();
    }

    setUpKeyboardEventListeners() {
        // Quick-Use-Slot Events
        this.input.keyboard.on("keydown-ONE", () => {
            let itemName = this.quickUseSlots.useItem(0);
            this.inventory.findItemAndUpdate(itemName);
        });
        this.input.keyboard.on("keydown-TWO", () => {
            let itemName = this.quickUseSlots.useItem(1);
            this.inventory.findItemAndUpdate(itemName);
        });
        this.input.keyboard.on("keydown-THREE", () => {
            let itemName = this.quickUseSlots.useItem(2);
            this.inventory.findItemAndUpdate(itemName);
        });

        // Inventory Events
        this.input.keyboard.on("keydown-I", () => {
            this.inventory.toggleVisibility();
        });
        this.input.keyboard.on("keydown-RIGHT", () => {
            this.inventory.focus += 1;
            if (this.inventory.focus >= 30) this.inventory.focus -= 6;
            this.inventory.highlightBorder.x = this.inventory.list[this.inventory.focus].x;
            this.inventory.highlightBorder.y = this.inventory.list[this.inventory.focus].y;
        });
        this.input.keyboard.on("keydown-DOWN", () => {
            this.inventory.focus += 6;
            if (this.inventory.focus >= 30) this.inventory.focus -= 30;
            this.inventory.highlightBorder.x = this.inventory.list[this.inventory.focus].x;
            this.inventory.highlightBorder.y = this.inventory.list[this.inventory.focus].y;
        });
        this.input.keyboard.on("keydown-LEFT", () => {
            this.inventory.focus -= 1;
            if (this.inventory.focus < 0) this.inventory.focus += 6;
            this.inventory.highlightBorder.x = this.inventory.list[this.inventory.focus].x;
            this.inventory.highlightBorder.y = this.inventory.list[this.inventory.focus].y;
        });
        this.input.keyboard.on("keydown-UP", () => {
            this.inventory.focus -= 6;
            if (this.inventory.focus < 0) this.inventory.focus += 30;
            this.inventory.highlightBorder.x = this.inventory.list[this.inventory.focus].x;
            this.inventory.highlightBorder.y = this.inventory.list[this.inventory.focus].y;
        });
        this.input.keyboard.on("keydown-ENTER", () => {
            if (this.inventory.sprite.visible === false) return;
            let itemName = this.inventory.useItem(this.inventory.focus);
            this.quickUseSlots.findItemAndUpdate(itemName);
        });
    }

    update(t, dt) {
        this.adventurerHpBar.preUpdate(t, dt);
        this.adventurerManaBar.preUpdate(t, dt);
        this.greenDemonsHpBarGroup.forEach((hPBarUI) => hPBarUI.preUpdate(t, dt));
    }
}
