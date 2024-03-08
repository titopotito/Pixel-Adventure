import { createAnims } from "./create-anims-function";

const KEY = "skill-fire";

const ACTION_MAP = {
    cast: { frames: 4, repeat: 0, hasDirection: false },
};

function skillFireAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { skillFireAnims };
