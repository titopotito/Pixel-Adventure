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
import adventurerPortraitPNGUrl from "/public/adventurer/faceset.png";
import btnBgPNGUrl from "/public/ui/btn-bg.png";
import basicAtkLogoPNGUrl from "/public/ui/basic-atk-logo.png";
import iceLogoPNGUrl from "/public/ui/ice-logo.png";
import lightningLogoPNGUrl from "/public/ui/lightning-logo.png";
import fireLogoPNGUrl from "/public/ui/fire-logo.png";
import rockLogoPNGUrl from "/public/ui/rock-logo.png";
import hpPotionPNGUrl from "/public/items/potion/hp-potion.png";
import mpPotionPNGUrl from "/public/items/potion/mp-potion.png";
import goldCountPNGUrl from "/public/ui/gold-count.png";
import inventoryPNGUrl from "/public/ui/inventory.png";
import quickUseSlotsPNGUrl from "/public/ui/quick-use-slots.png";
import inventoryBorderHighlightPNGUrl from "/public/ui/inventory-border-highlight.png";
import inventoryLogoPNGUrl from "/public/ui/inventory-logo.png";
import skillLogoPNGUrl from "/public/ui/skill-logo.png";
import skillWindowPNGUrl from "/public/ui/skill-window.png";
import buttonPNGUrl from "/public/ui/button.png";
import buttonBorderPNGUrl from "/public/ui/button-border.png";

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
        this.load.image("adventurer-portrait", adventurerPortraitPNGUrl);
        this.load.image("btn-bg", btnBgPNGUrl);
        this.load.image("basic-atk-logo", basicAtkLogoPNGUrl);
        this.load.image("ice-logo", iceLogoPNGUrl);
        this.load.image("lightning-logo", lightningLogoPNGUrl);
        this.load.image("fire-logo", fireLogoPNGUrl);
        this.load.image("rock-logo", rockLogoPNGUrl);
        this.load.image("hp-potion", hpPotionPNGUrl);
        this.load.image("mp-potion", mpPotionPNGUrl);
        this.load.image("gold-count", goldCountPNGUrl);
        this.load.image("inventory", inventoryPNGUrl);
        this.load.image("quick-use-slots", quickUseSlotsPNGUrl);
        this.load.image("inventory-border-highlight", inventoryBorderHighlightPNGUrl);
        this.load.image("inventory-logo", inventoryLogoPNGUrl);
        this.load.image("skill-logo", skillLogoPNGUrl);
        this.load.image("skill-window", skillWindowPNGUrl);
        this.load.image("button", buttonPNGUrl);
        this.load.image("button-border", buttonBorderPNGUrl);

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

        this.load.audio("adventure-begin", require("../../public/audio/1 - Adventure Begin.ogg"));
        this.load.audio("coin", require("../../public/audio/coin.wav"));
        this.load.audio("fire", require("../../public/audio/fire.wav"));
        this.load.audio("lightning", require("../../public/audio/lightning.wav"));
        this.load.audio("explosion", require("../../public/audio/explosion.wav"));
        this.load.audio("ice", require("../../public/audio/ice.wav"));
        this.load.audio("game-over", require("../../public/audio/game-over.wav"));
        this.load.audio("recover", require("../../public/audio/recover.wav"));
        this.load.audio("hit", require("../../public/audio/hit.wav"));
        this.load.audio("kill", require("../../public/audio/kill.wav"));
        this.load.audio("potion", require("../../public/audio/potion.wav"));
        this.load.audio("slash", require("../../public/audio/slash.wav"));
        this.load.audio("pressed", require("../../public/audio/pressed.wav"));
        this.load.audio("menu", require("../../public/audio/menu.wav"));
        this.load.audio("reject", require("../../public/audio/reject.wav"));

        this.load.html("skill-window", require("../html/skill-window.html"));
    }

    create() {
        this.scene.start("game");
    }
}
