// FUNCTION FOR CREATING ANIMS.
// anims: anims object from scene
// key: key loaded from atlas
// actionMapObject: an object of actions with following properties {frames: number, repeat:number, hasDirection: boolean}

function createAnims(anims, key, actionMapObject) {
    const DIRECTIONS = ["up", "down", "left", "right"];

    for (let action in actionMapObject) {
        let { frames, repeat, hasDirection, frameRate } = actionMapObject[action];
        if (!frameRate) {
            frameRate = 5;
        }
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
                    frameRate: frameRate,
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
                frameRate: frameRate,
            });
        }
    }
}

export { createAnims };
