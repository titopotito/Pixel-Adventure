import Phaser from "phaser";
import Preloader from "./scenes/Preloader.js";
import Game from "./scenes/Game.js";

const config = {
    type: Phaser.AUTO,
    width: 360,
    height: 240,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
        },
    },
    scene: [Preloader, Game],
    scale: {
        zoom: 2,
    },
};

export default new Phaser.Game(config);
