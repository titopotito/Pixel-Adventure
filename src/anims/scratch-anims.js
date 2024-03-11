import { createAnims } from "./create-anims-function";

const KEY = "scratch";

const ACTION_MAP = {
    scratch: { frames: 4, repeat: 0, hasDirection: false, frameRate: 20 },
};

function scratchAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { scratchAnims };
