// FUNCTION FOR CREATING ANIMS.
// anims: anims object from scene
// key: key loaded from atlas
// actionMapObject: an object of actions with following properties {frames: number, repeat:number, hasDirection: boolean}

function createAnims(anims, key, actionMapObject) {
    const DIRECTIONS = ["up", "down", "left", "right"];

    for (let action in actionMapObject) {
        let { frames, repeat, hasDirection } = actionMapObject[action];

        if (hasDirection) {
            DIRECTIONS.forEach((direction) => {
                anims.create({
                    key: `${key}-${action}-${direction}`,
                    frames: anims.generateFrameNames(`${key}`, {
                        start: 1,
                        end: frames,
                        prefix: `${action}-${direction}-`,
                        suffix: ".png",
                    }),
                    repeat: repeat,
                    frameRate: 5,
                });
            });
        } else {
            anims.create({
                key: `${key}-${action}`,
                frames: anims.generateFrameNames(`${key}`, {
                    start: 1,
                    end: frames,
                    prefix: `${action}-`,
                    suffix: ".png",
                }),
                repeat: repeat,
                frameRate: 5,
            });
        }
    }
}

export { createAnims };
