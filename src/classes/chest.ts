import Hero from "../сharacter/hero";

export default class Chest extends Phaser.Physics.Arcade.Sprite {
    private points: number = 10;
    
    public isAvailable: boolean = true;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    public open(hero: Hero) {
        this.isAvailable = false;
        hero.ultPoints.increase(this.points);
        this.points -= 10;
        if (this.points <= 0) {
            // TODO: change image
        }
    }
}