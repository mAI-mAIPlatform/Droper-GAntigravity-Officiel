import { Bot } from '../entities/Bot';

export class WaveManager {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.bots = [];
    }

    spawnWave(count = 3) {
        for (let i = 0; i < count; i++) {
            // Spawn on random edges
            const side = Math.floor(Math.random() * 4);
            let x, y;

            if (side === 0) { x = Math.random() * this.width; y = -50; } // Top
            else if (side === 1) { x = this.width + 50; y = Math.random() * this.height; } // Right
            else if (side === 2) { x = Math.random() * this.width; y = this.height + 50; } // Bottom
            else { x = -50; y = Math.random() * this.height; } // Left

            this.bots.push(new Bot(x, y));
        }
    }

    update(dt, player) {
        this.bots.forEach(bot => bot.update(dt, player));
    }

    getBots() {
        return this.bots;
    }

    removeBot(bot) {
        const index = this.bots.indexOf(bot);
        if (index > -1) {
            this.bots.splice(index, 1);
        }
    }

    clear() {
        this.bots = [];
    }
}
