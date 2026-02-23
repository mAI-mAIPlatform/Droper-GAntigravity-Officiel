import { simpleChase } from '../ai/SimpleChase';
import data from '../data/characters.json';
import { assetLoader } from '../utils/AssetLoader';

export class Bot {
    constructor(x, y) {
        const stats = data.bot;
        this.x = x;
        this.y = y;
        this.speed = stats.speed;
        this.radius = stats.radius;
        this.angle = 0;
        this.active = true;
        this.name = stats.name;
        this.hp = stats.hp;
        this.maxHp = stats.maxHp;
        this.img = assetLoader.getImage('bot');

        if (!this.img && typeof window !== 'undefined') {
            assetLoader.loadImage('bot', stats.asset).then(img => {
                this.img = img;
            });
        }
    }

    update(dt, player) {
        if (!this.active) return;

        // Use chasing AI
        simpleChase(this, player, this.speed);
    }
}
