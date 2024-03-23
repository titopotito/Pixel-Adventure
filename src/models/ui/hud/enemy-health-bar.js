export default class EnemyHealthBar {
    constructor(scene, character, config) {
        this.scene = scene;
        this.character = character;
        this.border = scene.add.sprite(0, 0, "border-bar").setScale(config.scale).setDepth(3);
        this.bar = scene.add.sprite(0, 0, "health-bar").setOrigin(0, 0).setScale(config.scale).setDepth(3);
        this.maxWidth = this.bar.displayWidth;
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

    get newHpWidth() {
        const hpPercent = this.character.currentHP / this.character.maxHP;
        const newHpWidth = this.maxWidth * hpPercent;
        return newHpWidth;
    }

    preUpdate(t, dt) {
        this.bar.x = this.newPosition.x - this.border.displayWidth / 2;
        this.bar.y = this.newPosition.y - this.border.displayHeight / 2;
        this.border.x = this.newPosition.x;
        this.border.y = this.newPosition.y;

        this.bar.displayWidth = this.newHpWidth;

        if (this.character.currentHP === 0) {
            this.bar.destroy();
            this.border.destroy();
            delete this;
        }
    }
}
