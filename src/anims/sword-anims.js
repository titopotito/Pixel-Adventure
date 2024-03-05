import { createAnims } from "./create-anims-function";

const KEY = "sword";

const ACTION_MAP = {
    sword: { frames: 1, repeat: 0, hasDirection: false },
};

function swordAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { swordAnims };
