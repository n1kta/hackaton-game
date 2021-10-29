import Phaser from "phaser";
import Hero from "~/сharacter/hero";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private target;
    private DISTANCE: number = 500;
    private AGRESSOR_RADIUS: number = 50;
    private SPEED: number = 80;

    public canAttack: boolean;
    public canHit: boolean = true;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target, frames?: string) {
        super(scene, x, y, texture, frames);

        this.anims.play('default');
        this.target = target;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.canAttack = false;
    }

    hit()
    {
        this.canHit = false;
        setTimeout(() => {
            this.canHit = true
        }, 4000);
    }

    preUpdate(t: number, dt: number): void {
        if (Math.sqrt(Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2)) <= this.DISTANCE) {
            if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y },) < this.AGRESSOR_RADIUS) {
                if (this.canHit) {
                    this.hit();

                    setTimeout(() => {
                        this.canAttack = true;
                    }, 1000);
    
                    setTimeout(() => {
                        this.canAttack = false;
                    }, 2000);
                } else {
                    if (this.canAttack) {
                        this.target.getDamage(20);
                    } else {
                        // Nothing
                    }
                }

                this.setVelocityX(0);
                this.setVelocityY(0);
            } else {
                let angle_radians = Math.atan2(this.y - this.target.y, this.x - this.target.x - 50);
                this.y -= Math.sin(angle_radians) * (this.SPEED / 100);
                this.x -= Math.cos(angle_radians) * (this.SPEED / 100);
            }
        }
    }
}