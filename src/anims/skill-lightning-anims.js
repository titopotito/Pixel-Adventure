import { createAnims } from "./create-anims-function";

const KEY = "skill-lightning";

const ACTION_MAP = {
    cast: { frames: 8, repeat: 10, hasDirection: false, frameRate: 20 },
};

function skillLightningAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { skillLightningAnims };
