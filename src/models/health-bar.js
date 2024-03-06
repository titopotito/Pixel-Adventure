import Phaser from "phaser";

const RED_COLOR = "0xff0000";
const GREEN_COLOR = "0x00ff00";

export default class HealthBarUI extends Phaser.GameObjects.Rectangle {
    constructor(scene, character, config) {
        const hpPercent = character.currentHP / character.maxHP;

        const maxHpBar = {
            x: character.x + config.offsetX,
            y: character.y + config.offsetY,
            width: config.width,
            height: config.height,
            color: RED_COLOR,
        };

        const currentHpBar = {
            x: maxHpBar.x - maxHpBar.width / 2,
            y: maxHpBar.y - maxHpBar.height / 2,
            width: maxHpBar.width * hpPercent,
            height: maxHpBar.height,
            color: GREEN_COLOR,
        };

        super(scene, maxHpBar.x, maxHpBar.y, maxHpBar.width, maxHpBar.height, maxHpBar.color);
        this.addToDisplayList();

        this.currentHpBar = scene.add
            .rectangle(currentHpBar.x, currentHpBar.y, currentHpBar.width, currentHpBar.height, currentHpBar.color)
            .setOrigin(0, 0);

        if (config.withText) {
            this.hPText = scene.add
                .text(maxHpBar.x, maxHpBar.y, `${character.currentHP}/${character.maxHP}`, { fontSize: 7 })
                .setOrigin(0.5, 0.5);
        }

        this.character = character;
        this.offsetX = config.offsetX;
        this.offsetY = config.offsetY;
        this.withText = config.withText;
    }

    get newPosition() {
        const newPosition = {
            x: this.character.x + this.offsetX,
            y: this.character.y + this.offsetY,
        };
        return newPosition;
    }

    get newHpWidth() {
        const hpPercent = this.character.currentHP / this.character.maxHP;
        const newHpWidth = this.width * hpPercent;
        return newHpWidth;
    }

    preUpdate(t, dt) {
        this.x = this.newPosition.x;
        this.y = this.newPosition.y;
        this.currentHpBar.x = this.x - this.width / 2;
        this.currentHpBar.y = this.y - this.height / 2;
        this.currentHpBar.width = this.newHpWidth;
        if (this.withText) {
            this.hPText.x = this.x;
            this.hPText.y = this.y;
        }
        if (this.currentHpBar.width === 0) {
            this.destroy();
        }
    }
}
