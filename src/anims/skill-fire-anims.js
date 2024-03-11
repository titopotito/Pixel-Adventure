import { createAnims } from "./create-anims-function";

const KEY = "skill-fire";

const ACTION_MAP = {
    cast: { frames: 4, repeat: -1, hasDirection: false, frameRate: 10 },
};

function skillFireAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { skillFireAnims };
