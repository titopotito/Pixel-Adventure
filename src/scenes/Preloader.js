import Phaser from "phaser";
import tilesetPNGUrl from "/public/tileset/tileset.png";
import tilesetJSONUrl from "/public/tileset/tileset.json";
import adventurerPNGUrl from "/public/adventurer/texture.png";
import adventurerJSONUrl from "/public/adventurer/texture.json";
import greenDemonPNGUrl from "/public/enemies/greendemon/texture.png";
import greenDemonJSONUrl from "/public/enemies/greendemon/texture.json";
import redDemonPNGUrl from "/public/enemies/reddemon/texture.png";
import redDemonJSONUrl from "/public/enemies/reddemon/texture.json";
import blackSorcererPNGUrl from "/public/enemies/blacksorcerer/texture.png";
import blackSorcererJSONUrl from "/public/enemies/blacksorcerer/texture.json";
import orangeSorcererPNGUrl from "/public/enemies/orangesorcerer/texture.png";
import orangeSorcererJSONUrl from "/public/enemies/orangesorcerer/texture.json";
import skeletonPNGUrl from "/public/enemies/skeleton/texture.png";
import skeletonJSONUrl from "/public/enemies/skeleton/texture.json";
import flameEnemyPNGUrl from "/public/enemies/flameenemy/texture.png";
import flameEnemyJSONUrl from "/public/enemies/flameenemy/texture.json";
import spiritPNGUrl from "/public/enemies/spirit/texture.png";
import spiritJSONUrl from "/public/enemies/spirit/texture.json";
import treasureChestPNGUrl from "/public/items/treasure/texture.png";
import treasureChestJSONUrl from "/public/items/treasure/texture.json";
import swordPNGUrl from "/public/items/sword/texture.png";
import swordJSONUrl from "/public/items/sword/texture.json";
import slashPNGUrl from "/public/attack-effects/slash/texture.png";
import slashJSONUrl from "/public/attack-effects/slash/texture.json";
import scratchPNGUrl from "/public/attack-effects/scratch/texture.png";
import scratchJSONUrl from "/public/attack-effects/scratch/texture.json";
import skillIcePNGUrl from "/public/skills/ice/texture.png";
import skillIceJSONUrl from "/public/skills/ice/texture.json";
import skillFirePNGUrl from "/public/skills/fire/texture.png";
import skillFireJSONUrl from "/public/skills/fire/texture.json";
import skillLightningPNGUrl from "/public/skills/lightning/texture.png";
import skillLightningJSONUrl from "/public/skills/lightning/texture.json";
import skillPlantPNGUrl from "/public/skills/plant/texture.png";
import skillPlantJSONUrl from "/public/skills/plant/texture.json";
import skillRockPNGUrl from "/public/skills/rock/texture.png";
import skillRockJSONUrl from "/public/skills/rock/texture.json";
import skillRock2PNGUrl from "/public/skills/rock2/texture.png";
import skillRock2JSONUrl from "/public/skills/rock2/texture.json";
import healthBarPNGUrl from "/public/ui/health-bar.png";
import manaBarPNGUrl from "/public/ui/mana-bar.png";
import borderBarPNGUrl from "/public/ui/border-bar.png";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.load.image("tileset", tilesetPNGUrl);
        this.load.tilemapTiledJSON("tileset", tilesetJSONUrl);

        this.load.image("health-bar", healthBarPNGUrl);
        this.load.image("mana-bar", manaBarPNGUrl);
        this.load.image("border-bar", borderBarPNGUrl);

        this.load.atlas("adventurer", adventurerPNGUrl, adventurerJSONUrl);
        this.load.atlas("green-demon", greenDemonPNGUrl, greenDemonJSONUrl);
        this.load.atlas("red-demon", redDemonPNGUrl, redDemonJSONUrl);
        this.load.atlas("black-sorcerer", blackSorcererPNGUrl, blackSorcererJSONUrl);
        this.load.atlas("orange-sorcerer", orangeSorcererPNGUrl, orangeSorcererJSONUrl);
        this.load.atlas("skeleton", skeletonPNGUrl, skeletonJSONUrl);
        this.load.atlas("flame-enemy", flameEnemyPNGUrl, flameEnemyJSONUrl);
        this.load.atlas("spirit", spiritPNGUrl, spiritJSONUrl);
        this.load.atlas("treasure-chest", treasureChestPNGUrl, treasureChestJSONUrl);
        this.load.atlas("sword", swordPNGUrl, swordJSONUrl);
        this.load.atlas("slash", slashPNGUrl, slashJSONUrl);
        this.load.atlas("scratch", scratchPNGUrl, scratchJSONUrl);
        this.load.atlas("skill-ice", skillIcePNGUrl, skillIceJSONUrl);
        this.load.atlas("skill-fire", skillFirePNGUrl, skillFireJSONUrl);
        this.load.atlas("skill-lightning", skillLightningPNGUrl, skillLightningJSONUrl);
        this.load.atlas("skill-plant", skillPlantPNGUrl, skillPlantJSONUrl);
        this.load.atlas("skill-rock", skillRockPNGUrl, skillRockJSONUrl);
        this.load.atlas("skill-rock2", skillRock2PNGUrl, skillRock2JSONUrl);
    }

    create() {
        this.scene.start("game");
    }
}
