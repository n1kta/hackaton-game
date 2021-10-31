import Phaser, { RIGHT } from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private target;
    private DISTANCE: number;
    private AGRESSOR_RADIUS: number = 100;
    private SPEED: number = 80;
    private HP: number = 1;
    private deathCtr: number = 0;

    public canAttack: boolean;
    public canHit: boolean = true;
    public isAwaken: boolean = false;
    public attackAnim: boolean = false;
    public timing;
    public deathBit: boolean = false;
    public walkRight: boolean = true;
    public walkLeft: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target, barTexture: string, frames?: string) {
        super(scene, x, y, texture, frames);
        this.target = target;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.timing = scene.physics.add.sprite(100, 100, barTexture)
        this.DISTANCE  = 500;
        this.canAttack = false;
        this.initAnims();
        this.timing.alpha = 0
    }

    public getDamage() {
        this.HP -= 1;
        
        if (this.HP <= 0 && this.deathCtr <= 1) {
            ++this.deathCtr;
            this.death();
        }
    }

    update(t: number, dt:number) {  
        if(!this.deathBit)
        {      
            if (Math.sqrt(Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2)) <= this.DISTANCE) {
                if(!this.isAwaken)
                {
                    this.anims.play('enemy_stand',true)
                }else if(this.canHit)
                {
                    if(this.walkRight){
                        this.body.setSize(100, 104, true)
                        this.anims.play('enemy_walk', true)
                    } else {
                        this.body.setSize(100, 104, true)
                        this.anims.play('enemy_walk_left', true)
                    }
                }
                if (this.anims.currentFrame.index === 4 && !this.isAwaken)
                {     
                    this.isAwaken = true
                }
                this.DISTANCE = 5000   
                if(this.isAwaken){ 
                    if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y },) < this.AGRESSOR_RADIUS) {
                        if (this.canHit) {
                            this.hit(this.walkRight);
                            if(this.walkRight)
                            {
                                this.x -= 30
                            }
                            else
                            {
                                this.x += 30
                            }
                            setTimeout(() => {
                                this.canAttack = true;
                            }, 800);
                            setTimeout(() => {
                                this.canAttack = false;
                                this.damagePlayer();
                            }, 1450);
                        }else
                        {
                            if(this.walkRight)
                            {
                                this.anims.play('enemy_attack', true)
                                this.body.setSize(150, 104, true)
                            }else
                            {
                                this.anims.play('enemy_attack_left', true)
                                this.body.setSize(150, 104, true)
                            }
                            this.timing.alpha = 1
                            this.timing.play('timingAnimation', true)
                        }

                        // this.setVelocityX(0);
                        // this.setVelocityY(0);
                    } else if(!this.attackAnim){
                        let angle_radians = Math.atan2(this.y - this.target.y, this.x - this.target.x - 50);
                        if(Math.cos(angle_radians) * (this.SPEED / 100) > 0){
                            this.walkLeft = false;
                            this.walkRight = true;
                        }else
                        {
                            this.walkLeft = true;
                            this.walkRight = false;
                        }
                        this.y -= Math.sin(angle_radians) * (this.SPEED / 100);
                        this.x -= Math.cos(angle_radians) * (this.SPEED / 100);
                    }
                }
            }
        }
        if(this.canHit)
        {
            this.timing.x = this.x
        }else{
            if(this.walkLeft){
                this.timing.x = this.x - 30
            }else{
                this.timing.x = this.x + 30
            }
        }
        this.timing.y = this.y - 60
    }
    private damagePlayer ()
    {
        if(!this.deathBit && Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y },) < this.AGRESSOR_RADIUS){
            this.target.getDamage(20)
        }        
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
            frames: this.scene.anims.generateFrameNumbers('enemyWalk', { start: 0, end: 12 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_walk_left',
            frames: this.scene.anims.generateFrameNumbers('enemyWalk', { start: 13, end: 25 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_attack',
            frames: this.scene.anims.generateFrameNumbers('enemyAttack', { start: 0, end: 19 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_death',
            frames: this.scene.anims.generateFrameNumbers('enemyDeath', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy_death_left',
            frames: this.scene.anims.generateFrameNumbers('enemyDeath', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1
        });


        this.anims.create({
            key: 'enemy_attack_left',
            frames: this.scene.anims.generateFrameNumbers('enemyAttack', { start: 20, end: 39 }),
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

    private hit(right?: boolean)
    {
        this.canHit = false;
        this.attackAnim = true
        setTimeout(() => {
            if(right){
                this.x+=30
            }else{
                this.x-=30
            }
            this.canHit = true
            this.attackAnim = false;
            this.timing.play('timingAnimation0', true)
        }, 2300);
    }

    private death() {
        console.log('death');
        this.target.ultPoints += 10;
        if(this.walkRight){
            this.body.setSize(100, 104, true)
            this.anims.play('enemy_death', true)
        }else{
            this.body.setSize(100, 104, true)
            this.anims.play('enemy_death_left', true)
        }
        if(!this.canHit){
            if(this.walkRight){
                this.x += 30
            }else{
                this.x -= 30
            }
        }
        setTimeout(() => {
           this.alpha = 0 
        }, 1100);
        this.target.ultPoints += 10;
        this.timing.alpha = 0
        this.deathBit = true

    }
}