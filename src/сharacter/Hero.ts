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
    public health = 100;
    public haveHit = true;
    public walkRight = true;
    public walkLeft = false;
    public ultPoints = 100;
    public isUlt = false;
    public isAttack = false;
    public ultPlay = false;

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
    useUlt(enemies: Enemy[])
    {
        setTimeout(() => {
            this.speed -= 75
            this.focus_radius = 40
            this.isUlt = false
            this.ultPlay = false
            this.y += 100
        }, 5000);
        this.attack(enemies)
        console.log('jsth')
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
        if(this.haveHit){
            this.hit()
        }
        if(!this.isUlt){
            if(this.walkRight)
            {
                this.anims.play('hero_attack_right', true);
            }else {
                this.anims.play('hero_attack_left', true);
            }
        }
        enemies.forEach(el => {
            if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: el.x, y: el.y },) < this.focus_radius) {
                console.log('attackPlayer');
                el.getDamage()
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
            if(!this.isUlt){
                this.anims.play('hero_left', true);
            }
        }
        else if (cursors.right?.isDown)
        {
            this.setVelocityX(this.speed);
            this.setVelocityY(0);
            this.walkRight = true;
            this.walkLeft = false
            if(!this.isUlt){
                this.anims.play('hero_right', true);
            }
        }
        else if (cursors.up?.isDown)
        {
            this.setVelocityX(0);
            this.setVelocityY(-this.speed);
            if(!this.isUlt){
                this.anims.play('hero_up', true);
            }
        }
        else if (cursors.down?.isDown)
        {
            this.setVelocityX(0);
            this.setVelocityY(this.speed);
            if(!this.isUlt){
                this.anims.play('hero_down', true);
            }
        }
        else if(cursors.space?.isDown)
        {
            this.isAttack = true;
            setTimeout(() => {
                this.isAttack = false
            }, 500);        
        }
        else if(cursors.shift?.isDown && this.ultPoints >= 100)
        {
            this.isUlt = true
            this.speed += 75
            this.health > 60 ? this.health = 100 : this.health += 40;
            this.ultPoints = 0;
            this.focus_radius = 140
            this.y -= 100
        }
        else if(this.isUlt)
        {
            console.log('ult')
            this.useUlt(enemies)

            if(!this.ultPlay) {
                this.anims.play('hero_ult_start',true)
                if (this.anims.currentFrame.index === 4)
                {     
                    this.ultPlay = true
                }
            }else
            {
                this.anims.play('hero_ult',true)
            }
             // this.anims.play('hero_ult', true)
        }
        else if(this.isAttack)
        {
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.attack(enemies)
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