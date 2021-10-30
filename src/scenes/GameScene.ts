import Phaser from "phaser"
import "../сharacter/hero"
import { CharacterAnims } from "../anims/HeroAnims";
import Laser from "../classes/laser";
import Enemy from "../classes/enemy";
import Chest from "../classes/chest";
import Hero from "../сharacter/hero";


export default class GameScene extends Phaser.Scene
{
    private hero!: Phaser.Physics.Arcade.Sprite;
    private chests!: Phaser.Physics.Arcade.StaticGroup;
    private cursors;

    private enemies: Enemy[];
    private lasers: Laser[];

	constructor()
	{
		super('game-scene');
	}

	preload()
    {
        this.load.image('heroStand', 'assets/character/hero_stand.png');
        this.load.image('test', 'assets/character/hero_stand.png');
        this.load.image('laser', 'assets/laser.png');

        this.load.spritesheet('heroStandAnim', 'assets/character/hero_animation.png', { frameWidth: 68, frameHeight: 104 });
        this.load.spritesheet('heroMoove', 'assets/character/hero_left_right.png', { frameWidth: 72, frameHeight: 104 });
        this.load.spritesheet('heroUlt', 'assets/character/hero_ult.png', { frameWidth: 340, frameHeight: 256 });
        this.load.spritesheet('heroMooveUpDown', 'assets/character/hero_up_down.png', { frameWidth: 64, frameHeight: 104 });
        this.load.spritesheet('heroAttack', 'assets/character/hero_attack.png', { frameWidth: 112, frameHeight: 104 });
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();

        this.initHero();
        this.initEnemies();
        this.initLasers();
        this.initChests();
    }
    
    update(t: number, dt: number)
    {
        this.hero.update(this.cursors, this.enemies);
    }

    private initHero() {
        CharacterAnims(this.anims);
        this.hero = this.add.hero(100, 100, 'heroStand');
        this.cameras.main.startFollow(this.hero, true);
    }

    private initEnemies() {
        // this.enemies = [new Enemy(this, 250, 100, 'heroStand', this.hero)];
        this.physics.add.collider(this.hero, this.enemies);
    }

    private initLasers() {
        this.lasers = [new Laser(this, 300, 100, 'laser'), new Laser(this, 500, 100, 'laser')];

        let perTime = false;

        this.physics.add.overlap(this.hero, this.lasers, (obj1, obj2) => {
            const laser = obj2 as Laser;
            const hero = obj1 as Hero;

            console.log(perTime);

            setTimeout(() => {
                perTime = true;
            }, 100);

            if (laser.isOn && perTime) {
                laser.attack(hero);
                perTime = false;
            }
        });
    }

    private initChests() {
        this.chests = this.physics.add.staticGroup({
            classType: Chest
        });

        this.chests.create(600, 100, 'chest');

        this.physics.add.collider(this.hero, this.chests, (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) => {
            const hero = obj1 as Hero;
            const chest = obj2 as Chest;
            chest.open(hero);
        }, undefined, this);
    }
}
