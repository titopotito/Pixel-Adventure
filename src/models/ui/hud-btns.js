import Phaser from "phaser";
import eventsCenter from "../events/events-center";

export default class HudBtn {
    constructor(scene, x, y, logoKey, keyboardKey) {
        this.scene = scene;
        this.keyboardKey = keyboardKey;
        this.displaySize = 24;

        this.bg = scene.add
            .sprite(x, y, "btn-bg")
            .setDisplaySize(this.displaySize, this.displaySize)
            .setDepth(4)
            .setScrollFactor(0, 0)
            .setAlpha(0.7);

        this.logo = scene.add
            .sprite(x, y, logoKey)
            .setDisplaySize(this.displaySize, this.displaySize)
            .setDepth(4)
            .setScrollFactor(0, 0)
            .setAlpha(0.7);

        this.onCooldown = false;

        eventsCenter.on(`${keyboardKey}-start-cooldown`, (cooldown) => this.startCooldownAnimation(cooldown));
        eventsCenter.on(`${keyboardKey}-set-active`, (duration) => this.setActive(duration));
    }

    setDisplaySize(size) {
        this.displaySize = size;
        this.bg.setDisplaySize(size, size);
        this.logo.setDisplaySize(size, size);
    }

    setActive(duration) {
        this.bg.postFX.addGlow(0xffffff, 1, 0, false);
        this.bg.postFX.addShine(1, 1, 2, false);

        this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.bg.clearFX();
            },
        });
    }

    startCooldownAnimation(cooldown) {
        if (this.onCooldown) return;

        this.onCooldown = true;

        const cooldownStartTime = this.scene.time.now;

        const cooldownBg = this.scene.add
            .sprite(this.bg.x, this.bg.y, "btn-bg")
            .setDisplaySize(this.displaySize, this.displaySize)
            .setDepth(4)
            .setScrollFactor(0, 0)
            .setTint(0x000000)
            .setAlpha(0.5);

        const graphics = new Phaser.GameObjects.Graphics(this.scene).setScrollFactor(0, 0);

        const cooldownMask = new Phaser.Display.Masks.GeometryMask(this.scene, graphics);
        cooldownMask.invertAlpha = true;
        cooldownBg.mask = cooldownMask;

        this.scene.tweens.add({
            targets: graphics,
            height: 0,
            ease: "Power1",
            duration: cooldown,

            onUpdate: () => {
                const dt = this.scene.time.now - cooldownStartTime;
                const percent = dt / cooldown;

                graphics.fillRect(
                    cooldownBg.x - (cooldownBg.displayWidth - 2) / 2,
                    cooldownBg.y - (cooldownBg.displayHeight - 2) / 2,
                    cooldownBg.displayWidth - 2,
                    (cooldownBg.displayHeight - 2) * percent
                );
            },

            onComplete: () => {
                cooldownBg.destroy();
                graphics.destroy();
                cooldownMask.destroy();
                this.onCooldown = false;
            },
        });
    }
}
