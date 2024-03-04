import { createAnims } from "./create-anims-function";

const KEY = "treasure-chest";

const ACTION_MAP = {
    open: { frames: 1, repeat: 1, hasDirection: false },
    close: { frames: 1, repeat: 1, hasDirection: false },
};

function treasureChestAnims(anims) {
    createAnims(anims, KEY, ACTION_MAP);
}

export { treasureChestAnims };
