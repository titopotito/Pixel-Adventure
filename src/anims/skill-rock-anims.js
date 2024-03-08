import { createAnims } from "./create-anims-function";

const KEY = "skill-rock";

const ACTION_MAP = {
    cast: { frames: 4, repeat: 0, hasDirection: false },
};

function skillRockAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { skillRockAnims };
