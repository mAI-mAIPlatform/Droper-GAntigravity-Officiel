import { Volt } from '../entities/heroes/Volt';
import { ProjectileManager } from './ProjectileManager';
import { WaveManager } from './WaveManager';
import { Renderer } from '../renderers/Renderer';
import { checkCircleCollision } from '../physics/Collisions';

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
        this.renderer = new Renderer(this.ctx);

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

        // Update player
        this.player.update(dt, inputs, this.width, this.height, this.projectileManager);

        // Update projectiles
        this.projectileManager.update(dt, this.width, this.height);

        // Update bots
        this.waveManager.update(dt, this.player);

        // Collisions
        this.handleCollisions();
    }

    handleCollisions() {
        const bots = this.waveManager.getBots();
        const projectiles = this.projectileManager.getProjectiles();

        bots.forEach(bot => {
            // Player vs Bot
            if (checkCircleCollision(this.player, bot)) {
                this.gameOver();
            }

            // Projectile vs Bot
            projectiles.forEach(p => {
                if (checkCircleCollision(p, bot)) {
                    p.active = false;
                    this.waveManager.removeBot(bot);

                    // Simple respawn for infinite loop
                    if (this.waveManager.getBots().length < 3) {
                        this.waveManager.spawnWave(1);
                    }
                }
            });
        });
    }

    gameOver() {
        this.isRunning = false;
        if (this.onGameOver) this.onGameOver();
    }

    render() {
        this.renderer.clear(this.width, this.height);
        this.renderer.drawGrid(this.width, this.height);
        this.renderer.drawBots(this.waveManager.getBots());
        this.renderer.drawProjectiles(this.projectileManager.getProjectiles());
        this.renderer.drawPlayer(this.player);
    }

    resize(w, h) {
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
    }
}

