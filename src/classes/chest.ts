import Hero from "../сharacter/hero";

export default class Chest extends Phaser.Physics.Arcade.Sprite {
    private points: number = 10;
    
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frames?: string) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    public open(hero: Hero) {
        hero.ultPoints += this.points;
        // TODO: open animation
    }
}