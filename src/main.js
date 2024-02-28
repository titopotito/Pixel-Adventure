import Phaser from "phaser";
import GameScene from "./scenes/GameScene.js";

const config = {
    width: 720,
    height: 480,
    type: Phaser.AUTO,
};

const game = new Phaser.Game(config);

game.scene.add("gamescene", GameScene);
game.scene.start("gamescene");
