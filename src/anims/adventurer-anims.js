import { createAnims } from "./create-anims-function";

const KEY = "adventurer";

const ACTION_MAP = {
    walk: { frames: 4, repeat: -1, hasDirection: true },
    idle: { frames: 1, repeat: 1, hasDirection: true },
    attack: { frames: 1, repeat: 1, hasDirection: true },
    die: { frames: 1, repeat: 1, hasDirection: false },
};

function adventurerAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { adventurerAnims };
