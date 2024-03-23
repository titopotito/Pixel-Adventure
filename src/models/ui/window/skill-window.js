import HeavensJudgement from "../../skills/heaven-s-judgement";
import Flamethrower from "../../skills/flamethrower";
import FreezingField from "../../skills/freezing-field";
import PlanetBefall from "../../skills/planet-befall";
import eventsCenter from "../../events/events-center";

const WINDOW_WIDTH = 150;
const WINDOW_HEIGHT = 126;
const SPACING = 30;
const MODES = { List: "list", Btns: "btns" };

export default class SkillWindow {
    constructor(scene, adventurer) {
        this.scene = scene;
        this.adventurer = adventurer;
        this.x = scene.sys.game.config.width / 2;
        this.y = scene.sys.game.config.height / 2;
        this.listFocus = 0;
        this.btnFocus = 0;
        this.mode = MODES.List;
        this.list = this.createlist();
        this.btns = this.createBtns();
        this.sprite = scene.add.sprite(this.x, this.y, "skill-window").setScrollFactor(0, 0).setVisible(false);

        this.html = scene.cache.html.get("skill-window");

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
            .sprite(this.btns[this.listFocus].x, this.btns[this.listFocus].y, "button-border")
            .setDepth(4)
            .setScrollFactor(0, 0)
            .setVisible(false);
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

    createBtns() {
        const btns = [];
        const positions = [
            { x: this.x + 15, y: this.y + WINDOW_HEIGHT / 2 - 9 - 24 },
            { x: this.x + 15, y: this.y + WINDOW_HEIGHT / 2 - 9 - 12 },
            { x: this.x + 15, y: this.y + WINDOW_HEIGHT / 2 - 9 },
        ];
        const texts = ["Equip: Skill 2", "Equip: Skill 1", "Level UP"];
        const funcs = [
            () => {
                let skill = this.list[this.listFocus].skill;

                if (this.checkIfAlreadyEquipped(skill)) return;

                this.adventurer.setSkill2(skill);
                eventsCenter.emit(`keydown-L-equip-skill`, skill);
                this.scene.sound.add("pressed").play();
            },
            () => {
                let skill = this.list[this.listFocus].skill;

                if (this.checkIfAlreadyEquipped(skill)) return;

                this.adventurer.setSkill1(skill);
                eventsCenter.emit(`keydown-K-equip-skill`, skill);
                this.scene.sound.add("pressed").play();
            },
            () => {
                let skill = this.list[this.listFocus].skill;
                this.scene.sound.add("pressed").play();
            },
        ];

        for (let i = 0; i < 3; i++) {
            btns[i] = {
                x: positions[i].x,
                y: positions[i].y,
                bg: this.scene.add
                    .sprite(positions[i].x, positions[i].y, "button")
                    .setScrollFactor(0, 0)
                    .setDepth(4)
                    .setVisible(false),
                text: this.scene.add
                    .dom(
                        positions[i].x,
                        positions[i].y,
                        "p",
                        "class: btn-label; margin: 0; padding: 0; color: white",
                        texts[i]
                    )
                    .setScrollFactor(0, 0)
                    .setVisible(false),
                clickFunc: funcs[i],
            };
        }

        return btns;
    }

    checkIfAlreadyEquipped(skill) {
        if (skill.name === this.adventurer.skill1.name || skill.name === this.adventurer.skill2.name) return true;
        return false;
    }

    updateDiv() {
        this.div.getChildByID("skill-name").textContent = this.list[this.listFocus].skill.name;
        this.div.getChildByID("skill-description").textContent = this.list[this.listFocus].skill.description;
        this.div.getChildByID("skill-level").textContent = this.list[this.listFocus].skill.level;
        this.div.getChildByID("skill-damage").textContent = this.list[this.listFocus].skill.getSkillDamage();
        this.div.getChildByID("skill-cooldown").textContent = this.list[this.listFocus].skill.cooldown / 1000;
        this.div.getChildByID("skill-mp-cost").textContent = this.list[this.listFocus].skill.mpCost;
    }

    resetDefault() {
        this.mode = "list";
        this.listFocus = 0;
        this.btnFocus = 0;
        this.highlightBorder.x = this.list[0].x;
        this.highlightBorder.y = this.list[0].y;
        this.updateDiv();
    }

    toggleVisibility() {
        this.resetDefault();

        const properties = ["sprite", "div", "highlightBorder"];
        if (this.sprite.visible === true) {
            properties.forEach((property) => this[property].setVisible(false));
            this.list.forEach((item) => item.icon.setVisible(false));
            this.btns.forEach((btn) => {
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
