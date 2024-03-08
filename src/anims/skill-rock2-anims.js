import { createAnims } from "./create-anims-function";

const KEY = "skill-rock2";

const ACTION_MAP = {
    cast: { frames: 13, repeat: 10, hasDirection: false, frameRate: 10 },
};

function skillRock2Anims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { skillRock2Anims };
