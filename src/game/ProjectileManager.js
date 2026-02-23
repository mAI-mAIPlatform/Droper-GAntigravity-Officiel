import { Projectile } from '../entities/Projectile';

export class ProjectileManager {
    constructor() {
        this.projectiles = [];
    }

    addProjectile(x, y, angle, isEnemy = false) {
        this.projectiles.push(new Projectile(x, y, angle, isEnemy));
    }

    update(dt, width, height) {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.update(dt);

            if (!p.active || p.isOutOfBounds(width, height)) {
                this.projectiles.splice(i, 1);
            }
        }
    }

    getProjectiles() {
        return this.projectiles;
    }
}
