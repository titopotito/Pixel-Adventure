export default class UIBar {
    constructor(scene, character, x, y, type) {
        this.scene = scene;
        this.character = character;
        this.type = type;
        this.bar = scene.add.sprite(x, y, type);
        this.border = scene.add.sprite(x, y, "border-bar");

        this.bar.setScrollFactor(0, 0);
        this.border.setScrollFactor(0, 0);
        this.bar.setOrigin(0, 0);
        this.border.setOrigin(0, 0);
        this.bar.setDepth(3);
        this.border.setDepth(3);

        this.bar.maxWidth = this.bar.displayWidth;
        this.setText();
    }

    setText() {
        if (this.type === "health-bar") {
            this.hpText = this.scene.add.text(
                this.bar.x + this.bar.maxWidth / 2,
                this.bar.y + this.bar.displayHeight / 2,
                `${this.character.currentHP}/${this.character.maxHP}`,
                { fontSize: 10 }
            );
            this.hpText.setScrollFactor(0, 0);
            this.hpText.setDepth(3);
            this.hpText.setOrigin(0.5, 0.5);
        }
    }

    get newHpWidth() {
        const hpPercent = this.character.currentHP / this.character.maxHP;
        const newHpWidth = this.bar.maxWidth * hpPercent;
        return newHpWidth;
    }

    preUpdate(t, dt) {
        if (this.type === "health-bar") {
            this.bar.displayWidth = this.newHpWidth;
            this.hpText.text = `${this.character.currentHP}/${this.character.maxHP}`;
        }
    }
}
