import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private target;
    private DISTANCE: number;
    private AGRESSOR_RADIUS: number = 70;
    private SPEED: number = 80;
    private HP: number = 1;
    private deathCtr: number = 0;

    public canAttack: boolean;
    public canHit: boolean = true;
    public isAwaken: boolean = false;
    public attackAnim: boolean = false;
    public timing;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target, barTexture: string, frames?: string) {
        super(scene, x, y, texture, frames);
        this.target = target;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.timing = scene.physics.add.sprite(100, 100, barTexture)
        this.DISTANCE  = 500;
        this.canAttack = false;
        this.initAnims();
    }

    public getDamage() {
        this.HP -= 1;
        
        if (this.HP <= 0 && this.deathCtr <= 1) {
            ++this.deathCtr;
            this.death();
        }
    }

    update(t: number, dt:number) {        
        if (Math.sqrt(Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2)) <= this.DISTANCE) {
            if(!this.isAwaken)
            {
                this.anims.play('enemy_stand',true)
            }else if(this.canHit)
            {
                this.anims.play('enemy_walk', true)
            }
            if (this.anims.currentFrame.index === 4 && !this.isAwaken)
            {     
                this.isAwaken = true
            }
            this.DISTANCE = 5000   
            if(this.isAwaken){ 
                if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y },) < this.AGRESSOR_RADIUS) {
                    if (this.canHit) {
                        this.hit();
                        setTimeout(() => {
                            this.canAttack = true;
                        }, 800);
                        setTimeout(() => {
                            this.canAttack = false;
                            this.target.getDamage(20);
                        }, 1500);
                    }else
                    {
                        this.setOffset(55, 0)
                        this.anims.play('enemy_attack', true)
                        this.timing.play('timingAnimation', true)
                    }

                    // this.setVelocityX(0);
                    // this.setVelocityY(0);
                } else if(!this.attackAnim){
                    let angle_radians = Math.atan2(this.y - this.target.y, this.x - this.target.x - 50);
                    this.y -= Math.sin(angle_radians) * (this.SPEED / 100);
                    this.x -= Math.cos(angle_radians) * (this.SPEED / 100);
                }
            }
        }

        this.timing.x = this.x
        this.timing.y = this.y - 60
    }

    private initAnims(){
        this.anims.create({
            key: 'enemy_stand',
            frames: this.scene.anims.generateFrameNumbers('enemyStatic', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_walk',
            frames: this.scene.anims.generateFrameNumbers('enemyWalk', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_attack',
            frames: this.scene.anims.generateFrameNumbers('enemyAttack', { start: 0, end: 19 }),
            frameRate: 10,
            repeat: -1
        });

        this.timing.anims.create({
            key: 'timingAnimation',
            frames: this.scene.anims.generateFrameNumbers('timingEnemy', { start: 0, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        this.timing.anims.create({
            key: 'timingAnimation0',
            frames: this.scene.anims.generateFrameNumbers('timingEnemy', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
    }

    private hit()
    {
        this.canHit = false;
        this.attackAnim = true
        setTimeout(() => {
            this.canHit = true
            this.setOffset(-55, 0)
            this.attackAnim = false;
            this.timing.play('timingAnimation0', true)
        }, 2300);
    }

    private death() {
        console.log('death');
        this.target.ultPoints.increase(10);
    }
}