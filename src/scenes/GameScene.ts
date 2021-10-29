import Phaser from "phaser"

const speed = 200

export default class GameScene extends Phaser.Scene
{
    private hero
    private cursors
	constructor()
	{
		super('game-scene')
	}

	preload()
    {
        this.load.image('heroStand', 'assets/character/hero_stand.png');
    }

    create()
    {
        this.hero = this.physics.add.sprite(100, 100, 'heroStand').setScale(4)

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.startFollow(this.hero, true);
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
}
