import Phaser from "phaser";
import Hero from "../сharacter/hero";

export default class Laser extends Phaser.Physics.Arcade.Sprite {
    public isOn: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, seconds: number = 2000, frames?: string) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setVisible(false);

        scene.time.addEvent({
            delay: seconds,
            callback: () => {
                this.isOn = !this.isOn;
                if (this.isOn) {
                    this.setVisible(true);
                } else {
                    this.setVisible(false);
                }
            },
            loop: true
        });
    }

    public attack(hero: Hero) {
        hero.getDamage(12);
        console.log(hero.health);
    }
}