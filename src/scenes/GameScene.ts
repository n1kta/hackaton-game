import Phaser from "phaser"
import "../сharacter/hero"
import { CharacterAnims } from "../anims/HeroAnims";
import Laser from "../classes/laser";
import Enemy from "../classes/enemy";
import Chest from "../classes/chest";
import Hero from "../сharacter/hero";
import Spike from "../classes/spike";


export default class GameScene extends Phaser.Scene
{
    private hero!: Phaser.Physics.Arcade.Sprite;
    private chests!: Phaser.Physics.Arcade.Group;
    private cursors;

    private enemies: Enemy[];
    private lasers: Laser[];
    private spike: Spike;

	constructor()
	{
		super('game-scene');
	}

	preload()
    {
        this.load.image('heroStand', 'assets/character/hero_stand.png');
        this.load.image('test', 'assets/character/hero_stand.png');
        this.load.image('laser', 'assets/laser.png');
        this.load.image('chest', 'assets/chest.png');
        this.load.image('chest_opened', 'assets/chest_opened.png');
        this.load.image('box', 'assets/box.png');

        this.load.spritesheet('heroStandAnim', 'assets/character/hero_animation.png', { frameWidth: 68, frameHeight: 104 });
        this.load.spritesheet('heroMoove', 'assets/character/hero_left_right.png', { frameWidth: 72, frameHeight: 104 });
        this.load.spritesheet('heroUlt', 'assets/character/hero_ult.png', { frameWidth: 340, frameHeight: 256 });
        this.load.spritesheet('heroUltStart', 'assets/character/hero_ult_start.png', { frameWidth: 340, frameHeight: 256 });
        this.load.spritesheet('heroMooveUpDown', 'assets/character/hero_up_down.png', { frameWidth: 64, frameHeight: 104 });
        this.load.spritesheet('heroAttack', 'assets/character/hero_attack.png', { frameWidth: 112, frameHeight: 104 });

        this.load.spritesheet('enemyStatic', 'assets/enemy/enemy_static.png', { frameWidth: 100, frameHeight: 104 });
        this.load.spritesheet('enemyWalk', 'assets/enemy/enemy_walking.png', { frameWidth: 100, frameHeight: 104 });
        this.load.spritesheet('enemyAttack', 'assets/enemy/enemy_attack.png', { frameWidth: 152, frameHeight: 104 });
        this.load.spritesheet('enemyDeath', 'assets/enemy/enemy_death.png', { frameWidth: 100, frameHeight: 104 });

        this.load.spritesheet('timingEnemy', 'assets/timing.png', { frameWidth: 79, frameHeight: 9 });

        this.load.spritesheet('spike', 'assets/spike.png', { frameWidth: 56, frameHeight: 164 });
        this.load.image('game_over', 'assets/game_over1.png');

        this.load.audio('clock', 'assets/clock.mp3')
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.initHero();
        this.initEnemies();
        this.initLasers();
        this.initChests();

        this.spike = new Spike(this, 300, 100, 'spike', this.add.sprite(0, 0, 'box'));
        this.spike.setSize(56, 164);
    }
    
    update(t: number, dt: number)
    {
        this.hero.update(this.cursors, this.enemies);
        this.enemies.forEach(e => e.update(t, dt));
        this.spike.update(this.hero);
    }

    private initHero() {
        CharacterAnims(this.anims);
        this.hero = this.add.hero(100, 100, 'heroStandAnim');
        this.cameras.main.startFollow(this.hero, true);
    }

    private initEnemies() {
        this.enemies = [];
        // this.enemies = [new Enemy(this, 250, 100, 'enemyStatic', this.hero, 'timingEnemy')];
        // this.physics.add.collider(this.hero, this.enemies);
    }

    private initLasers() {
        // this.lasers = [new Laser(this, 300, 100, 'laser'), new Laser(this, 500, 100, 'laser')];

        this.physics.add.overlap(this.hero, this.lasers, (obj1, obj2) => {
            const laser = obj2 as Laser;
            const hero = obj1 as Hero;

            if (laser.isOn) {
                laser.attack(hero);
            }
        });
    }

    private initChests() {
        this.chests = this.physics.add.group({
            classType: Chest
        });

        this.chests.create(600, 100, 'chest');
        this.physics.add.overlap(this.hero, this.chests, (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) => {
            const hero = obj1 as Hero;
            const chest = obj2 as Chest;
            
            if (chest.isAvailable) {
                chest.open(hero);
            }
        }, undefined, this);
    }
}
