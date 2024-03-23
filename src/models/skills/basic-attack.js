import Phaser from "phaser";
import * as utilFns from "./util-functions";

export default class BasicAttack {
    constructor(caster, animationKey, scale = 1, offsetFromCaster = 8) {
        this.caster = caster;
        this.scene = caster.scene;
        this.animationKey = animationKey;
        this.scale = scale;
        this.offsetFromCaster = offsetFromCaster;
    }

    cast() {
        const p = utilFns.getSpawnPosition(this.caster, this.offsetFromCaster);
        const basicAtkSprite = new Phaser.Physics.Arcade.Sprite(this.scene, p.x, p.y, "basic-attack-sprite");
        basicAtkSprite.setScale(this.scale);

        this.scene.physics.add.overlap(basicAtkSprite, this.caster.target, (basicAtkSprite, target) => {
            target.takeDamage(this.caster.atk);
        });

        utilFns.playAnimationForManyThenDestroy(this.scene, [basicAtkSprite], this.animationKey);
        utilFns.rotateBaseOnCharacterDirection(this.caster, basicAtkSprite, -45);
    }
}
