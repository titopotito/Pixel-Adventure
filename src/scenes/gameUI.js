import Phaser from "phaser";

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

        const GREEN_COLOR = "0x00ff00";
        const RED_COLOR = "0xff0000";

        this.maxAdventurerHealthBar = this.add.rectangle(
            this.sys.game.config.width / 2,
            this.sys.game.config.height - 20,
            100,
            6,
            RED_COLOR
        );
        this.adventurerHealthBar = this.add.rectangle(
            this.sys.game.config.width / 2 - 50,
            this.sys.game.config.height - 20 - 3,
            80,
            6,
            GREEN_COLOR
        );
        this.adventurerHealthBar.setOrigin(0, 0);

        this.adventurerHP = this.add
            .text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height - 20,
                `${this.data.adventurer.currentHP}/${this.data.adventurer.maxHP}`,
                { fontSize: 7 }
            )
            .setOrigin(0.5, 0.5);
    }

    update() {
        const hpPercent = (this.data.adventurer.currentHP - 10) / this.data.adventurer.maxHP;
        this.adventurerHealthBar.width = hpPercent * this.maxAdventurerHealthBar.width;
    }
}
