import { createAnims } from "./create-anims-function";

const KEY = "skill-ice";

const ACTION_MAP = {
    cast: { frames: 9, repeat: 0, hasDirection: false, frameRate: 18 },
};

function skillIceAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { skillIceAnims };
