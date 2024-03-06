import Phaser from "phaser";
import HealthBarUI from "../models/health-bar";

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
        this.adventurerHpBar = new HealthBarUI(this, this.data.adventurer, {
            width: 100,
            height: 6,
            offsetX: 0,
            offsetY: 100,
            withText: true,
        });

        this.greenDemonsHpBarGroup = [];
        this.data.greenDemonsGroup.children.each((greenDemon) => {
            this.greenDemonsHpBarGroup.push(
                new HealthBarUI(this, greenDemon, { width: 20, height: 4, offsetX: 0, offsetY: -12 })
            );
        });
    }

    update(t, dt) {
        this.adventurerHpBar.preUpdate(t, dt);
        this.greenDemonsHpBarGroup.forEach((hPBarUI) => hPBarUI.preUpdate(t, dt));
    }
}
