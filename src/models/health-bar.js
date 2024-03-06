import Phaser from "phaser";

const RED_COLOR = "0xff0000";
const GREEN_COLOR = "0x00ff00";

export default class HealthBarUI extends Phaser.GameObjects.Rectangle {
    constructor(scene, character, config) {
        const hpPercent = character.currentHP / character.maxHP;

        const maxHPBar = {
            x: character.x + config.offsetX,
            y: character.y + config.offsetY,
            width: config.width,
            height: config.height,
            color: RED_COLOR,
        };

        const currentHPBar = {
            x: maxHPBar.x - maxHPBar.width / 2,
            y: maxHPBar.y - maxHPBar.height / 2,
            width: maxHPBar.width * hpPercent,
            height: maxHPBar.height,
            color: GREEN_COLOR,
        };

        super(scene, maxHPBar.x, maxHPBar.y, maxHPBar.width, maxHPBar.height, maxHPBar.color);
        this.addToDisplayList();

        this.currentHPBar = scene.add
            .rectangle(currentHPBar.x, currentHPBar.y, currentHPBar.width, currentHPBar.height, currentHPBar.color)
            .setOrigin(0, 0);

        this.hpText = scene.add
            .text(maxHPBar.x, maxHPBar.y, `${character.currentHP}/${character.maxHP}`, { fontSize: 7 })
            .setOrigin(0.5, 0.5);

        this.character = character;
        this.offsetX = config.offsetX;
        this.offsetY = config.offsetY;
    }

    get newPosition() {
        const newPosition = {
            x: this.character.x + this.offsetX,
            y: this.character.y + this.offsetY,
        };
        return newPosition;
    }

    preUpdate(t, dt) {
        this.x = this.newPosition.x;
        this.y = this.newPosition.y;
        this.currentHPBar.x = this.x - this.width / 2;
        this.currentHPBar.y = this.y - this.height / 2;
        this.hpText.x = this.x;
        this.hpText.y = this.y;
    }
}
