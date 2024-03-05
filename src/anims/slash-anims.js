import { createAnims } from "./create-anims-function";

const KEY = "slash";

const ACTION_MAP = {
    slash: { frames: 4, repeat: 0, hasDirection: false },
};

function slashAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { slashAnims };
