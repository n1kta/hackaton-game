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

    private delorean;
    private ctr = 0;

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

        this.load.image('obj1', 'assets/gameObj.png');
        this.load.image('obj2', 'assets/gameObj2.png');
        this.load.image('obj3', 'assets/gameObj3.png');
        

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

        this.load.audio('clock', 'assets/clock.mp3');
        this.load.audio('cyberpunk', 'assets/Cyberpunk.mp3');

        this.load.tilemapTiledJSON('map','assets/streetmap.json');
        this.load.image('floor','assets/floor2.png');

        this.load.image('h1', 'assets/peaces/дом1.png')
        this.load.image('h2', 'assets/peaces/дом2.png')
        this.load.image('h3', 'assets/peaces/дом3.png')
        this.load.image('h4', 'assets/peaces/дом4.png')
        this.load.image('h5', 'assets/peaces/дом5.png')
        this.load.image('h6', 'assets/peaces/дом6.png')
        this.load.image('h7', 'assets/peaces/дом7.png')
        this.load.image('h8', 'assets/peaces/дом8.png')
        this.load.image('h9', 'assets/peaces/дом9.png')
        this.load.image('h10', 'assets/peaces/дом10.png')
        this.load.image('h11', 'assets/peaces/дом11.png')
        this.load.image('h12', 'assets/peaces/дом12.png')
        this.load.image('h13', 'assets/peaces/дом13.png')
        this.load.image('h14', 'assets/peaces/дом14.png')
        this.load.image('h15', 'assets/peaces/дом15.png')
        this.load.image('h16', 'assets/peaces/дом16.png')
        this.load.image('h17', 'assets/peaces/дом17.png')
        this.load.image('h18', 'assets/peaces/дом18.png')
        this.load.image('h19', 'assets/peaces/дом19.png')
        this.load.image('h20', 'assets/peaces/до20.png')
        this.load.image('h21', 'assets/peaces/дом21.png')
        this.load.image('h22', 'assets/peaces/vice-city.png')
        this.load.image('del', 'assets/peaces/Delorean.png')

        // this.load.spritesheet('delorean_sheet', 'assets/delorean_sheet.png');
        this.load.spritesheet('delorean_sheet', 'assets/Delorean.png', { frameWidth: 2000, frameHeight: 1000});
        this.load.image('delorean', 'assets/Delorean2.png');
    }

    create()
    {
        const map = this.make.tilemap({ key:'map', tileWidth: 96, tileHeight: 96});
        const styleSet=map.addTilesetImage('streetTileSet','floor')
        map.createLayer('ground',styleSet)
        const walls = map.createLayer('wall', styleSet)
        this.cursors = this.input.keyboard.createCursorKeys();

        ///////////////////////////////////

        this.add.image(400, 120, 'h1')
        this.add.image(860, 120, 'h2')
        this.add.image(1620, 120, 'h7')
        this.add.image(1270, 120, 'h3')
        this.add.image(1900, 120, 'h7')
        this.add.image(2200, 120, 'h7')
        this.add.image(3300, 120, 'h7')
        this.add.image(3400, 120, 'h7')
        this.add.image(3700, 120, 'h7')
        this.add.image(4000, 120, 'h7')
        this.add.image(4300, 120, 'h7')
        this.add.image(4600, 120, 'h7')
        this.add.image(4376, 360, 'h8')
        this.add.image(2900, 120, 'h7')
        this.add.image(3150, 120, 'h10')
        this.add.image(2550, 120, 'h4')
        this.add.image(5500, 1220, 'h8')
        this.add.image(5530, 1250, 'h22')
        this.add.image(5200, 1256, 'h16')

        this.add.image(5200, 1150, 'h17')
        this.add.image(5760, 1215, 'h5')
        this.add.image(5760, 170, 'h7')
        this.add.image(6050, 170, 'h13')
        this.add.image(6430, 170, 'h6')
        this.add.image(6800, 170, 'h7')
        this.add.image(7400, 170, 'h7')
        this.add.image(7700, 170, 'h7')
        this.add.image(7100, 170, 'h7')
        this.add.image(8300, 170, 'h7')
        this.add.image(8600, 170, 'h7')
        this.add.image(9200, 170, 'h7')
        this.add.image(9500, 170, 'h7')
        this.add.image(8900, 170, 'h7')
        this.add.image(8000, 170, 'h4')
        this.add.image(8900, 570, 'del').setScale(1.5)
        const col2 = this.add.image(700, 700, 'obj1').setScale(0.5)
        const col3 = this.add.image(1300, 700, 'obj1').setScale(0.5)
        const col4 = this.add.image(2800, 700, 'obj1').setScale(0.5)
        const col5 = this.add.image(100, 600, 'obj2').setScale(0.5)
        this.add.image(6500, 900, 'obj1').setScale(0.5)
        this.add.image(7300, 700, 'obj2').setScale(0.5)
        this.add.image(3500, 800, 'obj2').setScale(0.5)


        /////////////////////////////////////

        this.initHero();
        this.initEnemies();
        this.initLasers();
        this.initChests();

        this.add.image(4470, 900, 'h14')

        ////////////////
        walls.setCollisionByProperty({collides: true}))

        const platforms = this.physics.add.staticGroup();
        // platforms.create(300, 600, 'obj1').setScale(0.5)


        this.physics.add.collider(this.hero, platforms)
        this.physics.add.collider(this.hero, walls)


        //////////////

        // this.spike = new Spike(this, 300, 100, 'spike', this.add.sprite(0, 0, 'box'));
        // this.spike.setSize(56, 164);
        this.spike = new Spike(this, 4000, 400, 'spike', this.add.sprite(0, 0, 'box')).setScale(1.5);
        this.spike.setSize(56, 164);

        this.anims.create({
            key: 'delorean',
            frames: this.anims.generateFrameNumbers('delorean_sheet', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });


        const del = this.physics.add.sprite(8900, 570, 'delorean');

        this.physics.add.overlap(this.hero, del, () => {
            if (this.ctr <= 0) {
                this.scene.setVisible(false);
                this.scene.scene.time.addEvent({
                    delay: 2000,
                    callback: () => {
                        this.scene.setVisible(true);
                        this.delorean = this.physics.add.sprite(this.hero.x, this.hero.y - 100, 'delorean_sheet').setScale(0.80);
                        this.delorean.depth = 300;
                        this.delorean.play('delorean', true);
                        this.hero.y -= 100;
                        this.scene.scene.sound.play('cyberpunk');     
                    },
                    loop: false
                });
            }
            this.ctr += 1;
        }, undefined, this);
    }
    
    update(t: number, dt: number)
    {
        this.hero.update(this.cursors, this.enemies);
        this.enemies.forEach(e => e.update(t, dt));
        this.spike.update(this.hero);
    }

    private initHero() {
        CharacterAnims(this.anims);
        this.hero = this.add.hero(500, 360, 'heroStandAnim');
        this.cameras.main.startFollow(this.hero);
    }

    private initEnemies() {
        const _hero = this.hero as Hero;
        this.enemies = [new Enemy(this, 1000, 400, 'enemyStatic', _hero, 'timingEnemy'),
         new Enemy(this, 3070, 864, 'enemyStatic', _hero, 'timingEnemy'),
         new Enemy(this, 3360, 1536, 'enemyStatic', _hero, 'timingEnemy'),
         new Enemy(this, 5088, 1824, 'enemyStatic', _hero, 'timingEnemy'),
         new Enemy(this, 6432, 1056, 'enemyStatic', _hero, 'timingEnemy'),
         new Enemy(this, 7008, 672, 'enemyStatic', _hero, 'timingEnemy'),
         new Enemy(this, 7680, 1152, 'enemyStatic', _hero, 'timingEnemy'),
         new Enemy(this, 6432, 1824, 'enemyStatic', _hero, 'timingEnemy'),
         new Enemy(this, 4224, 1920, 'enemyStatic', _hero, 'timingEnemy'),
         new Enemy(this, 2592, 1056, 'enemyStatic', _hero, 'timingEnemy'),
         new Enemy(this, 1056, 1056, 'enemyStatic', _hero, 'timingEnemy')];
        // this.physics.add.collider(this.hero, this.enemies);
    }

    private initLasers() {
        this.lasers = [new Laser(this, 3600, 384, 'laser'),
        new Laser(this, 3600, 384 * 2, 'laser'),
        new Laser(this, 3600, 384 * 3, 'laser'),
        new Laser(this, 3600, 384 * 4, 'laser'),
        new Laser(this, 3600, 384 * 5, 'laser'),
        new Laser(this, 3600, 384 * 6, 'laser'),
        new Laser(this, 3600, 384 * 6.2, 'laser')];

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

        // this.chests.add.

        this.chests.create(3744, 384, 'chest');
        this.chests.create(5664, 1632, 'chest');
        this.chests.create(6240, 325, 'chest');

        this.physics.add.overlap(this.hero, this.chests, (obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) => {
            const hero = obj1 as Hero;
            const chest = obj2 as Chest;
            
            if (chest.isAvailable) {
                chest.open(hero);
            }
        }, undefined, this);
    }
}
