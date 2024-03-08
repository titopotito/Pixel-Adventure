import { createAnims } from "./create-anims-function";

const KEY = "skill-plant";

const ACTION_MAP = {
    cast: { frames: 4, repeat: 0, hasDirection: false },
};

function skillPlantAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { skillPlantAnims };
