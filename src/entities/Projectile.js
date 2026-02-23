export class Projectile {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 12;
        this.radius = 4;
        this.active = true;
        this.distanceTraveled = 0;
        this.maxRange = 800; // Projectile range
    }

    update(dt) {
        const dx = Math.cos(this.angle) * this.speed;
        const dy = Math.sin(this.angle) * this.speed;

        this.x += dx;
        this.y += dy;

        this.distanceTraveled += this.speed;

        if (this.distanceTraveled > this.maxRange) {
            this.active = false;
        }
    }

    isOutOfBounds(width, height) {
        return (
            this.x < 0 ||
            this.x > width ||
            this.y < 0 ||
            this.y > height
        );
    }
}
