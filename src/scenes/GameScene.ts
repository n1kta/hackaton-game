import Phaser from "phaser"
import "../сharacter/hero"

const game_over = false;

export default class GameScene extends Phaser.Scene
{
    private hero!: Phaser.Physics.Arcade.Sprite
    private cursors
	constructor()
	{
		super('game-scene')
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
    }
    update(t: number, dt: number)
    {
        if(this.hero){
            this.hero.update(this.cursors)
        }
    }
}
