import { simpleChase } from '../ai/SimpleChase';
import data from '../data/characters.json';
import { assetLoader } from '../utils/AssetLoader';

export class Bot {
    constructor(x, y, charKey = 'bot') {
        const stats = data[charKey] || data.bot;
        this.x = x;
        this.y = y;
        this.speed = stats.speed;
        this.radius = stats.radius;
        this.angle = 0;
        this.active = true;
        this.name = stats.name + " Hostile";
        this.hp = stats.hp;
        this.maxHp = stats.maxHp;
        this.img = assetLoader.getImage(charKey);

        if (!this.img && typeof window !== 'undefined') {
            assetLoader.loadImage(charKey, stats.asset).then(img => {
                this.img = img;
            });
        }

        // AI Stats
        this.lastShot = 0;
        // Different characters have different shooting properties
        this.shootCooldown = charKey === 'volt' ? 800 : (Math.random() < 0.4 ? 1500 : null);
    }

    update(dt, player, projectileManager) {
        if (!this.active) return;

        // Use chasing AI with tactical spacing
        simpleChase(this, player, this.speed);

        // Mimic shooting if bot has character-like stats (some bots can shoot)
        if (this.shootCooldown && Date.now() - this.lastShot > this.shootCooldown) {
            this.shoot(projectileManager);
            this.lastShot = Date.now();
        }
    }

    shoot(projectileManager) {
        if (projectileManager) {
            projectileManager.addProjectile(this.x, this.y, this.angle, true); // true = enemy
        }
    }
}
