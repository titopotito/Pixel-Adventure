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

        this.skill2Btn = new HudBtn(this, 345, 225, "fire-logo", "keydown-L");
        this.skill1Btn = new HudBtn(this, 318, 225, "rock-logo", "keydown-K");
        this.atkBtn = new HudBtn(this, 291, 225, "basic-atk-logo", "keydown-J");

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
        this.input.keyboard.on("keydown-I", () => {
            this.inventory.toggleVisibility();
        });

        this.input.keyboard.on("keydown-ONE", () => {
            let itemName = this.quickUseSlots.useItem(1);
            this.inventory.findItemAndUpdate(itemName);
        });
        this.input.keyboard.on("keydown-TWO", () => {
            let itemName = this.quickUseSlots.useItem(2);
            this.inventory.findItemAndUpdate(itemName);
        });
        this.input.keyboard.on("keydown-THREE", () => {
            let itemName = this.quickUseSlots.useItem(3);
            this.inventory.findItemAndUpdate(itemName);
        });
    }

    update(t, dt) {
        this.adventurerHpBar.preUpdate(t, dt);
        this.adventurerManaBar.preUpdate(t, dt);
        this.greenDemonsHpBarGroup.forEach((hPBarUI) => hPBarUI.preUpdate(t, dt));
    }
}
