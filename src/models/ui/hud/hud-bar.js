export default class HudBar {
    constructor(scene, character, x, y, type) {
        this.scene = scene;
        this.character = character;
        this.type = type;
        this.border = scene.add.sprite(x, y, "border-bar").setScrollFactor(0, 0).setOrigin(0, 0).setDepth(3);
        this.bar = scene.add.sprite(x, y, type).setScrollFactor(0, 0).setOrigin(0, 0).setDepth(3);
        this.maxWidth = this.bar.displayWidth;
        this.setText();
    }

    setText() {
        if (this.type === "health-bar") {
            this.hpText = this.scene.add
                .dom(
                    this.bar.x + this.maxWidth / 2,
                    this.bar.y + this.bar.displayHeight / 2,
                    "span",
                    "margin: 0; padding: 0; color: white; font-size: 5px",
                    `${this.character.currentHP}/${this.character.maxHP}`
                )
                .setScrollFactor(0, 0)
                .setDepth(3)
                .setOrigin(0.5, 0.5);
        }

        if (this.type === "mana-bar") {
            this.mpText = this.scene.add
                .dom(
                    this.bar.x + this.maxWidth / 2,
                    this.bar.y + this.bar.displayHeight / 2,
                    "span",
                    "margin: 0; padding: 0; color: white; font-size: 5px",
                    `${this.character.currentMP}/${this.character.maxMP}`
                )
                .setScrollFactor(0, 0)
                .setDepth(3)
                .setOrigin(0.5, 0.5);
        }
    }

    get newHpWidth() {
        const hpPercent = this.character.currentHP / this.character.maxHP;
        const newHpWidth = this.maxWidth * hpPercent;
        return newHpWidth;
    }

    get newMpWidth() {
        const mpPercent = this.character.currentMP / this.character.maxMP;
        const newMpWidth = this.maxWidth * mpPercent;
        return newMpWidth;
    }

    preUpdate(t, dt) {
        if (this.type === "health-bar") {
            this.bar.displayWidth = this.newHpWidth;
            this.hpText.node.textContent = `${this.character.currentHP}/${this.character.maxHP}`;
        }

        if (this.type === "mana-bar") {
            this.bar.displayWidth = this.newMpWidth;
            this.mpText.node.textContent = `${this.character.currentMP}/${this.character.maxMP}`;
        }
    }
}
