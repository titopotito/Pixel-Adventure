import Phaser from "phaser";
import EnemyHealthBar from "../models/ui/hud/enemy-health-bar";
import SkillBtn from "../models/ui/hud/skill-btn";
import HudBar from "../models/ui/hud/hud-bar";
import InventoryWindow from "../models/ui/window/inventory-window";
import QuickUseSlots from "../models/ui/hud/quick-use-slots";
import SkillWindow from "../models/ui/window/skill-window";

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
        const GAME_WIDTH = this.sys.game.config.width;
        const GAME_HEIGHT = this.sys.game.config.height;
        this.physics.world.bounds.width = GAME_WIDTH * TILE_SIZE.w;
        this.physics.world.bounds.height = GAME_HEIGHT * TILE_SIZE.h;
        this.cameras.main.startFollow(this.data.adventurer, true);

        this.portrait = this.add.sprite(0, 0, "adventurer-portrait").setDepth(3).setScrollFactor(0, 0).setOrigin(0);
        this.inventoryIcon = this.add.sprite(GAME_WIDTH - 15, 14, "inventory-logo").setScrollFactor(0, 0);
        this.skillIcon = this.add.sprite(GAME_WIDTH - 40, 14, "skill-logo").setScrollFactor(0, 0);

        this.inventory = new InventoryWindow(this);
        this.quickUseSlots = new QuickUseSlots(this);
        this.skillWindow = new SkillWindow(this, this.data.adventurer);

        this.atkBtn = new SkillBtn(this, GAME_WIDTH - 20, GAME_HEIGHT - 20, "basic-atk-logo", "keydown-J").setSize(30);
        this.skill2Btn = new SkillBtn(this, GAME_WIDTH - 20, GAME_HEIGHT - 54, "fire-logo", "keydown-L");
        this.skill1Btn = new SkillBtn(this, GAME_WIDTH - 54, GAME_HEIGHT - 20, "ice-logo", "keydown-K");

        this.adventurerHpBar = new HudBar(this, this.data.adventurer, 40, 2, "health-bar");
        this.adventurerManaBar = new HudBar(this, this.data.adventurer, 40, 16, "mana-bar");

        this.greenDemonsHpBarGroup = [];
        this.data.greenDemonsGroup.children.each((greenDemon) => {
            this.greenDemonsHpBarGroup.push(
                new EnemyHealthBar(this, greenDemon, { scale: 0.3, offsetX: 0, offsetY: -16 })
            );
        });

        this.setUpKeyboardEventListeners();
    }

    toggleScene(scene, data = null) {
        if (this.scene.isActive(scene)) this.scene.pause(scene);
        else this.scene.run(scene, data);
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

        // Inventory Window Events
        this.input.keyboard.on("keydown-I", () => {
            this.inventory.toggleVisibility();
            this.toggleScene("inventory-window", {
                inventory: this.inventory,
                quickUseSlots: this.quickUseSlots,
            });
        });

        // Skill Window Events
        this.input.keyboard.on("keydown-O", () => {
            this.skillWindow.toggleVisibility();
            this.toggleScene("skill-window", this.skillWindow);
        });
    }

    update(t, dt) {
        this.adventurerHpBar.preUpdate(t, dt);
        this.adventurerManaBar.preUpdate(t, dt);
        this.greenDemonsHpBarGroup.forEach((hPBarUI) => hPBarUI.preUpdate(t, dt));
    }
}
