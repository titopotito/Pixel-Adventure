import Phaser from "phaser";
import EnemyHealthBar from "../models/ui/enemy-health-bar";
import UIBar from "../models/ui/ui-bar";
import HudBtn from "../models/ui/hud-btns";

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

        this.portrait = this.add.sprite(0, 0, "adventurer-portrait");
        this.portrait.setDepth(3);
        this.portrait.setScrollFactor(0, 0);
        this.portrait.setOrigin(0);

        this.skill2Btn = new HudBtn(this, 328, 144, "fire-logo");
        this.skill1Btn = new HudBtn(this, 328, 176, "rock-logo");
        this.atkBtn = new HudBtn(this, 328, 208, "basic-atk-logo");

        this.adventurerHpBar = new UIBar(this, this.data.adventurer, 40, 2, "health-bar");
        this.adventurerManaBar = new UIBar(this, this.data.adventurer, 40, 16, "mana-bar");

        this.greenDemonsHpBarGroup = [];
        this.data.greenDemonsGroup.children.each((greenDemon) => {
            this.greenDemonsHpBarGroup.push(
                new EnemyHealthBar(this, greenDemon, { scale: 0.3, offsetX: 0, offsetY: -16 })
            );
        });
    }

    update(t, dt) {
        this.adventurerHpBar.preUpdate(t, dt);
        this.adventurerManaBar.preUpdate(t, dt);
        this.greenDemonsHpBarGroup.forEach((hPBarUI) => hPBarUI.preUpdate(t, dt));
    }
}
