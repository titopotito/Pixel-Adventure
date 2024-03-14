import eventsCenter from "../events/events-center";

export default class GoldCounter {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.goldCount = 0;
        this.bg = scene.add.sprite(x, y, "gold-count").setDepth(3).setScrollFactor(0, 0).setOrigin(0);
        this.setText();

        eventsCenter.on("gold-gained", (amount) => {
            this.add(amount);
            this.text.text = this.goldCount;
            this.startAnimatedAmount(amount);
        });

        eventsCenter.on("gold-spent", (amount) => {
            this.subtract(amount);
            this.text.text = this.goldCount;
        });
    }

    startAnimatedAmount(amount) {
        const text = this.scene.add
            .text(this.x + 10, this.y + 20, `+${amount}`, { fontSize: 10, color: "#FFD700" })
            .setDepth(3)
            .setScrollFactor(0, 0)
            .setOrigin(0);

        this.scene.tweens.add({
            targets: text,
            y: this.y + 10,
            duration: 1500,
            ease: "Power1",
            onComplete: () => text.destroy(),
        });
    }

    setText() {
        this.text = this.scene.add
            .text(this.x + 6, this.y + 1, `${this.goldCount}`, { fontSize: 12, color: "#FFD700" })
            .setDepth(4)
            .setScrollFactor(0, 0)
            .setOrigin(0);
    }

    add(amount) {
        this.goldCount += amount;
    }

    subtract(amount) {
        this.goldCount -= amount;
    }
}
