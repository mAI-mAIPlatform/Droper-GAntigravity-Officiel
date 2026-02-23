import data from '../../data/characters.json';
import { assetLoader } from '../../utils/AssetLoader';

export class Volt {
    constructor(x, y) {
        const stats = data.volt;
        this.x = x;
        this.y = y;
        this.speed = stats.speed;
        this.radius = stats.radius;
        this.angle = 0;
        this.lastShot = 0;
        this.shootCooldown = stats.shootCooldown;
        this.name = stats.name;
        this.hp = stats.hp;
        this.maxHp = stats.maxHp;
        this.img = null;

        if (typeof window !== 'undefined') {
            assetLoader.loadImage('volt', stats.asset).then(img => {
                this.img = img;
            });
        }
    }

    update(dt, inputs, width, height, projectileManager) {
        if (!inputs) return;

        // Movement (WASD/ZQSD)
        if (inputs.keys.has('KeyW') || inputs.keys.has('ArrowUp') || inputs.keys.has('KeyZ')) this.y -= this.speed * dt;
        if (inputs.keys.has('KeyS') || inputs.keys.has('ArrowDown')) this.y += this.speed * dt;
        if (inputs.keys.has('KeyA') || inputs.keys.has('ArrowLeft') || inputs.keys.has('KeyQ')) this.x -= this.speed * dt;
        if (inputs.keys.has('KeyD') || inputs.keys.has('ArrowRight')) this.x += this.speed * dt;

        // Bounds check
        this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));

        // Aiming
        this.angle = Math.atan2(inputs.mouse.y - this.y, inputs.mouse.x - this.x);

        // Shooting
        if (inputs.mouse.down && Date.now() - this.lastShot > this.shootCooldown) {
            this.shoot(projectileManager);
            this.lastShot = Date.now();
        }
    }

    shoot(projectileManager) {
        if (projectileManager) {
            projectileManager.addProjectile(this.x, this.y, this.angle);
        }
    }
}

