import Phaser from "phaser";
import GameSprite from "./game-sprite";

export default class AttackEffect extends GameSprite {
    constructor(character, effectName, scale = 1) {
        const effectConfig = { scene: character.scene, spriteName: effectName };

        let angle = 0;
        if (character.currentDirection === "down") {
            effectConfig.positionX = character.x;
            effectConfig.positionY = character.y + character.height / 2;
            angle = 90;
        } else if (character.currentDirection === "up") {
            effectConfig.positionX = character.x;
            effectConfig.positionY = character.y - character.height / 2;
            angle = 270;
        } else if (character.currentDirection === "left") {
            effectConfig.positionX = character.x - character.width / 2;
            effectConfig.positionY = character.y;
            angle = 180;
        } else {
            effectConfig.positionX = character.x + character.width / 2;
            effectConfig.positionY = character.y;
        }

        super(effectConfig);
        this.setRotation(Phaser.Math.DegToRad(angle));
        this.effectName = effectName;
        this.scale = scale;
    }

    play() {
        this.anims.playAfterDelay({ key: `${this.effectName}-${this.effectName}`, frameRate: 20 }, 40);
    }
}
