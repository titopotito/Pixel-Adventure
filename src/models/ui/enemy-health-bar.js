export default class EnemyHealthBar {
    constructor(scene, character, config) {
        this.scene = scene;
        this.character = character;
        this.bar = scene.add.sprite(0, 0, "health-bar");
        this.border = scene.add.sprite(0, 0, "border-bar");
        this.offsetX = config.offsetX;
        this.offsetY = config.offsetY;

        this.bar.setOrigin(0, 0);
        this.bar.setScale(config.scale);
        this.border.setScale(config.scale);
        this.bar.setDepth(3);
        this.border.setDepth(3);

        this.bar.maxWidth = this.bar.displayWidth;
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
        const newHpWidth = this.bar.maxWidth * hpPercent;
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
