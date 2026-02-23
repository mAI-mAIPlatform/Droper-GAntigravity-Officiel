export class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    clear(width, height) {
        this.ctx.clearRect(0, 0, width, height);
    }

    drawGrid(width, height) {
        this.ctx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
        this.ctx.lineWidth = 1;
        const spacing = 50;

        for (let x = 0; x < width; x += spacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }

        for (let y = 0; y < height; y += spacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
    }

    drawPlayer(player) {
        // Character glow
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#00e5ff';

        if (player.img && player.img.complete) {
            this.ctx.save();
            this.ctx.translate(player.x, player.y);
            this.ctx.rotate(player.angle + Math.PI / 2);
            this.ctx.drawImage(player.img, -25, -25, 50, 50);
            this.ctx.restore();
        } else {
            // Fallback
            this.ctx.fillStyle = '#111';
            this.ctx.beginPath();
            this.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.strokeStyle = '#00e5ff';
            this.ctx.stroke();
        }

        this.ctx.shadowBlur = 0;
    }

    drawProjectiles(projectiles) {
        this.ctx.strokeStyle = '#00e5ff';
        this.ctx.lineWidth = 4;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#00e5ff';

        projectiles.forEach(p => {
            this.ctx.beginPath();
            const length = 15;
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(
                p.x - Math.cos(p.angle) * length,
                p.y - Math.sin(p.angle) * length
            );
            this.ctx.stroke();

            // Electric spark effect points
            this.ctx.fillStyle = '#fff';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.shadowBlur = 0;
    }
}
