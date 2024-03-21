import Phaser from "phaser";
import Preloader from "./scenes/preloader.js";
import Game from "./scenes/game.js";
import GameUI from "./scenes/gameUI.js";

const config = {
    type: Phaser.AUTO,

    width: 360,
    height: 240,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true,
        },
    },
    scene: [Preloader, Game, GameUI],
    zoom: 2,
    pixelArt: true,
    antialias: false,
    autoRound: true,
    roundPixels: true,
    parent: "div",
    dom: { createContainer: true },
};

export default new Phaser.Game(config);
