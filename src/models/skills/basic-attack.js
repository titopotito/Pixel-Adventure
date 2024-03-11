import Phaser from "phaser";
import * as utilFns from "../utils/sprite-util-functions";

export default class BasicAttack {
    constructor(caster, animationKey, scale = 1, offsetFromCaster = 8) {
        this.caster = caster;
        this.scene = caster.scene;
        this.animationKey = animationKey;
        this.scale = scale;
        this.offsetFromCaster = offsetFromCaster;
    }

    cast() {
        const position = utilFns.getSpawnPosition(this.caster, this.offsetFromCaster);
        const attackEffectSprite = new Phaser.Physics.Arcade.Sprite(
            this.scene,
            position.x,
            position.y,
            "basic-attack-sprite"
        );
        attackEffectSprite.setScale(this.scale);
        this.scene.physics.add.overlap(attackEffectSprite, this.caster.target, (attackEffectSprite, target) => {
            target.takeDamage(this.caster.atk);
        });
        utilFns.playAnimationForManyThenDestroy(this.scene, [attackEffectSprite], this.animationKey);
        utilFns.rotateBaseOnCharacterDirection(this.caster, attackEffectSprite, -45);
    }
}
