import Phraser from "phaser";

export default class Spike extends Phraser.Physics.Arcade.Sprite {
    private _scene;
    private text;
    private box;
    private ctr = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, box, frames?: string) {
        super(scene, x, y, texture);
        this._scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.initAnims();

        this.text = this._scene.add.text(this.x + 50, this.y - 125, 'Hello World');
        this.text.setVisible(false);
        this.text.setZ(5);
        
        this.box = box.setVisible(false);
        this.box.x = this.x + 150;
        this.box.y = this.y - 100;
        this.box.setZ(1);

    }

    public update(target): void {
        if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: target.x, y: target.y },) < 100) {
            if (this.ctr === 0) {
                this._scene.sound.play('clock');
                this.text.setVisible(true);
                this.box.setVisible(true);
            }
            this.ctr += 1;
        } else {
            this.text.setVisible(false);
            this.box.setVisible(false);
            this.ctr = 0;
        }
    }

    private initAnims() {
        this.anims.create({
            key: 'spike_full',
            frames: this.scene.anims.generateFrameNumbers('spike', { start: 0, end: 6 }),
            frameRate: 3,
            repeat: -1
        });
    }
}