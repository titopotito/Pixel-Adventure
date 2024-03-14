import Phaser from "phaser";
import eventsCenter from "../events/events-center";
import * as utilFns from "../utils/sprite-util-functions";

export default class PlanetBefall {
    constructor(caster, keyCode = null) {
        this.caster = caster;
        this.scene = caster.scene;
        this.offsetFromCaster = 68;
        this.cooldown = 5000;
        this.isOnCooldown = false;
        this.keyCode = keyCode;
        this.mpCost = 10;
    }

    static get name() {
        return "planet-befall";
    }

    static get spriteName() {
        return "rock2-sprite";
    }

    static get animationKey() {
        return "skill-rock2-cast";
    }

    static get dmgTable() {
        return {
            "lvl-1": 1,
            "lvl-2": 1.1,
            "lvl-3": 1.2,
            "lvl-4": 1.3,
            "lvl-5": 1.4,
            "lvl-6": 1.5,
            "lvl-7": 1.6,
            "lvl-8": 1.7,
            "lvl-9": 1.8,
            "lvl-10": 1.9,
        };
    }

    startCooldown() {
        this.isOnCooldown = true;
        this.scene.time.addEvent({ delay: this.cooldown, callback: () => (this.isOnCooldown = false) });
        eventsCenter.emit(`${this.keyCode}-start-cooldown`, this.cooldown);
    }

    cast() {
        if (this.isOnCooldown) return;

        this.startCooldown();

        const position = utilFns.getSpawnPosition(this.caster, this.offsetFromCaster);
        const rock2Sprite = new Phaser.Physics.Arcade.Sprite(
            this.scene,
            position.x,
            position.y,
            PlanetBefall.spriteName
        )
            .setScale(4)
            .setDepth(2);

        // time event to delay the collision of the sprite and enemy
        this.scene.time.addEvent({
            delay: 800,
            callback: () => {
                this.scene.physics.add.collider(rock2Sprite, this.caster.target, (rock2Sprite, target) => {
                    target.takeDamage(this.caster.atk * PlanetBefall.dmgTable["lvl-1"]);
                });
            },
        });

        utilFns.playAnimationForManyThenDestroy(this.scene, [rock2Sprite], PlanetBefall.animationKey, 1100);
    }
}
