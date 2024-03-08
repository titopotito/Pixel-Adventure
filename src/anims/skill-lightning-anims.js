import { createAnims } from "./create-anims-function";

const KEY = "skill-lightning";

const ACTION_MAP = {
    cast: { frames: 8, repeat: 0, hasDirection: false },
};

function skillLightningAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { skillLightningAnims };
