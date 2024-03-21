import HeavensJudgement from "../skills/heaven-s-judgement";
import Flamethrower from "../skills/flamethrower";
import FreezingField from "../skills/freezing-field";
import PlanetBefall from "../skills/planet-befall";

WINDOW_WIDTH = 150;
WINDOW_HEIGHT = 126;
SPACING = 30;

export default class SkillWindow {
    constructor(scene, adventurer) {
        this.scene = scene;
        this.adventurer = adventurer;
        this.x = scene.sys.game.config.width / 2;
        this.y = scene.sys.game.config.height / 2;
        this.focus = 0;
        this.mode = "list";
        this.list = this.createlist();
        this.btns = this.createBtns();
        this.sprite = scene.add.sprite(this.x, this.y, "skill-window").setScrollFactor(0, 0).setVisible(false);

        this.html = scene.cache.html.get("skill-window");

        // this.levelUpBtn = scene.add
        //     .sprite(this.x + 15, this.y + WINDOW_HEIGHT / 2 - 9 - 24, "button")
        //     .setScrollFactor(0, 0)
        //     .setVisible(false);
        // this.levelUpText = scene.add
        //     .dom(
        //         this.levelUpBtn.x,
        //         this.levelUpBtn.y,
        //         "p",
        //         "class: btn-label; margin: 0; padding: 0; color: white",
        //         "Level-Up"
        //     )
        //     .setScrollFactor(0, 0)
        //     .setVisible(false);

        // this.equipToSkill1Btn = scene.add
        //     .sprite(this.x + 15, this.y + WINDOW_HEIGHT / 2 - 9 - 12, "button")
        //     .setScrollFactor(0, 0)
        //     .setVisible(false);
        // this.equipToSkill1Text = scene.add
        //     .dom(
        //         this.equipToSkill1Btn.x,
        //         this.equipToSkill1Btn.y,
        //         "p",
        //         "class: btn-label; margin: 0; padding: 0; color: white",
        //         "Equip: Skill 1"
        //     )
        //     .setScrollFactor(0, 0)
        //     .setVisible(false);
        // this.equipToSkill2Btn = scene.add
        //     .sprite(this.x + 15, this.y + WINDOW_HEIGHT / 2 - 9, "button")
        //     .setScrollFactor(0, 0)
        //     .setVisible(false);
        // this.equipToSkill2Text = scene.add
        //     .dom(
        //         this.equipToSkill2Btn.x,
        //         this.equipToSkill2Btn.y,
        //         "p",
        //         "class: btn-label; margin: 0; padding: 0; color: white",
        //         "Equip: Skill 2"
        //     )
        //     .setScrollFactor(0, 0)
        //     .setVisible(false);

        this.div = scene.add
            .dom(this.x + 15, this.y)
            .createFromHTML(this.html)
            .setVisible(false)
            .setScrollFactor(0, 0);
        this.updateDiv();

        this.highlightBorder = scene.add
            .sprite(this.x - WINDOW_WIDTH / 2 + 18, this.y - WINDOW_HEIGHT / 2 + 18, "inventory-border-highlight")
            .setScrollFactor(0, 0)
            .setDepth(4)
            .setVisible(false);

        this.btnBorder = scene.add
            .sprite(this.btns[this.focus].x, this.btns[this.focus].y, "button-border")
            .setDepth(4)
            .setScrollFactor(0, 0)
            .setVisible(false);
    }

    createBtns() {
        const btnNames = ["Equip: Skill 2", "Equip: Skill 1", "Level-Up"];
        const btns = [];
        for (let i = 0; i < btnNames.length; i++) {
            let x = this.x + 15;
            let y = this.y + WINDOW_HEIGHT / 2 - 9 - 12 * i;
            btns.push({
                x: x,
                y: y,
                bg: this.scene.add.sprite(x, y, "button").setScrollFactor(0, 0).setDepth(4).setVisible(false),
                text: this.scene.add
                    .dom(x, y, "p", "class: btn-label; margin: 0; padding: 0; color: white", btnNames[i])
                    .setScrollFactor(0, 0)
                    .setVisible(false),
            });
        }
        return btns;
    }

    createlist() {
        const skills = [Flamethrower, FreezingField, HeavensJudgement, PlanetBefall];
        const list = [];
        for (let i = 0; i < skills.length; i++) {
            let x = this.x - WINDOW_WIDTH / 2 + 18;
            let y = this.y - WINDOW_HEIGHT / 2 + 18 + i * SPACING;
            list.push({
                x: x,
                y: y,
                skill: this.adventurer.skills[skills[i].name],
                icon: this.scene.add.sprite(x, y, skills[i].icon).setScrollFactor(0, 0).setDepth(4).setVisible(false),
            });
        }

        return list;
    }

    updateDiv() {
        this.div.getChildByID("skill-name").textContent = this.list[this.focus].skill.name;
        this.div.getChildByID("skill-description").textContent = this.list[this.focus].skill.description;
        this.div.getChildByID("skill-level").textContent = this.list[this.focus].skill.level;
        this.div.getChildByID("skill-damage").textContent = this.list[this.focus].skill.getSkillDamage();
        this.div.getChildByID("skill-cooldown").textContent = this.list[this.focus].skill.cooldown / 1000;
        this.div.getChildByID("skill-mp-cost").textContent = this.list[this.focus].skill.mpCost;
    }

    toggleVisibility() {
        const properties = ["sprite", "div", "highlightBorder"];
        if (this.sprite.visible === true) {
            properties.forEach((property) => this[property].setVisible(false));
            this.list.forEach((item) => item.icon.setVisible(false));
            this.btns.forEach((btn) => {
                console.log(btn);
                btn.bg.setVisible(false);
                btn.text.setVisible(false);
            });
            this.btnBorder.setVisible(false);
        } else {
            properties.forEach((property) => this[property].setVisible(true));
            this.list.forEach((item) => item.icon.setVisible(true));
            this.btns.forEach((btn) => {
                btn.bg.setVisible(true);
                btn.text.setVisible(true);
            });
        }
    }
}
