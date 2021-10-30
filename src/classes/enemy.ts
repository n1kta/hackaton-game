import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private target;
    private DISTANCE: number;
    private AGRESSOR_RADIUS: number = 50;
    private SPEED: number = 80;
    private HP: number = 1;

    public canAttack: boolean;
    public canHit: boolean = true;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target, frames?: string) {
        super(scene, x, y, texture, frames);
        this.target = target;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.DISTANCE  = 500;
        this.canAttack = false;
        this.initAnims();
    }

    public getDamage() {
        this.HP -= 1;

        if (this.HP <= 0) {
            this.death();
        }
    }

    update(t: number, dt:number) {
        super.update(t, dt);
        
        if (Math.sqrt(Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2)) <= this.DISTANCE) {
            if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y },) < this.AGRESSOR_RADIUS) {
                if (this.canHit) {
                    this.hit();
                    setTimeout(() => {
                        this.canAttack = true;
                    }, 1000);
    
                    setTimeout(() => {
                        this.canAttack = false;
                        this.target.getDamage(20);
                    }, 2000);
                }

                this.setVelocityX(0);
                this.setVelocityY(0);
            } else {
                setTimeout(() => {
                    let angle_radians = Math.atan2(this.y - this.target.y, this.x - this.target.x - 50);
                    this.y -= Math.sin(angle_radians) * (this.SPEED / 100);
                    this.x -= Math.cos(angle_radians) * (this.SPEED / 100);
                }, 500);
            }
        }
    }

    private initAnims(){
        this.anims.create({
            key: 'enemy_stand',
            frames: this.scene.anims.generateFrameNumbers('enemyStatic', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
    }

    private hit()
    {
        this.canHit = false;
        setTimeout(() => {
            this.canHit = true
        }, 4000);
    }

    private death() {
        this.target.ultPoints += 10;
        this.destroy();
    }
}