import Phaser from "phaser";
import Adventurer from "../models/characters/adventurer.js";
import Enemy from "../models/characters/enemy.js";
import TreasureChest from "../models/items/treasure-chest.js";
import { adventurerAnims } from "../anims/adventurer-anims.js";
import { greenDemonAnims } from "../anims/green-demon-anims.js";
import { treasureChestAnims } from "../anims/treasure-chest-anims.js";
import { swordAnims } from "../anims/sword-anims.js";
import { slashAnims } from "../anims/slash-anims.js";
import { scratchAnims } from "../anims/scratch-anims.js";
import { skillFireAnims } from "../anims/skill-fire-anims.js";
import { skillIceAnims } from "../anims/skill-ice-anims.js";
import { skillLightningAnims } from "../anims/skill-lightning-anims.js";
import { skillPlantAnims } from "../anims/skill-plant-anims.js";
import { skillRockAnims } from "../anims/skill-rock-anims.js";
import { skillRock2Anims } from "../anims/skill-rock2-anims.js";
import FreezingField from "../models/skills/freezing-field.js";
import BasicAttack from "../models/skills/basic-attack.js";
import HeavensJudgement from "../models/skills/heaven-s-judgement.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
    }

    init() {
        this.events.on(Phaser.Scenes.Events.POST_UPDATE, this.lateUpdate, this);
    }

    preload() {}

    create() {
        const CHARACTER_STARTING_POSITION = { x: 15, y: 14 };
        const TILE_SIZE = { w: 16, h: 16 };
        const TILESET_MAP = this.make.tilemap({ key: "tileset" });
        const TILESET_MAP_IMAGE = TILESET_MAP.addTilesetImage("tileset", "tileset");
        const LAYERS = ["ground", "water", "water-side", "objects", "environment"];
        this.physics.world.bounds.width = this.sys.game.config.width * TILE_SIZE.w;
        this.physics.world.bounds.height = this.sys.game.config.height * TILE_SIZE.h;

        // Creating anims
        adventurerAnims(this.anims);
        greenDemonAnims(this.anims);
        treasureChestAnims(this.anims);
        swordAnims(this.anims);
        slashAnims(this.anims);
        scratchAnims(this.anims);
        skillIceAnims(this.anims);
        skillFireAnims(this.anims);
        skillLightningAnims(this.anims);
        skillPlantAnims(this.anims);
        skillRockAnims(this.anims);
        skillRock2Anims(this.anims);

        // Creating Adventurer Object.
        this.adventurer = new Adventurer({
            scene: this,
            x: CHARACTER_STARTING_POSITION.x * TILE_SIZE.w,
            y: CHARACTER_STARTING_POSITION.y * TILE_SIZE.h,
            spriteName: "adventurer",
        });

        this.basicAttack = new BasicAttack(this.adventurer, "slash-slash");
        this.skill1 = new FreezingField(this.adventurer);
        this.skill2 = new HeavensJudgement(this.adventurer);
        this.adventurer.setBasicAttack(this.basicAttack);
        this.adventurer.setSkill1(this.skill1);
        this.adventurer.setSkill2(this.skill2);

        // Creating Enemy Objects and adding them to Physics.Arcade.Group "greenDemonsGroup".
        this.greenDemonsGroup = new Phaser.Physics.Arcade.Group(this.physics.world, this);
        const greenDemonLayer = TILESET_MAP.getObjectLayer("green-demon");
        greenDemonLayer.objects.forEach((greenDemonObj) => {
            let config = {
                scene: this,
                x: greenDemonObj.x,
                y: greenDemonObj.y,
                spriteName: "green-demon",
            };
            const greenDemon = new Enemy(config);
            greenDemon.setTarget(this.adventurer);
            this.greenDemonsGroup.add(greenDemon);
        });

        // Creating TreasureChest Objects and adding them to Physics.Arcade.Group "treasureChestGroup".
        this.treasureChestGroup = new Phaser.Physics.Arcade.Group(this.physics.world, this);
        const treasureChestLayer = TILESET_MAP.getObjectLayer("treasure-chest");
        treasureChestLayer.objects.forEach((treasureChestObj) => {
            let config = {
                scene: this,
                x: treasureChestObj.x,
                y: treasureChestObj.y,
                spriteName: "treasure-chest",
            };
            this.treasureChestGroup.add(new TreasureChest(config));
        });

        this.adventurer.setTarget(this.greenDemonsGroup);

        this.physics.add.collider(this.adventurer, this.greenDemonsGroup);
        this.physics.add.collider(this.adventurer, this.treasureChestGroup);
        this.physics.add.collider(this.greenDemonsGroup, this.greenDemonsGroup);
        this.physics.add.overlap(this.adventurer.overlapBody, this.treasureChestGroup, (body, treasureChest) =>
            this.adventurer.interact(treasureChest)
        );

        LAYERS.forEach((item) => {
            let layer = TILESET_MAP.createLayer(item, TILESET_MAP_IMAGE);
            layer.setCollisionByProperty({ collision: true });
            this.physics.add.collider(this.adventurer, layer);
            this.physics.add.collider(this.greenDemonsGroup, layer);
            this.physics.add.collider(this.treasureChestGroup, layer);
        });

        this.scene.run("gameUI", { adventurer: this.adventurer, greenDemonsGroup: this.greenDemonsGroup });
        this.gameUIScene = this.scene.get("gameUI");
    }

    update(t, dt) {}

    lateUpdate(t, dt) {
        this.adventurer.preUpdate(t, dt);
        this.greenDemonsGroup.preUpdate(t, dt);
        this.gameUIScene.update(t, dt);
    }
}
