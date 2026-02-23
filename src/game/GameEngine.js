import { Volt } from '../entities/heroes/Volt';
import { ProjectileManager } from './ProjectileManager';
import { WaveManager } from './WaveManager';
import { MapGenerator } from './MapGenerator';
import { Renderer } from '../renderers/Renderer';
import { checkCircleCollision, checkCircleRectCollision } from '../physics/Collisions';

export class GameEngine {
    constructor(canvas, inputs, onGameOver) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.lastTime = 0;
        this.isRunning = false;
        this.inputs = inputs;
        this.onGameOver = onGameOver;

        // Systems
        this.projectileManager = new ProjectileManager();
        this.waveManager = new WaveManager(this.width, this.height);
        this.mapGenerator = new MapGenerator();
        this.renderer = new Renderer(this.ctx);

        // Map setup
        this.walls = this.mapGenerator.generateMap('map1');

        // Game Objects
        this.player = new Volt(this.width / 2, this.height / 2);

        // Bindings
        this.loop = this.loop.bind(this);

        // Initial Wave
        this.waveManager.spawnWave(3);
    }

    start() {
        this.isRunning = true;
        requestAnimationFrame(this.loop);
    }

    stop() {
        this.isRunning = false;
    }

    loop(timestamp) {
        if (!this.isRunning) return;

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime, this.inputs.current);
        this.render();

        requestAnimationFrame(this.loop);
    }

    update(dt, inputs) {
        if (!inputs || !this.isRunning) return;

        const prevX = this.player.x;
        const prevY = this.player.y;

        // Update player
        this.player.update(dt, inputs, this.width, this.height, this.projectileManager);

        // Wall collisions for player
        this.walls.forEach(wall => {
            if (checkCircleRectCollision(this.player, wall)) {
                this.player.x = prevX;
                this.player.y = prevY;
            }
        });

        // Update projectiles
        this.projectileManager.update(dt, this.width, this.height);

        // Update bots
        this.waveManager.update(dt, this.player, this.projectileManager);

        // Collisions
        this.handleCollisions();
    }

    handleCollisions() {
        const bots = this.waveManager.getBots();
        const projectiles = this.projectileManager.getProjectiles();

        // Projectile collisions with walls
        projectiles.forEach(p => {
            if (!p.active) return;
            this.walls.forEach(wall => {
                if (p.x > wall.x && p.x < wall.x + wall.width && p.y > wall.y && p.y < wall.y + wall.height) {
                    p.active = false;
                }
            });
        });

        bots.forEach(bot => {
            // Bot Wall Collision
            const bPrevX = bot.x;
            const bPrevY = bot.y;
            this.walls.forEach(wall => {
                if (checkCircleRectCollision(bot, wall)) {
                    bot.x = bPrevX;
                    bot.y = bPrevY;
                }
            });

            // Player vs Bot
            if (checkCircleCollision(this.player, bot)) {
                this.player.hp -= 0.5;
                if (this.player.hp <= 0) this.gameOver();
            }

            // Projectile vs Bot/Player
            projectiles.forEach(p => {
                if (!p.active) return;

                if (!p.isEnemy && checkCircleCollision(p, bot)) {
                    p.active = false;
                    bot.hp -= 10;
                    if (bot.hp <= 0) {
                        this.waveManager.removeBot(bot);
                        if (this.waveManager.getBots().length < 3) this.waveManager.spawnWave(1);
                    }
                } else if (p.isEnemy && checkCircleCollision(p, this.player)) {
                    p.active = false;
                    this.player.hp -= 5; // Reduced damage for game balance
                    if (this.player.hp <= 0) this.gameOver();
                }
            });
        });
    }

    gameOver() {
        this.isRunning = false;
        if (this.onGameOver) this.onGameOver();
    }

    getHUDData() {
        return {
            player: {
                x: this.player.x,
                y: this.player.y,
                hp: this.player.hp,
                maxHp: this.player.maxHp,
                name: this.player.name
            },
            bots: this.waveManager.getBots().map(b => ({
                x: b.x,
                y: b.y,
                hp: b.hp,
                maxHp: b.maxHp,
                name: b.name
            }))
        };
    }

    render() {
        this.renderer.clear(this.width, this.height);
        this.renderer.drawGrid(this.width, this.height);
        this.renderer.drawWalls(this.walls);
        this.renderer.drawBots(this.waveManager.getBots());
        this.renderer.drawProjectiles(this.projectileManager.getProjectiles());
        this.renderer.drawPlayer(this.player);
    }

    resize(w, h) {
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
    }
}

