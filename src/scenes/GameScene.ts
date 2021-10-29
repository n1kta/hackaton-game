import Phaser from "phaser"
import Enemy from "~/classes/enemy";
import "../сharacter/hero"

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
    }

    create()
    {
        this.hero = this.add.hero(100, 100, 'heroStand').setScale(4)
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
    
        // anims.create({
        //     key: 'rightE',
        //     frames: anims.generateFrameNumbers('walkingEnemy', { start: 0, end: 5 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
    
        // anims.create({
        //     key: 'rightStandE',
        //     frames: anims.generateFrameNumbers('enemyStand', { start: 0, end: 2 }),
        //     frameRate: 5,
        //     repeat: -1
        // });
    
        // anims.create({
        //     key: 'leftStandE',
        //     frames: anims.generateFrameNumbers('enemyStand', { start: 3, end: 5 }),
        //     frameRate: 5,
        //     repeat: -1
        // });
    
        // anims.create({
        //     key: 'leftPunchE',
        //     frames: anims.generateFrameNumbers('enemyPunch', { start: 7, end: 13 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
    
        // anims.create({
        //     key: 'rightPunchE',
        //     frames: anims.generateFrameNumbers('enemyPunch', { start: 0, end: 6 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
    }
    
    update(t: number, dt: number)
    {
        if(this.hero){
            this.hero.update(this.cursors)
        }
    }

    private initEnemies() {
        this.enemies = [new Enemy(this, 250, 100, 'heroStand', this.hero)];
        // this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(this.hero, this.enemies, (obj1, obj2) => {
            // TODO: Hero GetDamage
        }, undefined, this);
    }
}
