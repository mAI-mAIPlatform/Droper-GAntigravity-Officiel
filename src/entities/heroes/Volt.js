export class Volt {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 0.35;
        this.radius = 20;
        this.angle = 0;
        this.lastShot = 0;
        this.shootCooldown = 150; // ms
        this.img = null;

        if (typeof window !== 'undefined') {
            this.img = new Image();
            this.img.src = '/assets/characters/volt.png';
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

