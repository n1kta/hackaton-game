import Phaser from "phaser";
import { Actor } from "./actor";

export default class Enemy extends Actor {
    private target;
    private AGRESSOR_RADIUS: number = 75;
    private attackHandler: () => void;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target, frames?: string) {
        super(scene, x, y, texture, frames);

        this.anims.play('default');
        this.target = target;

        this.attackHandler = () => {
            if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y },) < this.target.width) {
                this.getDamage();
                this.scene.time.delayedCall(300, () => {
                    this.destroy();
                });
            }
        };

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // TODO: setSize and setOffest
        this.getBody().setSize(16, 16);
        this.getBody().setOffset(0, 0);

        this.scene.game.events.on('attack', this.attackHandler, this);
        this.on('destroy', () => {
            this.scene.game.events.removeListener('attack', this.attackHandler);
        });
    }

    preUpdate(t: number, dt: number): void {
        if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y },{ x: this.target.x, y: this.target.y },) < this.AGRESSOR_RADIUS) {
            this.getBody().setVelocityX(this.x - this.target.x);
            this.getBody().setVelocityY(this.y - this.target.y);
        } else {
            this.getBody().setVelocity(0);
        }
    }

    public setTarget(target): void {
        this.target = target;
    }
}