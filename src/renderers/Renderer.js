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
        // Floor shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.ellipse(player.x, player.y + player.radius * 0.8, player.radius * 0.8, player.radius * 0.4, 0, 0, Math.PI * 2);
        this.ctx.fill();

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

    drawBots(bots) {
        bots.forEach(bot => {
            // Floor shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(bot.x, bot.y + bot.radius * 0.8, bot.radius * 0.8, bot.radius * 0.4, 0, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#ff3d00';

            if (bot.img && bot.img.complete) {
                this.ctx.save();
                this.ctx.translate(bot.x, bot.y);
                this.ctx.rotate(bot.angle + Math.PI / 2);
                this.ctx.drawImage(bot.img, -bot.radius, -bot.radius, bot.radius * 2, bot.radius * 2);
                this.ctx.restore();
            } else {
                // Fallback
                this.ctx.fillStyle = 'rgba(255, 61, 0, 0.2)';
                this.ctx.strokeStyle = '#ff3d00';
                this.ctx.lineWidth = 2;

                this.ctx.beginPath();
                this.ctx.arc(bot.x, bot.y, bot.radius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();

                // Hostile eye/core
                this.ctx.fillStyle = '#fff';
                this.ctx.beginPath();
                this.ctx.arc(
                    bot.x + Math.cos(bot.angle) * 10,
                    bot.y + Math.sin(bot.angle) * 10,
                    4, 0, Math.PI * 2
                );
                this.ctx.fill();
            }
        });

        this.ctx.shadowBlur = 0;
    }

    drawWalls(walls) {
        walls.forEach(wall => {
            const depth = 20;

            // Draw shadow side (2.5D effect)
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.beginPath();
            this.ctx.moveTo(wall.x, wall.y + wall.height);
            this.ctx.lineTo(wall.x + wall.width, wall.y + wall.height);
            this.ctx.lineTo(wall.x + wall.width + depth / 2, wall.y + wall.height + depth);
            this.ctx.lineTo(wall.x + depth / 2, wall.y + wall.height + depth);
            this.ctx.fill();

            // Draw top face
            this.ctx.fillStyle = 'rgba(20, 20, 30, 0.8)';
            this.ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

            // Draw glowing border
            this.ctx.strokeStyle = '#00e5ff';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);

            // Subtle inner glow
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = '#00e5ff';
            this.ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
            this.ctx.shadowBlur = 0;
        });
    }
}
