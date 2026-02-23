import { simpleChase } from '../ai/SimpleChase';

export class Bot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 1.2;
        this.radius = 20;
        this.angle = 0;
        this.active = true;
    }

    update(dt, player) {
        if (!this.active) return;

        // Use chasing AI
        simpleChase(this, player, this.speed);
    }
}
