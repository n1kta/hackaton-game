import Phaser from "phaser"
import Enemy from "~/classes/enemy";
import "../сharacter/hero"

import { CharacterAnims } from "../anims/HeroAnims";

const game_over = false;

export default class GameScene extends Phaser.Scene
{
    private hero!: Phaser.Physics.Arcade.Sprite
    private cursors;

    private enemies: Enemy[];

	constructor()
	{
		super('game-scene');
	}

	preload()
    {
        this.load.image('heroStand', 'assets/character/hero_stand.png');
        this.load.image('test', 'assets/character/hero_stand.png');
        this.load.spritesheet('heroStandAnim', 'assets/character/hero_animation.png', { frameWidth: 68, frameHeight: 104 });
        this.load.spritesheet('heroMoove', 'assets/character/hero_left_right.png', { frameWidth: 72, frameHeight: 104 });
        this.load.spritesheet('heroUlt', 'assets/character/hero_ult.png', { frameWidth: 340, frameHeight: 256 });
        this.load.spritesheet('heroMooveUpDown', 'assets/character/hero_up_down.png', { frameWidth: 64, frameHeight: 104 });
        this.load.spritesheet('heroAttack', 'assets/character/hero_attack.png', { frameWidth: 112, frameHeight: 104 });
    }

    create()
    {
        CharacterAnims(this.anims)
        this.hero = this.add.hero(100, 100, 'heroStand')
        // this.hero = this.physics.add.sprite(100, 100, 'heroStand').setScale(4)
        // this.physics.add.sprite(100, 100, 'test')

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.hero, true);

        // Enemy
        this.initEnemies();
        // anims.create({
        //     key: 'leftE',
        //     frames: anims.generateFrameNumbers('walkingEnemy', { start: 6, end: 11 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
    }
    
    update(t: number, dt: number)
    {
        if(this.hero){
            this.hero.update(this.cursors, this.enemies)
        }
    }

    private initEnemies() {
        this.enemies = [new Enemy(this, 250, 100, 'heroStand', this.hero)];
        this.physics.add.collider(this.hero, this.enemies, (obj1, obj2) => {
            // TODO: Hero GetDamage
        }, undefined, this);
    }
}
