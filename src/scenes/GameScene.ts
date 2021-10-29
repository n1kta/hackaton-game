import Phaser from "phaser";
import Enemy from "../classes/enemy";

const speed = 200;

export default class GameScene extends Phaser.Scene
{
    private hero;
    private cursors;

    private enemies: Enemy[];

	constructor()
	{
		super('game-scene');
	}

	preload()
    {
        this.load.image('heroStand', 'assets/character/hero_stand.png');
    }

    create()
    {
        // Hero

        this.hero = this.physics.add.sprite(100, 100, 'heroStand').setScale(4);

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

    update()
    {
        if (this.cursors.left.isDown)
        {
            this.hero.setVelocityX(-speed);
            this.hero.setVelocityY(0);
        }
        else if (this.cursors.right.isDown)
        {
            this.hero.setVelocityX(speed);
            this.hero.setVelocityY(0);
        }
        else if (this.cursors.up.isDown)
        {
            this.hero.setVelocityX(0);
            this.hero.setVelocityY(-speed);
        }
        else if (this.cursors.down.isDown)
        {
            this.hero.setVelocityX(0);
            this.hero.setVelocityY(speed);
        }
        else{
            this.hero.setVelocityX(0);
            this.hero.setVelocityY(0);
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
