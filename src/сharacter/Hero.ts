import Phaser, { GameObjects } from 'phaser'
import Enemy from '~/classes/enemy';

declare global
{
    namespace Phaser.GameObjects
    {
        interface GameObjectFactory
        {
            hero(x: number, y:number, texture: string, frame?: string | number): Hero
        }
    }
}

export default class Hero extends Phaser.Physics.Arcade.Sprite
{
    public focus_radius = 40
    public speed = 150;
    public health = 100;
    public haveHit = true;

    constructor(scene: Phaser.Scene, x: number, y:number, texture: string, frame?: string | number){
        super(scene, x, y, texture, frame)
    }

    death()
    {
        setTimeout(() => {
            location.reload();
        }, 2000);
    }

    getDamage(hp: integer)
    {
        this.health -= hp;
        if (this.health <= 0)
        {
            this.death();
        }
    }

    hit()
    {
        this.haveHit = false,
        setTimeout(() => {
            this.haveHit = true
        }, 2000);
    }
    attack(enemies: Enemy[])
    {
        enemies.forEach(el => {
            if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: el.x, y: el.y },) < this.focus_radius) {
                console.log('attackPlayer');
                this.hit()
            }
        });
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, enemies: Enemy[])
    {
        if (cursors.left?.isDown)
        {
            this.setVelocityX(-this.speed);
            this.setVelocityY(0);
        }
        else if (cursors.right?.isDown)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(0);
        }
        else if (cursors.up?.isDown)
        {
            this.setVelocityX(0);
            this.setVelocityY(-this.speed);
        }
        else if (cursors.down?.isDown)
        {
            this.setVelocityX(0);
            this.setVelocityY(this.speed);
        }
        else if(cursors.space?.isDown && this.haveHit)
        {
            this.setVelocity(0, 0);
            this.attack(enemies)
        }
        else{
            this.setVelocityX(0);
            this.setVelocityY(0);
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('hero', function(this: GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number){
    var sprite = new Hero(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    return sprite;
})