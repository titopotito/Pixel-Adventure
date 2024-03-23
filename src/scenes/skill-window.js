import Phaser from "phaser";

export default class SkillWindow extends Phaser.Scene {
    constructor() {
        super("skill-window");
    }

    init(skillWindow) {
        this.skillWindow = skillWindow;
    }

    preload() {}

    create() {
        this.sound.add("menu");
        this.sound.add("pressed");

        this.input.keyboard.on("keydown-UP", () => {
            if (this.skillWindow.mode === "list") {
                this.skillWindow.listFocus -= 1;
                if (this.skillWindow.listFocus < 0) this.skillWindow.listFocus = 0;
                this.skillWindow.highlightBorder.x = this.skillWindow.list[this.skillWindow.listFocus].x;
                this.skillWindow.highlightBorder.y = this.skillWindow.list[this.skillWindow.listFocus].y;
                this.skillWindow.updateDiv();
            } else {
                this.skillWindow.btnFocus -= 1;
                if (this.skillWindow.btnFocus < 0) this.skillWindow.btnFocus = 0;
                this.skillWindow.btnBorder.x = this.skillWindow.btns[this.skillWindow.btnFocus].x;
                this.skillWindow.btnBorder.y = this.skillWindow.btns[this.skillWindow.btnFocus].y;
            }

            this.sound.play("menu");
        });

        this.input.keyboard.on("keydown-DOWN", () => {
            if (this.skillWindow.mode === "list") {
                this.skillWindow.listFocus += 1;
                if (this.skillWindow.listFocus > 3) this.skillWindow.listFocus = 3;
                this.skillWindow.highlightBorder.x = this.skillWindow.list[this.skillWindow.listFocus].x;
                this.skillWindow.highlightBorder.y = this.skillWindow.list[this.skillWindow.listFocus].y;
                this.skillWindow.updateDiv();
            } else {
                this.skillWindow.btnFocus += 1;
                if (this.skillWindow.btnFocus > 2) this.skillWindow.btnFocus = 2;
                this.skillWindow.btnBorder.x = this.skillWindow.btns[this.skillWindow.btnFocus].x;
                this.skillWindow.btnBorder.y = this.skillWindow.btns[this.skillWindow.btnFocus].y;
            }

            this.sound.play("menu");
        });

        this.input.keyboard.on("keydown-RIGHT", () => {
            this.skillWindow.btnFocus = 0;
            this.skillWindow.mode = "btns";
            this.skillWindow.btnBorder.x = this.skillWindow.btns[this.skillWindow.btnFocus].x;
            this.skillWindow.btnBorder.y = this.skillWindow.btns[this.skillWindow.btnFocus].y;
            this.skillWindow.highlightBorder.setVisible(false);
            this.skillWindow.btnBorder.setVisible(true);
            this.sound.play("menu");
        });

        this.input.keyboard.on("keydown-LEFT", () => {
            this.skillWindow.listFocus = 0;
            this.skillWindow.mode = "list";
            this.skillWindow.highlightBorder.x = this.skillWindow.list[this.skillWindow.listFocus].x;
            this.skillWindow.highlightBorder.y = this.skillWindow.list[this.skillWindow.listFocus].y;
            this.skillWindow.highlightBorder.setVisible(true);
            this.skillWindow.btnBorder.setVisible(false);
            this.skillWindow.updateDiv();
            this.sound.play("menu");
        });

        this.input.keyboard.on("keydown-I", () => {
            this.skillWindow.toggleVisibility();
            this.scene.pause("skill-window");
        });

        this.input.keyboard.on("keydown-ENTER", () => {
            if (this.skillWindow.mode === "list") return;

            let isSuccess = this.skillWindow.btns[this.skillWindow.btnFocus].clickFunc();
            if (isSuccess) this.sound.play("pressed");
            else this.sound.play("reject");
        });
    }

    update(t, dt) {}
}
