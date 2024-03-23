import Phaser from "phaser";

// method for destroying an array of Phaser GameObjects after a given delay
function destroyAfterDelay(scene, gameObject, delay) {
    scene.time.addEvent({
        delay: delay,
        callback: () => {
            gameObject.forEach((gameObject) => gameObject.destroy());
        },
    });
}

//  create body for sprites > play animation > destroy sprite after delay
function playAnimationForManyThenDestroy(scene, sprites, animationKey, delay = 100, delayBeforeNextAnimation = 100) {
    return new Promise((resolve, reject) => {
        sprites.forEach((sprite) => {
            // Add a body and display each sprite object
            scene.physics.add.existing(sprite);
            sprite.addToDisplayList();
            sprite.visible = true;
        });

        scene.anims.play(animationKey, sprites);

        // delay by 100ms before returning the promise
        scene.time.addEvent({
            delay: delayBeforeNextAnimation,
            callback: () => {
                resolve(sprites);

                // delay by another 400ms before destroying each sprite needed to play-out the whole animation
                destroyAfterDelay(scene, sprites, delay - delayBeforeNextAnimation);
            },
        });
    });
}

function getSpawnPosition(caster, offset) {
    if (caster.currentDirection === "down") {
        return { x: caster.x, y: caster.y + offset };
    } else if (caster.currentDirection === "left") {
        return { x: caster.x - offset, y: caster.y };
    } else if (caster.currentDirection === "up") {
        return { x: caster.x, y: caster.y - offset };
    } else if (caster.currentDirection === "right") {
        return { x: caster.x + offset, y: caster.y };
    }
}

function increaseSizeOvertime(sprite, increment) {
    sprite.scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, () => {
        sprite.scale += increment;
    });
}

function setVelocityBaseOnCharacterDirection(character, sprite, speed) {
    let velocity = { x: speed, y: 0 };
    if (character.currentDirection === "down") {
        velocity = { x: 0, y: speed };
    } else if (character.currentDirection === "up") {
        velocity = { x: 0, y: -speed };
    } else if (character.currentDirection === "left") {
        velocity = { x: -speed, y: 0 };
    }
    sprite.setVelocity(velocity.x, velocity.y);
}

function rotateBaseOnCharacterDirection(character, sprite, offset) {
    let angle = 0 + offset;
    if (character.currentDirection === "down") {
        angle = 90 + offset;
    } else if (character.currentDirection === "up") {
        angle = 270 + offset;
    } else if (character.currentDirection === "left") {
        angle = 180 + offset;
    }
    sprite.setRotation(Phaser.Math.DegToRad(angle));
}

export {
    destroyAfterDelay,
    playAnimationForManyThenDestroy,
    increaseSizeOvertime,
    setVelocityBaseOnCharacterDirection,
    rotateBaseOnCharacterDirection,
    getSpawnPosition,
};
