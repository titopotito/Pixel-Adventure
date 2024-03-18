import eventsCenter from "../events/events-center";

export default class GoldCounter {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.goldCount = 0;
        this.setText();

        eventsCenter.on("gold-gained", (data) => {
            const { x, y, amount } = data;
            this.add(amount);
            this.text.text = this.goldCount;
            this.startAnimatedAmount(amount, x, y);
        });

        eventsCenter.on("gold-spent", (amount) => {
            this.subtract(amount);
            this.text.text = this.goldCount;
        });
    }

    startAnimatedAmount(amount, x, y) {
        const text = this.scene.add
            .text(x, y - 16, `+${amount}`, { fontSize: 10, color: "#FFD700" })
            .setDepth(3)
            .setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            y: y - 20,
            duration: 1500,
            ease: "Power1",
            onComplete: () => text.destroy(),
        });
    }

    setText() {
        this.text = this.scene.add
            .text(this.x + 6, this.y + 1, `${this.goldCount}`, { fontSize: 10, color: "#FFD700" })
            .setDepth(4)
            .setScrollFactor(0, 0)
            .setOrigin(1, 1)
            .setVisible(false);
    }

    add(amount) {
        this.goldCount += amount;
    }

    subtract(amount) {
        this.goldCount -= amount;
    }
}
