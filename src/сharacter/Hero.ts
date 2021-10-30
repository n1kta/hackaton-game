import Phaser, { GameObjects, RIGHT } from 'phaser'
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
    public health = 50;
    public haveHit = true;
    public walkRight = true;
    public walkLeft = false;
    public ultPoints = 100;

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
    useUlt()
    {
        console.log(this.health);
        this.speed += 75
        this.health > 60 ? this.health = 100 : this.health += 40;
        this.ultPoints = 0;
        setTimeout(() => {
            this.speed -= 75
        }, 5000);
        // play ult animation //
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
            this.walkRight = false;
            this.walkLeft = true
            this.anims.play('hero_left', true);
        }
        else if (cursors.right?.isDown)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(0);
            this.walkRight = true;
            this.walkLeft = false
            this.anims.play('hero_right', true);
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
        else if(cursors.shift?.isDown && this.ultPoints >= 100)
        {
            this.useUlt()
        }
        else{
            this.setVelocityX(0);
            this.setVelocityY(0);
            if(this.walkLeft === true)
            {
                this.anims.play('hero_stand_left', true);
            }else{
                this.anims.play('hero_stand_right', true);
            }
            
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