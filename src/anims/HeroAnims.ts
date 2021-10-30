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

    anims.create({
        key: 'hero_ult',
        frames: anims.generateFrameNumbers('heroUlt', { start: 0, end: 9 }),
        frameRate: 7,
        repeat: -1
    });

    anims.create({
        key: 'hero_down',
        frames: anims.generateFrameNumbers('heroMooveUpDown', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'hero_up',
        frames: anims.generateFrameNumbers('heroMooveUpDown', { start: 9, end: 17 }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'hero_attack_right',
        frames: anims.generateFrameNumbers('heroAttack', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'hero_attack_left',
        frames: anims.generateFrameNumbers('heroAttack', { start: 5, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
}

export {
    CharacterAnims
}