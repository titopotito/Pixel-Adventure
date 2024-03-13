export default class HudBtn {
    constructor(scene, x, y, logoKey) {
        this.bg = scene.add.sprite(x, y, "btn-bg");
        this.bg.setDisplaySize(31, 31);
        this.bg.setDepth(3);
        this.bg.setScrollFactor(0, 0);

        this.logo = scene.add.sprite(x, y, logoKey);
        this.logo.setDisplaySize(31, 31);
        this.logo.setDepth(3);
        this.logo.setScrollFactor(0, 0);
    }
}
