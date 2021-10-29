import Phaser from "phaser";

const CharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'hero_stand_right',
        frames: anims.generateFrameNumbers('heroStandAnim', { start: 0, end: 5 }),
        frameRate: 7,
        repeat: -1
    });

    anims.create({
        key: 'hero_stand_left',
        frames: anims.generateFrameNumbers('heroStandAnim', { start: 6, end: 11 }),
        frameRate: 7,
        repeat: -1
    });

    anims.create({
        key: 'hero_right',
        frames: anims.generateFrameNumbers('heroMoove', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'hero_left',
        frames: anims.generateFrameNumbers('heroMoove', { start: 10, end: 19 }),
        frameRate: 10,
        repeat: -1
    });
}

export {
    CharacterAnims
}