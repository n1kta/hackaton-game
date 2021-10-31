import Phaser from "phaser";

export default class HealthBar {
    public bar: Phaser.GameObjects.Graphics;
    private x: number;
    private y: number;
    private p: number;

    public value: number;

    constructor(scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene).setScrollFactor(0);

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = (window.innerWidth / 4 - 4) / 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease(amount) {
        this.value -= amount;

        if (this.value <= 0) {
            this.value = 0;
        }

        this.draw();
        return (this.value === 0);
    }

    draw() {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, window.innerWidth / 4, 44);

        //  Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, window.innerWidth / 4 - 4, 40);

        if (this.value < 40) {
            this.bar.fillStyle(0xFF7043);
        }
        else {
            this.bar.fillStyle(0xFF7043);
        }

        var d = Math.floor(this.p * this.value);
        this.bar.fillRect(this.x + 2, this.y + 2, d, 40);
    }
}