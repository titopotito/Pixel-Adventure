import Phaser from "phaser";
import eventsCenter from "../events/events-center";

export default class HudBtn {
    constructor(scene, x, y, logoKey, keyboardKey) {
        this.scene = scene;

        this.bg = scene.add.sprite(x, y, "btn-bg");
        this.bg.setDisplaySize(31, 31);
        this.bg.setDepth(3);
        this.bg.setScrollFactor(0, 0);

        this.logo = scene.add.sprite(x, y, logoKey);
        this.logo.setDisplaySize(31, 31);
        this.logo.setDepth(3);
        this.logo.setScrollFactor(0, 0);

        this.onCooldown = false;

        eventsCenter.on(keyboardKey, (duration) => this.startCooldownAnimation(duration));
    }

    startCooldownAnimation(duration) {
        if (this.onCooldown) return;

        this.onCooldown = true;

        const cooldownStartTime = this.scene.time.now;

        const cooldownBg = this.scene.add.sprite(this.bg.x, this.bg.y, "btn-bg");
        cooldownBg.setDisplaySize(31, 31);
        cooldownBg.setDepth(4);
        cooldownBg.setScrollFactor(0, 0);
        cooldownBg.tint = 0x000000;
        cooldownBg.alpha = 0.5;

        const graphics = new Phaser.GameObjects.Graphics(this.scene);
        graphics.setScrollFactor(0, 0);

        const cooldownMask = new Phaser.Display.Masks.GeometryMask(this.scene, graphics);
        cooldownMask.invertAlpha = true;
        cooldownBg.mask = cooldownMask;

        this.scene.tweens.add({
            targets: graphics,
            height: 0,
            ease: "Power1",
            duration: duration,

            onUpdate: () => {
                const dt = this.scene.time.now - cooldownStartTime;
                const percent = dt / duration;

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
